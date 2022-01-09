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
import { getModule } from "vuex-module-decorators";
import { UserStore } from "@/store/UserStore";
import store from "@/store";
import { db } from "@/main";
import { collection, addDoc, doc, query, onSnapshot } from "firebase/firestore";

class Subscription {
  active: boolean;
  source: string;
  destination: string;

  constructor(active: boolean, source: string, destination: string) {
    this.active = active;
    this.source = source;
    this.destination = destination;
  }
}

const subConverter = {
  toFirestore: (sub: Subscription) => {
    return {
      active: sub.active,
      source: sub.source,
      destination: sub.destination,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Subscription(data.active, data.source, data.destination);
  },
};

const userStore = getModule(UserStore, store);
const uid = userStore.user?.uid ?? "";
const subCollection = collection(
  db,
  "users",
  uid,
  "subscriptions"
).withConverter(subConverter);

@Component({
  components: { FBtn },
})
export default class Subscriptions extends Vue {
  headers = [
    {
      text: "Active",
      value: "active",
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
  subs: Subscription[] = [];

  unsubscribe = onSnapshot(query(subCollection), (querySnapshot) => {
    this.subs.splice(0);
    querySnapshot.forEach((doc) => {
      this.subs.push(doc.data());
    });
    this.subs.forEach((value) => console.log(value));
  });

  async addData(): Promise<void> {
    try {
      const docRef = await addDoc(
        subCollection,
        new Subscription(true, "Source", "Destination")
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
</script>
