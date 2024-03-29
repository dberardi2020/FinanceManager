<template>
  <FCard :elevation="updateMode ? 10 : 2">
    <FCardTitle> Purchase Details </FCardTitle>
    <v-row class="my-2 d-flex justify-center">
      <FDatePicker
        class="elevation-1"
        :datePickerModel="datePicker"
        show-adjacent-months
        color="#1976d3"
      ></FDatePicker>
    </v-row>
    <v-card-text class="pb-1 title">Category</v-card-text>
    <v-card-text class="pt-0 pb-2">
      <v-chip-group column mandatory v-model="category">
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
          v-model="description"
          label="Description"
          :rules="fieldRequired"
          v-on:keyup.enter="submit"
        ></FTextField>
        <FCurrencyField
          class="py-2"
          v-model="amount"
          label="Amount"
          :rules="fieldRequired"
          @focusout="amountZeroCheck"
          required
          v-on:keypress.enter="submit"
        ></FCurrencyField
      ></v-card-text>
    </v-form>
    <v-card-actions class="justify-end pt-0">
      <FBtn v-if="updateMode" color="error" @click="clear">Cancel</FBtn>
      <FBtn v-if="!updateMode" color="error" @click="clear">Clear</FBtn>
      <FBtn color="success" @click="submit" :disabled="isDisabled()">{{
        updateMode ? "Update" : "Submit"
      }}</FBtn>
    </v-card-actions>
    <v-dialog v-model="showDialogue" width="25%">
      <PurchaseCategoryEditor v-click-outside="handleCloseCategoryEditor">
      </PurchaseCategoryEditor>
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
import moment, { now } from "moment";
import { onSnapshot } from "firebase/firestore";
import UserData from "@/models/UserData";
import CategoryEditor from "@/components/PurchaseCategoryEditor.vue";
import PurchaseCategoryEditor from "@/components/PurchaseCategoryEditor.vue";
import Category, { purchaseCategories } from "@/models/Category";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import FDatePickerModel from "./vuetify-component-wrappers/FDatePicker/FDatePickerModel";

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
  @Ref("inputs") readonly inputs!: any;
  // Field variables
  id: string | undefined;
  amount: number | null = null;
  description = "";
  category = "Add Category";
  datePicker = new FDatePickerModel();

  fieldRequired = [(v: never): string | boolean => !!v || "Field is required"];
  showDialogue = false;
  updateMode = false;

  categories: Category[] = [];
  unsubscribe: Unsubscribe | null = null;

  amountZeroCheck(): void {
    if (this.amount == 0) {
      this.amount = null;
    }
  }

  handleCloseCategoryEditor(): void {
    if (this.showDialogue) {
      this.$root.$emit("purchaseCategoryEditorClosed");
    }
  }

  isDisabled(): boolean {
    return (
      this.amount == null ||
      this.description == "" ||
      this.category == "Add Category" ||
      moment(this.datePicker.value).isAfter(now(), "days")
    );
  }

  submit(): void {
    let purchase = new Purchase(
      this.datePicker.value,
      this.description,
      this.category,
      this.amount
    );

    if (this.id) {
      purchase.id = this.id;
    }

    if (!this.isDisabled()) {
      this.updateMode && !this.isDisabled()
        ? purchase.updateInDB()
        : purchase.addToDB();

      this.clear();
    }
  }

  clear(): void {
    this.description = "";
    this.category = "Add Category";
    this.amount = null;
    this.datePicker.reset();
    this.inputs.resetValidation();
    this.updateMode = false;
  }

  mounted() {
    this.unsubscribe = this.handleSnapshot();

    this.$root.$on("editPurchase", (purchase: Purchase) => {
      this.id = purchase.id;
      this.datePicker.value = purchase.date;
      this.category = purchase.category;
      this.description = purchase.description;
      this.amount = purchase.amount;
      this.updateMode = true;
    });

    this.$root.$on("purchaseDeletedWithID", (id: string | undefined) => {
      if (id != undefined && this.id == id) {
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
