<template>
  <div>
    <div>{{ purchaseFilter.value }}</div>
    <v-row>
      <v-col cols="3">
        <PurchaseForm ref="purchaseForm"></PurchaseForm>
      </v-col>
      <v-col cols="6">
        <PurchaseSorter></PurchaseSorter>
        <PurchaseTable></PurchaseTable>
      </v-col>
      <v-col cols="3">
        <FDatePicker
          class="elevation-1"
          :datePickerModel.sync="purchaseFilter"
          :landscape="true"
          color="#1976d3"
        ></FDatePicker>
        <PurchaseBreakdown></PurchaseBreakdown>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import PurchaseForm from "@/components/PurchaseForm.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import PurchaseTable from "@/components/PurchaseTable.vue";
import PurchaseBreakdown from "@/components/PurchaseBreakdown.vue";
import PurchaseSorter from "@/components/PurchaseSorter.vue";
import FDatePicker from "@/components/vuetify-component-wrappers/FDatePicker/FDatePicker.vue";
import { FDatePickerModel } from "@/components/vuetify-component-wrappers/FDatePicker/FDatePickerModel";
import { FDatePickerModelType } from "@/components/vuetify-component-wrappers/FDatePicker/FDatePickerModelType";

@Component({
  components: {
    PurchaseSorter,
    PurchaseBreakdown,
    PurchaseTable,
    FCardTitle,
    PurchaseForm,
    FCard,
    FDatePicker,
  },
})
export default class Subscriptions extends Vue {
  purchaseFilter: FDatePickerModel = new FDatePickerModel(
    FDatePickerModelType.month
  );
}
</script>
