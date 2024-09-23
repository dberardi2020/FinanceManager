<template>
  <div>
    <v-row>
      <v-col cols="3"> <FBtn @click="test"></FBtn></v-col>
      <v-col cols="6"> {{ purchasesCollection2.items }}</v-col>
      <v-col cols="3"> </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import Purchase from "@/models/Purchase";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import PurchasesCollection from "@/models/collections/PurchasesCollection";
import Collection from "@/models/abstractions/Collection";

@Component({
  components: { FBtn, FDataTable },
})
export default class PurchaseView extends Vue {
  testPurchase = new Purchase("category", 100, "2022-07-07", "description");
  testUpdatePurchase = new Purchase(
    "categoryUpdate",
    100,
    "2022-07-07",
    "description"
  );
  purchasesCollection: Collection<any> = new PurchasesCollection();
  purchasesCollection2: Collection<any> = new PurchasesCollection();

  // subscription: Subscription = new Subscription(
  //   "category",
  //   100,
  //   true,
  //   true,
  //   "source",
  //   "destination"
  // );

  // mounted(): void {
  //   this.testDataHandler.addTestPurchases(10);
  // }

  async test(): Promise<void> {
    await this.purchasesCollection.addItem(this.testPurchase);
  }

  // unmounted(): void {
  //   this.firebaseListener.unsubscribeListeners();
  // }
}
</script>
