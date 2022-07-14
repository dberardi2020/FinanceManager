<template>
  <div>
    <v-row align="center">
      <v-col cols="6">
        <v-btn-toggle
          mandatory
          v-model="settings.category"
          @change="triggerSubSort"
        >
          <v-btn>Category</v-btn>
          <v-btn>Active</v-btn>
          <v-btn>Source</v-btn>
          <v-btn>Amount</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col align="right"> Pin Deposits </v-col>
      <v-col cols="1">
        <v-switch
          v-model="settings.pinDepositToTop"
          @change="triggerSubSort"
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SubscriptionSorterSettings from "@/models/SubscriptionSorterSettings";

@Component({})
export default class SubscriptionSorter extends Vue {
  settings = SubscriptionSorterSettings.getInstance();

  triggerSubSort(): void {
    this.$root.$emit("triggerSubSort");
  }
}
</script>

<style scoped></style>
