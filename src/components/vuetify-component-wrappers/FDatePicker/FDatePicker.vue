<template>
  <v-date-picker
    v-model="dateModel.value"
    @change="this.updateProps"
    :type="datePickerModel.type"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-date-picker>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { FDatePickerModel } from "@/components/vuetify-component-wrappers/FDatePicker/FDatePickerModel";

@Component({})
export default class FDatePicker extends Vue {
  @Prop({ required: true }) readonly datePickerModel!: FDatePickerModel;

  dateModel!: FDatePickerModel;

  created(): void {
    this.dateModel = this.datePickerModel;
  }

  updateProps(): void {
    this.$emit("update:datePickerModel", this.dateModel);
  }
}
</script>
