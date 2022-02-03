<template>
  <FCard :elevation="updateMode ? 10 : 2">
    <FCardTitle> Subscription Details </FCardTitle>
    <v-card-text class="pb-1 pt-2 title">Category</v-card-text>
    <v-card-text class="pt-0 pb-2">
      <v-chip-group column mandatory v-model="subscription.category">
        <v-chip
          v-for="category in categories"
          :key="category.name"
          :value="category.name"
          @click="subscription.isWithdrawal = category.isWithdrawal"
        >
          <v-icon small v-if="category.isWithdrawal" left>mdi-minus</v-icon>
          <v-icon small v-if="!category.isWithdrawal" left>mdi-plus</v-icon>
          {{ category.name }}
        </v-chip>
        <v-chip value="Add Category" @click="showDialogue = true">
          <v-icon left>mdi-pencil-circle</v-icon>Edit Categories</v-chip
        >
      </v-chip-group>
    </v-card-text>
    <v-form ref="inputs">
      <v-card-text>
        <FTextField
          class="py-2"
          v-model="subscription.source"
          label="Source"
          :rules="fieldRequired"
        ></FTextField>
        <FTextField
          class="py-2"
          v-model="subscription.destination"
          label="Destination"
          :rules="fieldRequired"
        ></FTextField>
        <FCurrencyField
          class="pt-2"
          v-model="subscription.amount"
          label="Amount"
          :rules="fieldRequired"
          @focusout="amountZeroCheck"
          required
        ></FCurrencyField>
      </v-card-text>
    </v-form>
    <v-card-actions class="justify-end pl-4 pt-0">
      <v-checkbox v-model="subscription.isActive" label="Active?"></v-checkbox>
      <v-spacer></v-spacer>
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
      <SubscriptionCategoryEditor> </SubscriptionCategoryEditor>
    </v-dialog>
  </FCard>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FDatePicker from "@/components/vuetify-component-wrappers/FDatePicker/FDatePicker.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import FCurrencyField from "@/components/vuetify-component-wrappers/FCurrencyField/FCurrencyField.vue";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import { onSnapshot } from "firebase/firestore";
import { userDataDoc } from "@/models/UserData";
import CategoryEditor from "@/components/forms/Purchase/PurchaseCategoryEditor.vue";
import Subscription from "@/models/Subscription";
import SubscriptionCategoryEditor from "@/components/forms/Subscription/SubscriptionCategoryEditor.vue";
import Category, { subscriptionCategories } from "@/models/Category";

@Component({
  components: {
    SubscriptionCategoryEditor,
    CategoryEditor,
    FCardTitle,
    FTextField,
    FCurrencyField,
    FBtn,
    FDatePicker,
    FCard,
  },
})
export default class SubscriptionForm extends Vue {
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

  @Ref("inputs") readonly inputs!: any;
  fieldRequired = [(v: never): string | boolean => !!v || "Field is required"];
  showDialogue = false;
  updateMode = false;

  subscription = new Subscription(true, true, "", null, "", "");

  categories: Category[] = [];
  unsubscribe = onSnapshot(userDataDoc, (doc) => {
    this.categories.splice(0);
    doc.get(subscriptionCategories)?.forEach((category: Category) => {
      this.categories.push(category);
    });
  });

  amountZeroCheck(): void {
    if (this.subscription.amount == 0) {
      this.subscription.amount = null;
    }
  }

  isDisabled(): boolean {
    return (
      this.subscription.amount == null ||
      this.subscription.source == "" ||
      this.subscription.destination == "" ||
      this.subscription.category == "Add Category"
    );
  }

  submit(): void {
    this.subscription.addToDB();
    this.clear();
  }

  update(): void {
    this.subscription.updateInDB();
    this.clear();
  }

  clear(): void {
    this.subscription = new Subscription(true, true, "", null, "", "");
    this.inputs.resetValidation();
    this.updateMode = false;
  }

  fillWith(subscription: Subscription): void {
    Object.assign(this.subscription, subscription);
    this.updateMode = true;
  }

  subDeletedWithID(id: string | undefined): void {
    if (id != undefined && this.subscription.id == id) {
      this.clear();
    }
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
