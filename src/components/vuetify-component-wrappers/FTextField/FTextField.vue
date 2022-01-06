<template>
  <v-text-field v-bind="$attrs" v-on="$listeners"></v-text-field>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FTextField extends Vue {}
</script>
