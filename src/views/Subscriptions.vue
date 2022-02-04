<template>
  <div>
    <v-row>
      <v-col cols="3">
        <SubscriptionForm ref="subForm"></SubscriptionForm>
      </v-col>
      <v-col cols="6">
        <SubscriptionTable></SubscriptionTable>
      </v-col>
      <v-col cols="3">
        <FCard>
          <FCardTitle> Subscriptions Breakdown </FCardTitle>
        </FCard>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import SubscriptionForm from "@/components/forms/Subscription/SubscriptionForm.vue";
import SubscriptionTable from "@/components/forms/Subscription/SubscriptionTable.vue";

@Component({
  components: {
    SubscriptionTable,
    SubscriptionForm,
    FCardTitle,
    FCard,
  },
})
export default class Subscriptions extends Vue {}
</script>
