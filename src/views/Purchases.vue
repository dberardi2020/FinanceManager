<template>
  <div>
    <h2 class="mb-6">Welcome to your Purchases Page</h2>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" class="pb-0">
        <FBtn color="success" @click="testPurchase.addData()">Add Data</FBtn>
        <FBtn color="error" class="ml-2" @click="testPurchase.clearData()"
          >Clear Data</FBtn
        >
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <PurchaseForm></PurchaseForm>
      </v-col>
      <v-col cols="6">
        <FDataTable :headers="headers" :items="purchases"></FDataTable>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { query, onSnapshot } from "firebase/firestore";
import Purchase from "@/models/Purchase.ts";
import { purchaseCollection } from "@/models/Purchase.ts";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import PurchaseForm from "@/components/forms/PurchaseForm.vue";

@Component({
  components: { PurchaseForm, FCard, FDataTable, FBtn },
})
export default class Subscriptions extends Vue {
  purchases: Purchase[] = [];
  testPurchase = new Purchase("2022-01-16", "Stuff", "Misc", 16);
  headers = [
    {
      text: "Date",
      value: "date",
    },
    {
      text: "Description",
      value: "description",
    },
    {
      text: "Category",
      value: "category",
    },
    {
      text: "Amount",
      value: "amount",
    },
  ];

  unsubscribe = onSnapshot(query(purchaseCollection), (querySnapshot) => {
    this.purchases.splice(0);
    querySnapshot.forEach((doc) => {
      this.purchases.push(doc.data());
    });
  });
}
</script>
