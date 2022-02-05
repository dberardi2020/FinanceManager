<template>
  <div>
    <FDataTable :headers="headers" :items="purchases">
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:item.amount="{ item }">
        {{ "$" + item.amount }}
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
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { query, onSnapshot } from "firebase/firestore";
import Purchase from "@/models/Purchase.ts";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import PurchaseForm from "@/components/forms/Purchase/PurchaseForm.vue";
import moment from "moment";
import { Ref } from "vue-property-decorator";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;

@Component({
  components: { PurchaseForm, FDataTable, FBtn },
})
export default class PurchaseTable extends Vue {
  @Ref("purchaseForm") readonly purchaseForm!: PurchaseForm;
  purchases: Purchase[] = [];
  tempPurchase: Purchase | undefined | unknown = undefined;
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
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(query(Purchase.purchaseCollection), (querySnapshot) => {
      this.purchases.splice(0);
      querySnapshot.forEach((doc) => {
        this.tempPurchase = doc.data();
        if (this.tempPurchase instanceof Purchase) {
          this.tempPurchase.id = doc.id;
          this.purchases.push(this.tempPurchase);
        }
      });
    });
  }
}
</script>

<style scoped></style>
