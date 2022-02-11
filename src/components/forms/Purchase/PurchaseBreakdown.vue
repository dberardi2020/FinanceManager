<template>
  <div>
    <FCard>
      <FCardTitle>Purchases Breakdown</FCardTitle>
      <v-divider></v-divider>
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
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import Purchase from "@/models/Purchase";

@Component({
  components: {
    FCardTitle,
    FCard,
  },
})
export default class PurchaseBreakdown extends Vue {
  categoriesBreakdown = new Map();
  unsubscribe: Unsubscribe | null = null;

  mounted(): void {
    this.unsubscribe = this.handleSnapshot();
  }

  calculateCategories(amount: number, category: string): void {
    if (this.categoriesBreakdown.has(category)) {
      let total = this.categoriesBreakdown.get(category);
      this.categoriesBreakdown.set(category, total + amount);
    } else {
      this.categoriesBreakdown.set(category, amount);
    }

    console.log(this.categoriesBreakdown);
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(query(Purchase.purchaseCollection), (querySnapshot) => {
      this.categoriesBreakdown.clear();
      querySnapshot.forEach((doc) => {
        let purchase = doc.data();
        if (purchase instanceof Purchase && purchase.amount) {
          this.calculateCategories(purchase.amount, purchase.category);
        }
      });
    });
  }
}
</script>

<style scoped></style>
