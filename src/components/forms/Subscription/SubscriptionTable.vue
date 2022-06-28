<template>
  <div>
    <FDataTable :headers="headers" :items="subs" :sort-by="sortField">
      <template v-slot:item.amount="{ item }">
        <v-chip :color="fillColor(item)">
          {{ "$" + item.amount.toFixed(2) }}
        </v-chip>
      </template>
      <template v-slot:item.category="{ item }">
        <v-chip :color="fillColor(item)">
          {{ item.category }}
        </v-chip>
      </template>
      <template v-slot:item.isActive="{ item }">
        <v-simple-checkbox
          v-model="item.isActive"
          v-ripple
          v-on:click="item.updateInDB()"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editSub(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteSub(item)"> mdi-delete </v-icon>
      </template>
    </FDataTable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { query, onSnapshot } from "firebase/firestore";
import Subscription from "@/models/Subscription.ts";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import SubscriptionForm from "@/components/forms/Subscription/SubscriptionForm.vue";
import { Ref } from "vue-property-decorator";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import { SubscriptionTableSorter } from "@/mixins/SubscriptionTableSorter";

@Component({
  components: {
    SubscriptionTable,
    SubscriptionForm,
    FCardTitle,
    FCard,
    FDataTable,
    FBtn,
  },
})
export default class SubscriptionTable extends SubscriptionTableSorter {
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  @Ref("subForm") readonly subForm!: SubscriptionForm;
  subs: Subscription[] = [];
  tempSub: Subscription | undefined | unknown = undefined;
  sortField = "sortId";

  headers = [
    {
      text: "Active",
      value: "isActive",
      align: "center",
      sortable: false,
    },
    {
      text: "Category",
      value: "category",
      align: "center",
      sortable: false,
    },
    {
      text: "Source",
      value: "source",
      align: "center",
      sortable: false,
    },
    {
      text: "Destination",
      value: "destination",
      align: "center",
      sortable: false,
    },
    {
      text: "Amount",
      value: "amount",
      align: "center",
      sortable: false,
    },
    {
      text: "Actions",
      value: "actions",
      align: "center",
      sortable: false,
    },
  ];

  unsubscribe: Unsubscribe | null = null;

  fillColor(subscription: Subscription): string {
    if (subscription.category == "") {
      return "white";
    }

    return subscription.isWithdrawal ? "error" : "success";
  }

  editSub(subscription: Subscription): void {
    this.$root.$emit("editSubscription", subscription);
  }

  deleteSub(subscription: Subscription): void {
    this.$confirm("This action cannot be undone", "Are you sure?", "warning", {
      reverseButtons: true,
    })
      .then(() => {
        subscription.deleteFromDB();
        this.$root.$emit("subscriptionDeletedWithID", subscription.id);
      })
      .catch(() => {
        return;
      });
  }

  mounted(): void {
    this.unsubscribe = this.handleSnapshot();
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(query(Subscription.subCollection), (querySnapshot) => {
      this.subs.splice(0);
      querySnapshot.forEach((doc) => {
        this.tempSub = doc.data();
        if (this.tempSub instanceof Subscription) {
          this.tempSub.id = doc.id;
          this.subs.push(this.tempSub);
        }
      });
      this.sort(this.subs);
      this.sortField = "sortId";
    });
  }
}
</script>

<style scoped></style>
