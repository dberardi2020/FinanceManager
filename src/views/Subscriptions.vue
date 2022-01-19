<template>
  <div>
    <h2 class="mb-6">Welcome to your Subscriptions Page</h2>
    <FBtn color="success" class="mb-2" @click="addData">Add Data</FBtn>
    <FBtn color="error" class="mb-2 ml-2" @click="clearData">Clear Data</FBtn>
    <FDataTable :headers="headers" :items="subs"></FDataTable>
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

@Component({
  components: { FDataTable, FBtn },
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
      text: "Amount",
      value: "amount",
    },
    {
      text: "Source",
      value: "source",
    },
    {
      text: "Destination",
      value: "destination",
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
