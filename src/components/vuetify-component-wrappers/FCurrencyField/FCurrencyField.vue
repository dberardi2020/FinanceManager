<template>
  <v-currency-field prefix="$" v-bind="$attrs" v-on="$listeners"
    ><slot
  /></v-currency-field>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FCurrencyField extends Vue {}
</script>
