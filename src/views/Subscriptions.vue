<template>
  <div>
    <v-row>
      <v-col cols="3">
        <SubscriptionForm ref="subForm"></SubscriptionForm>
      </v-col>
      <v-col cols="6">
        <FDataTable :headers="headers" :items="subs">
          <template v-slot:item.amount="{ item }">
            <v-chip :color="item.isWithdrawal ? 'error' : 'success'">
              {{ "$" + item.amount }}
            </v-chip>
          </template>
          <template v-slot:item.category="{ item }">
            <v-chip :color="item.isWithdrawal ? 'error' : 'success'">
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
            <v-icon small class="mr-2" @click="editButtonClicked(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="item.deleteFromDB()"> mdi-delete </v-icon>
          </template>
        </FDataTable>
        <FBtn class="mt-3 mr-2" color="error" @click="clearData"
          >Clear Data</FBtn
        >
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
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import { query, onSnapshot, getDocs, deleteDoc } from "firebase/firestore";
import Subscription from "@/models/Subscription.ts";
import { subCollection } from "@/models/Subscription.ts";
import FDataTable from "@/components/vuetify-component-wrappers/FDataTable/FDataTable.vue";
import PurchaseForm from "@/components/forms/Purchase/PurchaseForm.vue";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import SubscriptionForm from "@/components/forms/Subscription/SubscriptionForm.vue";
import Purchase from "@/models/Purchase";
import { Ref } from "vue-property-decorator";

@Component({
  components: {
    SubscriptionForm,
    FCardTitle,
    FCard,
    PurchaseForm,
    FDataTable,
    FBtn,
  },
})
export default class Subscriptions extends Vue {
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  @Ref("subForm") readonly subForm!: any;
  subs: Subscription[] = [];
  tempSub: Subscription | undefined = undefined;
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

  unsubscribe = onSnapshot(query(subCollection), (querySnapshot) => {
    this.subs.splice(0);
    querySnapshot.forEach((doc) => {
      this.tempSub = doc.data();
      this.tempSub.id = doc.id;
      this.subs.push(this.tempSub);
    });
  });

  async clearData(): Promise<void> {
    try {
      const querySnapshot = await getDocs(subCollection);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  editButtonClicked(item: Purchase): void {
    this.subForm.fillWith(item);
  }
}
</script>
