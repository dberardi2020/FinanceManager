<template>
  <div>
    <FCard>
      <FCardTitle>Subscriptions Breakdown</FCardTitle>
      <v-divider></v-divider>
      <v-row>
        <v-card-title>Active Total</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title
          >${{ this.totalsBreakdown.active.toFixed(2) }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title>Inactive Total</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title
          >${{ this.totalsBreakdown.inactive.toFixed(2) }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title>Combined Total</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title
          >${{ this.totalsBreakdown.combined.toFixed(2) }}</v-card-title
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
import Subscription from "@/models/Subscription";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;

@Component({
  components: {
    FCardTitle,
    FCard,
  },
})
export default class SubscriptionBreakdown extends Vue {
  totalsBreakdown = { active: 0, inactive: 0, combined: 0 };
  categoriesBreakdown = new Map();
  unsubscribe: Unsubscribe | null = null;

  mounted(): void {
    this.unsubscribe = this.handleSnapshot();
  }

  resetTotals(): void {
    this.totalsBreakdown = {
      active: 0,
      inactive: 0,
      combined: 0,
    };
  }

  calculateTotals(amount: number, isActive: boolean): void {
    if (isActive) {
      this.totalsBreakdown.active += amount;
    } else {
      this.totalsBreakdown.inactive += amount;
    }

    this.totalsBreakdown.combined =
      this.totalsBreakdown.active + this.totalsBreakdown.inactive;
  }

  calculateCategories(amount: number, category: string): void {
    if (this.categoriesBreakdown.has(category)) {
      const total = this.categoriesBreakdown.get(category);
      this.categoriesBreakdown.set(category, total + amount);
    } else {
      this.categoriesBreakdown.set(category, amount);
    }

    console.log(this.categoriesBreakdown);
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(query(Subscription.subCollection), (querySnapshot) => {
      this.resetTotals();
      this.categoriesBreakdown.clear();
      querySnapshot.forEach((doc) => {
        let subscription = doc.data();
        if (subscription instanceof Subscription && subscription.amount) {
          let amount =
            subscription.amount * (subscription.isWithdrawal ? -1 : 1);
          this.calculateTotals(amount, subscription.isActive);
          this.calculateCategories(amount, subscription.category);
        }
      });
    });
  }
}
</script>

<style scoped></style>
