<template>
  <v-date-picker v-bind="$attrs" v-on="$listeners"><slot /></v-date-picker>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FDatePicker extends Vue {}
</script>
