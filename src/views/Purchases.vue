<template>
  <div>
    <v-row>
      <v-col cols="3">
        <PurchaseForm></PurchaseForm>
      </v-col>
      <v-col cols="6">
        <FDataTable :headers="headers" :items="purchases"></FDataTable>
        <FBtn class="mt-3" color="error" @click="clearData">Clear Data</FBtn>
      </v-col>
      <v-col cols="3">
        <FCard>
          <FCardTitle> Category Breakdown </FCardTitle>
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
import PurchaseForm from "@/components/forms/PurchaseForm.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";

@Component({
  components: { FCardTitle, PurchaseForm, FCard, FDataTable, FBtn },
})
export default class Subscriptions extends Vue {
  purchases: Purchase[] = [];
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
}
</script>
