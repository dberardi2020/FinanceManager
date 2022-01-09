<template>
  <div>
    <h1>This is the Subscriptions page</h1>
    <FBtn color="success" class="mr-4" @click="addData">Add Data</FBtn>
    <v-data-table
      :headers="headers"
      :items="subs"
      :items-per-page="-1"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { addDoc, query, onSnapshot } from "firebase/firestore";
import Subscription from "@/models/Subscription";
import { subCollection } from "@/models/Subscription";

@Component({
  components: { FBtn },
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
    this.subs.forEach((value) => console.log(value));
  });

  async addData(): Promise<void> {
    try {
      const docRef = await addDoc(subCollection, this.testSub);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
</script>
