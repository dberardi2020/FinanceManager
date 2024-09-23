<template>
  <div>
    <FDataTable
      :headers="headers"
      :items="displayPurchases"
      :sort-by="sortField"
    >
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:item.amount="{ item }">
        {{ "$" + item.amount.toFixed(2) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editPurchase(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deletePurchase(item)"> mdi-delete </v-icon>
      </template>
    </FDataTable>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { query, onSnapshot } from "firebase/firestore";
import Purchase from "@/models/Purchase";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import PurchaseForm from "@/components/PurchaseForm.vue";
import moment from "moment";
import { Prop, Ref, Watch } from "vue-property-decorator";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import { PurchaseTableSorter } from "@/mixins/PurchaseTableSorter";
import FDatePickerModel from "./vuetify-component-wrappers/FDatePicker/FDatePickerModel";

@Component({
  components: { PurchaseForm, FDataTable, FBtn },
})
export default class PurchaseTable extends PurchaseTableSorter {
  @Prop({ required: true }) readonly filterMonth!: FDatePickerModel;
  @Ref("purchaseForm") readonly purchaseForm!: PurchaseForm;
  purchases: Purchase[] = [];
  displayPurchases: Purchase[] = [];
  tempPurchase: Purchase | undefined | unknown = undefined;
  sortField = "sortId";

  headers = [
    {
      text: "Date",
      value: "date",
      align: "center",
      sortable: false,
    },
    {
      text: "Description",
      value: "description",
      align: "center",
      sortable: false,
    },
    {
      text: "Category",
      value: "category",
      align: "center",
      sortable: false,
    },
    {
      text: "Amount",
      value: "amount",
      align: "center",
      sortable: false,
    },
    {
      text: "Actions",
      value: "actions",
      align: "center",
      sortable: false,
    },
  ];

  unsubscribe: Unsubscribe | null = null;

  formatDate(date: string): string {
    return moment(date).format("MM/DD/YYYY");
  }

  editPurchase(purchase: Purchase): void {
    this.$root.$emit("editPurchase", purchase);
  }

  deletePurchase(purchase: Purchase): void {
    this.$confirm("This action cannot be undone", "Are you sure?", "warning", {
      reverseButtons: true,
    })
      .then(() => {
        purchase.deleteFromDB();
        this.$root.$emit("purchaseDeletedWithID", purchase.id);
      })
      .catch(() => {
        return;
      });
  }

  mounted(): void {
    this.unsubscribe = this.handleSnapshot();

    this.$root.$on("triggerPurchaseSort", () => {
      this.sort(this.displayPurchases);
    });
  }

  @Watch("filterMonth", { immediate: true, deep: true })
  filter(): void {
    this.displayPurchases = this.purchases.filter((purchase) => {
      if (
        moment(purchase.date).month() ==
          moment(this.filterMonth.value).month() &&
        moment(purchase.date).year() == moment(this.filterMonth.value).year()
      ) {
        return true;
      }
    });
    this.sort(this.displayPurchases);
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(query(Purchase.purchaseCollection), (querySnapshot) => {
      this.purchases = [];
      querySnapshot.forEach((doc) => {
        this.tempPurchase = doc.data();
        if (this.tempPurchase instanceof Purchase) {
          this.tempPurchase.id = doc.id;
          this.purchases.push(this.tempPurchase);
        }
      });
      this.sort(this.displayPurchases);
      this.sortField = "sortId";
      this.filter();
    });
  }
}
</script>

<style scoped></style>
