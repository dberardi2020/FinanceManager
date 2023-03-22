<template>
  <v-date-picker
    v-model="dateModel.value"
    :type="datePickerModel.type"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-date-picker>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import moment from "moment";
import FDatePickerModel from "@/components/vuetify-component-wrappers/FDatePicker/FDatePickerModel.js";

@Component
export default class FDatePicker extends Vue {
  @Prop({ type: Object as () => FDatePickerModel, required: true })
  readonly datePickerModel!: FDatePickerModel;

  dateModel!: FDatePickerModel;

  created(): void {
    this.dateModel = this.datePickerModel;
  }
}
</script>
