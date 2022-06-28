<template>
  <div>
    <v-row>
      <v-col cols="3">
        <PurchaseForm ref="purchaseForm"></PurchaseForm>
      </v-col>
      <v-col cols="6">
        <PurchaseTable></PurchaseTable>
      </v-col>
      <v-col cols="3">
        <PurchaseBreakdown></PurchaseBreakdown>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import PurchaseForm from "@/components/PurchaseForm.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import PurchaseTable from "@/components/PurchaseTable.vue";
import PurchaseBreakdown from "@/components/PurchaseBreakdown.vue";

@Component({
  components: {
    PurchaseBreakdown,
    PurchaseTable,
    FCardTitle,
    PurchaseForm,
    FCard,
  },
})
export default class Subscriptions extends Vue {}
</script>
