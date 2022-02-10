<template>
  <FCard :elevation="updateMode ? 10 : 2">
    <FCardTitle> Purchase Details </FCardTitle>
    <v-row class="my-2 d-flex justify-center">
      <FDatePicker
        class="elevation-1"
        v-model="purchase.date"
        show-adjacent-months
        color="#1976d3"
      ></FDatePicker>
    </v-row>
    <v-card-text class="pb-1 title">Category</v-card-text>
    <v-card-text class="pt-0 pb-2">
      <v-chip-group column mandatory v-model="purchase.category">
        <v-chip
          v-for="category in categories"
          :key="category.name"
          :value="category.name"
          >{{ category.name }}</v-chip
        >
        <v-chip value="Add Category" @click="showDialogue = true">
          <v-icon left color="white">mdi-pencil-circle</v-icon>Edit
          Categories</v-chip
        >
      </v-chip-group>
    </v-card-text>
    <v-form ref="inputs">
      <v-card-text>
        <FTextField
          class="py-2"
          v-model="purchase.description"
          label="Description"
          :rules="fieldRequired"
        ></FTextField>
        <FCurrencyField
          class="py-2"
          v-model="purchase.amount"
          label="Amount"
          :rules="fieldRequired"
          @focusout="amountZeroCheck"
          required
        ></FCurrencyField
      ></v-card-text>
    </v-form>
    <v-card-actions class="justify-end pt-0">
      <FBtn v-if="updateMode" color="error" @click="clear">Cancel</FBtn>
      <FBtn v-if="!updateMode" color="error" @click="clear">Clear</FBtn>
      <FBtn
        v-if="!updateMode"
        color="success"
        @click="submit"
        :disabled="isDisabled()"
        >Submit</FBtn
      >
      <FBtn
        v-if="updateMode"
        color="success"
        @click="update"
        :disabled="isDisabled()"
        >Update</FBtn
      >
    </v-card-actions>
    <v-dialog v-model="showDialogue" width="25%">
      <PurchaseCategoryEditor> </PurchaseCategoryEditor>
    </v-dialog>
  </FCard>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

import { Component, Ref, Vue } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FDatePicker from "@/components/vuetify-component-wrappers/FDatePicker/FDatePicker.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import Purchase from "@/models/Purchase";
import FCurrencyField from "@/components/vuetify-component-wrappers/FCurrencyField/FCurrencyField.vue";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import moment from "moment";
import { onSnapshot } from "firebase/firestore";
import UserData from "@/models/UserData";
import CategoryEditor from "@/components/forms/Purchase/PurchaseCategoryEditor.vue";
import PurchaseCategoryEditor from "@/components/forms/Purchase/PurchaseCategoryEditor.vue";
import Category, { purchaseCategories } from "@/models/Category";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;

@Component({
  components: {
    PurchaseCategoryEditor,
    CategoryEditor,
    FCardTitle,
    FTextField,
    FCurrencyField,
    FBtn,
    FDatePicker,
    FCard,
  },
})
export default class PurchaseForm extends Vue {
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  @Ref("inputs") readonly inputs!: any;
  fieldRequired = [(v: never): string | boolean => !!v || "Field is required"];
  showDialogue = false;
  updateMode = false;

  currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  purchase = new Purchase(this.currentDate, "", "", null);

  categories: Category[] = [];
  unsubscribe: Unsubscribe | null = null;

  amountZeroCheck(): void {
    if (this.purchase.amount == 0) {
      this.purchase.amount = null;
    }
  }

  isDisabled(): boolean {
    return (
      this.purchase.amount == null ||
      this.purchase.description == "" ||
      this.purchase.category == "Add Category" ||
      moment(this.purchase.date).isAfter(Date.now())
    );
  }

  submit(): void {
    this.purchase.addToDB();
    this.clear();
  }

  update(): void {
    this.purchase.updateInDB();
    this.clear();
  }

  clear(): void {
    this.purchase = new Purchase(this.currentDate, "", "", null);
    this.inputs.resetValidation();
    this.updateMode = false;
  }

  mounted() {
    this.unsubscribe = this.handleSnapshot();

    this.$root.$on("editPurchase", (purchase: Purchase) => {
      Object.assign(this.purchase, purchase);
      this.updateMode = true;
    });

    this.$root.$on("purchaseDeletedWithID", (id: string | undefined) => {
      if (id != undefined && this.purchase.id == id) {
        this.clear();
      }
    });
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(UserData.userDataDoc, (doc: any) => {
      this.categories.splice(0);
      doc.get(purchaseCategories)?.forEach((category: Category) => {
        this.categories.push(category);
      });
    });
  }
}
</script>

<style scoped>
::v-deep .v-chip--active {
  background-color: #1976d3 !important;
  color: white;
  opacity: 1 !important;
}
</style>
