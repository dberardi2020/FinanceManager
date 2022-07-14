<template>
  <div class="fix_margin">
    <v-row align="center">
      <v-col cols="6">
        <v-btn-toggle
          mandatory
          v-model="settings.category"
          @change="triggerSort"
        >
          <v-btn>Date</v-btn>
          <v-btn>Category</v-btn>
          <v-btn>Amount</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PurchaseSorterSettings from "@/models/PurchaseSorterSettings";

@Component({})
export default class SubscriptionSorter extends Vue {
  settings = PurchaseSorterSettings.getInstance();

  triggerSort(): void {
    this.$root.$emit("triggerPurchaseSort");
  }
}
</script>

<style lang="scss" scoped>
.fix_margin {
  margin: 12px 0;
}
</style>
