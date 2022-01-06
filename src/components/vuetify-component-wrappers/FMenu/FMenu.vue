<template>
  <v-menu v-bind="$attrs" v-on="$listeners" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="hoverItem"></slot>
      </div>
    </template>
    <slot name="dropdownItem"></slot>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class FMenu extends Vue {}
</script>
