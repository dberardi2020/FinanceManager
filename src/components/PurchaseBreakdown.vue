<template>
  <div>
    <FCard :key="snapshotUpdates">
      <FCardTitle>Purchases Breakdown</FCardTitle>
      <v-divider class="mb-2"></v-divider>
      <v-row>
        <v-card-title class="remove_padding">Total Active</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{
            totalsBreakdown.has("active")
              ? totalsBreakdown.get("active").toFixed(2)
              : (0).toFixed(2)
          }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title class="remove_padding">Total Spent</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >$-{{
            totalsBreakdown.has("spent")
              ? totalsBreakdown.get("spent").toFixed(2)
              : (0).toFixed(2)
          }}</v-card-title
        >
      </v-row>
      <v-row>
        <v-card-title class="remove_padding">Total Left</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >${{
            totalsBreakdown.has("left")
              ? totalsBreakdown.get("left").toFixed(2)
              : (0).toFixed(2)
          }}</v-card-title
        >
      </v-row>
      <div class="py-2"></div>
      <v-row v-for="[key, value] in categoriesBreakdown" :key="key">
        <v-card-title class="remove_padding">{{ key }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="remove_padding"
          >$-{{ value.toFixed(2) }}</v-card-title
        >
      </v-row>
    </FCard>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import { onSnapshot, query } from "firebase/firestore";
import Purchase from "@/models/Purchase";
import Subscription from "@/models/Subscription";
import FDatePickerModel from "@/components/vuetify-component-wrappers/FDatePicker/FDatePickerModel.js";
import moment from "moment";

@Component({
  components: {
    FCardTitle,
    FCard,
  },
})
export default class PurchaseBreakdown extends Vue {
  @Prop({ required: true }) readonly filterMonth!: FDatePickerModel;
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

    this.sortCategories();
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

  sortCategories(): void {
    const categoriesArray = [...this.categoriesBreakdown];
    this.categoriesBreakdown = new Map(
      categoriesArray.sort(([, value1], [, value2]) =>
        value1 > value2 ? -1 : 1
      )
    );
  }

  @Watch("filterMonth", { immediate: true, deep: true })
  update(): void {
    this.handleSnapshots();
  }

  handleSnapshots(): void {
    onSnapshot(query(Purchase.purchaseCollection), (querySnapshot) => {
      this.categoriesBreakdown.clear();
      this.totalsBreakdown.delete("spent");
      querySnapshot.forEach((doc) => {
        let purchase = doc.data();
        if (
          purchase instanceof Purchase &&
          purchase.amount &&
          purchase.category &&
          moment(purchase.date).month() ==
            moment(this.filterMonth.value).month() &&
          moment(purchase.date).year() == moment(this.filterMonth.value).year()
        ) {
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
          subscription.isActive &&
          subscription.category
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

<style lang="scss" scoped>
.row {
  margin: 0;
  padding: 0 16px;
}

.remove_padding {
  padding: 0;
}
</style>
