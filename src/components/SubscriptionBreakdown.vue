<template>
  <div>
    <FCard :key="snapshotUpdates">
      <FCardTitle>Subscriptions Breakdown</FCardTitle>
      <v-divider class="mb-2"></v-divider>
      <v-row>
        <v-card-title class="remove_padding">Total Active</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{
            this.totalsBreakdown.has("active")
              ? this.totalsBreakdown.get("active").toFixed(2)
              : (0).toFixed(2)
          }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title class="remove_padding">Total Inactive</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{
            this.totalsBreakdown.has("inactive")
              ? this.totalsBreakdown.get("inactive").toFixed(2)
              : (0).toFixed(2)
          }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title class="remove_padding">Total Combined</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{
            this.totalsBreakdown.has("combined")
              ? this.totalsBreakdown.get("combined").toFixed(2)
              : (0).toFixed(2)
          }}</v-card-title
        >
      </v-row>
      <div class="py-2"></div>
      <v-row v-for="[key, value] in this.depositsBreakdown" :key="key">
        <v-card-title class="remove_padding">{{ key }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{ value.toFixed(2) }}</v-card-title
        >
      </v-row>
      <div class="py-2"></div>
      <v-row v-for="[key, value] in this.withdrawalsBreakdown" :key="key">
        <v-card-title class="remove_padding">{{ key }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{ value.toFixed(2) }}</v-card-title
        >
      </v-row>
    </FCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import { onSnapshot, query } from "firebase/firestore";
import Subscription from "@/models/Subscription";

@Component({
  components: {
    FCardTitle,
    FCard,
  },
})
export default class SubscriptionBreakdown extends Vue {
  totalsBreakdown = new Map();
  categoriesBreakdown = new Map();
  depositsBreakdown = new Map();
  withdrawalsBreakdown = new Map();
  snapshotUpdates = 0;

  mounted(): void {
    this.handleSnapshot();
  }

  calculateTotals(amount: number, isActive: boolean): void {
    let active = this.totalsBreakdown.get("active") ?? 0;
    let inactive = this.totalsBreakdown.get("inactive") ?? 0;

    if (isActive) {
      active += amount;
      this.totalsBreakdown.set("active", active);
    } else {
      inactive += amount;
      this.totalsBreakdown.set("inactive", inactive);
    }

    this.totalsBreakdown.set("combined", active + inactive);
  }

  calculateCategories(amount: number, category: string): void {
    let total = this.categoriesBreakdown.get(category) ?? 0;
    this.categoriesBreakdown.set(category, total + amount);
  }

  handleSnapshot(): void {
    onSnapshot(query(Subscription.subCollection), (querySnapshot) => {
      this.totalsBreakdown.clear();
      this.categoriesBreakdown.clear();
      querySnapshot.forEach((doc) => {
        let subscription = doc.data();
        if (
          subscription instanceof Subscription &&
          subscription.amount &&
          subscription.category
        ) {
          let amount =
            subscription.amount * (subscription.isWithdrawal ? -1 : 1);
          this.calculateTotals(amount, subscription.isActive);
          if (subscription.isActive)
            this.calculateCategories(amount, subscription.category);
        }
      });
      this.sortCategories();
      this.snapshotUpdates++;
    });
  }

  sortCategories(): void {
    const categoriesArray = [...this.categoriesBreakdown];
    const depositsArray = categoriesArray.filter(([, value]) => value >= 0);
    const withdrawalArray = categoriesArray.filter(([, value]) => value < 0);

    this.depositsBreakdown = new Map(
      depositsArray.sort(([, value1], [, value2]) => (value1 > value2 ? -1 : 1))
    );

    this.withdrawalsBreakdown = new Map(
      withdrawalArray.sort(([, value1], [, value2]) =>
        value1 < value2 ? -1 : 1
      )
    );
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin: 0;
  padding: 0 16px;
}

.remove_padding {
  padding: 0;
}
</style>
