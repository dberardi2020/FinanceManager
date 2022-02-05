<template>
  <v-currency-field
    prefix="$"
    v-bind="$attrs"
    v-on="$listeners"
    :class="applyConditionalCss ? 'v-currency-field-delay' : ''"
    ><slot
  /></v-currency-field>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FCurrencyField extends Vue {
  applyConditionalCss = false;
  mounted(): void {
    // add the conditional css class after a delay
    setTimeout(() => {
      this.applyConditionalCss = true;
    }, 350);
  }
}
</script>

<style scoped>
::v-deep .v-label {
  transition: none !important;
}

.v-currency-field-delay ::v-deep .v-label {
  transition: 0.3s !important;
}
</style>
