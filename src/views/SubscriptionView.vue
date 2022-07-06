<template>
  <div>
    <v-row>
      <v-col cols="3">
        <SubscriptionForm ref="subForm"></SubscriptionForm>
      </v-col>
      <v-col cols="6">
        <SubscriptionSorter></SubscriptionSorter>
        <SubscriptionTable></SubscriptionTable>
      </v-col>
      <v-col cols="3">
        <SubscriptionBreakdown></SubscriptionBreakdown>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import SubscriptionForm from "@/components/SubscriptionForm.vue";
import SubscriptionTable from "@/components/SubscriptionTable.vue";
import SubscriptionBreakdown from "@/components/SubscriptionBreakdown.vue";
import SubscriptionSorter from "@/components/SubscriptionSorter.vue";

@Component({
  components: {
    SubscriptionSorter,
    SubscriptionBreakdown,
    SubscriptionTable,
    SubscriptionForm,
  },
})
export default class Subscriptions extends Vue {}
</script>
