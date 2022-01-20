<template>
  <v-card-title
    class="pb-3 text-h5 font-weight-medium"
    v-bind="$attrs"
    v-on="$listeners"
    ><slot
  /></v-card-title>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FCardTitle extends Vue {}
</script>
