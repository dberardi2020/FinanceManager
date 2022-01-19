<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :items-per-page="-1"
    class="elevation-2"
    :disable-pagination="true"
    :hide-default-footer="true"
    ><slot
  /></v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FDataTable extends Vue {}
</script>
