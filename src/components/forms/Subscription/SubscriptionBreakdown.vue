<template>
  <div>
    <FCard>
      <FCardTitle>Subscriptions Breakdown</FCardTitle>
      <v-divider></v-divider>
      <v-col>
        <v-row>
          <v-card-title>Active Total</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title>${{ this.activeTotal.toFixed(2) }}</v-card-title>
        </v-row>
        <v-row>
          <v-card-title>Inactive Total</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title>${{ this.inactiveTotal.toFixed(2) }}</v-card-title>
        </v-row>
        <v-row>
          <v-card-title>Combined Total</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title>${{ this.combinedTotal.toFixed(2) }}</v-card-title>
        </v-row>
      </v-col>
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
  activeTotal = 0;
  inactiveTotal = 0;
  combinedTotal = 0;

  unsubscribe: Unsubscribe | number = 0;

  mounted(): void {
    this.unsubscribe = onSnapshot(
      query(Subscription.subCollection),
      (querySnapshot) => {
        this.resetTotals();
        querySnapshot.forEach((doc) => {
          let subscription = doc.data();
          if (subscription instanceof Subscription && subscription.amount) {
            let amount =
              subscription.amount * (subscription.isWithdrawal ? -1 : 1);

            if (subscription.isActive) {
              this.activeTotal += amount;
            } else {
              this.inactiveTotal += amount;
            }

            this.combinedTotal = this.activeTotal + this.inactiveTotal;
          }
        });
      }
    );
  }

  resetTotals(): void {
    this.activeTotal = 0;
    this.inactiveTotal = 0;
    this.combinedTotal = 0;
  }
}
</script>

<style scoped></style>
