<template>
  <div>
    <v-row>
      <v-col cols="3">
        <PurchaseForm ref="purchaseForm"></PurchaseForm>
      </v-col>
      <v-col cols="6">
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
        <FBtn class="mt-3" color="error" @click="clearData">Clear Data</FBtn>
      </v-col>
      <v-col cols="3">
        <FCard>
          <FCardTitle> Purchases Breakdown </FCardTitle>
        </FCard>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { query, onSnapshot, getDocs, deleteDoc } from "firebase/firestore";
import Purchase from "@/models/Purchase.ts";
import { purchaseCollection } from "@/models/Purchase.ts";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import PurchaseForm from "@/components/forms/Purchase/PurchaseForm.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import moment from "moment";
import { Ref } from "vue-property-decorator";

@Component({
  components: { FCardTitle, PurchaseForm, FCard, FDataTable, FBtn },
})
export default class Subscriptions extends Vue {
  @Ref("purchaseForm") readonly purchaseForm!: PurchaseForm;
  purchases: Purchase[] = [];
  tempPurchase: Purchase | undefined = undefined;
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

  unsubscribe = onSnapshot(query(purchaseCollection), (querySnapshot) => {
    this.purchases.splice(0);
    querySnapshot.forEach((doc) => {
      this.tempPurchase = doc.data();
      this.tempPurchase.id = doc.id;
      this.purchases.push(this.tempPurchase);
    });
  });

  async clearData(): Promise<void> {
    try {
      const querySnapshot = await getDocs(purchaseCollection);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  formatDate(date: string): string {
    return moment(date).format("MM/DD/YYYY");
  }

  editPurchase(purchase: Purchase): void {
    this.purchaseForm.fillWith(purchase);
  }

  deletePurchase(purchase: Purchase): void {
    purchase.deleteFromDB();
    this.purchaseForm.purchaseDeletedWithID(purchase.id);
  }
}
</script>
