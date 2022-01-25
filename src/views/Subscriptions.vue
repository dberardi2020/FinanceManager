<template>
  <div>
    <v-row>
      <v-col cols="3">
        <SubscriptionForm></SubscriptionForm>
      </v-col>
      <v-col cols="9">
        <FDataTable :headers="headers" :items="subs"></FDataTable>
        <FBtn class="mt-3 mr-2" color="error" @click="clearData"
          >Clear Data</FBtn
        >
        <FBtn class="mt-3" color="success" @click="addData">Add Data</FBtn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import {
  addDoc,
  query,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Subscription from "@/models/Subscription.ts";
import { subCollection } from "@/models/Subscription.ts";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import PurchaseForm from "@/components/forms/PurchaseForm.vue";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import SubscriptionForm from "@/components/forms/SubscriptionForm.vue";

@Component({
  components: {
    SubscriptionForm,
    FCardTitle,
    FCard,
    PurchaseForm,
    FDataTable,
    FBtn,
  },
})
export default class Subscriptions extends Vue {
  subs: Subscription[] = [];
  testSub = new Subscription(
    true,
    true,
    "Essentials",
    12.52,
    "Groceries",
    "DCU"
  );
  headers = [
    {
      text: "Active",
      value: "isActive",
    },
    {
      text: "Category",
      value: "category",
    },
    {
      text: "Source",
      value: "source",
    },
    {
      text: "Destination",
      value: "destination",
    },
    {
      text: "Amount",
      value: "amount",
    },
  ];

  unsubscribe = onSnapshot(query(subCollection), (querySnapshot) => {
    this.subs.splice(0);
    querySnapshot.forEach((doc) => {
      this.subs.push(doc.data());
    });
    // this.subs.forEach((value) => console.log(value));
  });

  async addData(): Promise<void> {
    try {
      await addDoc(subCollection, this.testSub);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async clearData(): Promise<void> {
    try {
      const querySnapshot = await getDocs(subCollection);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
}
</script>
