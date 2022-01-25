<template>
  <v-card class="px-4 pb-2" v-bind="$attrs" v-on="$listeners"><slot /></v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FCard extends Vue {}
</script>
