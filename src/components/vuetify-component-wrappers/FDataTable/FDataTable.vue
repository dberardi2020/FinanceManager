<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :items-per-page="-1"
    class="elevation-2"
    :disable-pagination="true"
    :hide-default-footer="true"
  >
    <template v-for="(_, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>

    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <slot
  /></v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import moment from "moment";

@Component({})
export default class FDataTable extends Vue {}
</script>
