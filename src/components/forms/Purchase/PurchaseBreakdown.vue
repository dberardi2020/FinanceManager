<template>
  <div>
    <FCard :key="snapshotUpdates">
      <FCardTitle>Purchases Breakdown</FCardTitle>
      <v-divider></v-divider>
      <v-row>
        <v-card-title>Total Spent</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title
          >${{
            this.totalsBreakdown.has("spent")
              ? this.totalsBreakdown.get("spent").toFixed(2)
              : 0
          }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title>Total Left</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title
          >${{
            this.totalsBreakdown.has("left")
              ? this.totalsBreakdown.get("left").toFixed(2)
              : 0
          }}</v-card-title
        >
      </v-row>
      <v-row v-for="[key, value] in this.categoriesBreakdown" :key="key">
        <v-card-title>{{ key }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title>${{ value.toFixed(2) }}</v-card-title>
      </v-row>
    </FCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import { onSnapshot, query } from "firebase/firestore";
import Purchase from "@/models/Purchase";
import Subscription from "@/models/Subscription";

@Component({
  components: {
    FCardTitle,
    FCard,
  },
})
export default class PurchaseBreakdown extends Vue {
  totalsBreakdown = new Map();
  categoriesBreakdown = new Map();
  snapshotUpdates = 0;

  mounted(): void {
    this.handleSnapshots();
  }

  calculateLeft(): void {
    let active = this.totalsBreakdown.get("active") ?? 0;
    let spent = this.totalsBreakdown.get("spent") ?? 0;

    this.totalsBreakdown.set("left", active - spent);
  }

  calculateActive(amount: number): void {
    let active = this.totalsBreakdown.get("active") ?? 0;
    this.totalsBreakdown.set("active", active + amount);
  }

  calculateCategories(amount: number, category: string): void {
    let total = this.categoriesBreakdown.get(category) ?? 0;
    let spent = this.totalsBreakdown.get("spent") ?? 0;
    this.categoriesBreakdown.set(category, total + amount);
    this.totalsBreakdown.set("spent", spent + amount);
  }

  handleSnapshots(): void {
    onSnapshot(query(Purchase.purchaseCollection), (querySnapshot) => {
      this.categoriesBreakdown.clear();
      this.totalsBreakdown.delete("spent");
      querySnapshot.forEach((doc) => {
        let purchase = doc.data();
        if (purchase instanceof Purchase && purchase.amount) {
          this.calculateCategories(purchase.amount, purchase.category);
        }
      });
      this.calculateLeft();
      this.snapshotUpdates++;
    });

    onSnapshot(query(Subscription.subCollection), (querySnapshot) => {
      this.totalsBreakdown.delete("active");
      querySnapshot.forEach((doc) => {
        let subscription = doc.data();
        if (
          subscription instanceof Subscription &&
          subscription.amount &&
          subscription.isActive
        ) {
          let amount =
            subscription.amount * (subscription.isWithdrawal ? -1 : 1);
          this.calculateActive(amount);
        }
      });
      this.calculateLeft();
      this.snapshotUpdates++;
    });
  }
}
</script>

<style scoped></style>
