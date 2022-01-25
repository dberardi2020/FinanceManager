<template>
  <FCard>
    <FCardTitle> Subscription Details </FCardTitle>
    <!--    <v-card-text class="py-3 d-flex justify-center">-->
    <!--      <FDatePicker-->
    <!--        class="elevation-1"-->
    <!--        v-model="subscription.date"-->
    <!--        show-adjacent-months-->
    <!--        color="#1976d3"-->
    <!--      ></FDatePicker>-->
    <!--    </v-card-text>-->
    <v-card-text class="pb-1 pt-3 title">Category</v-card-text>
    <v-card-text class="pt-0 pb-3">
      <v-chip-group column mandatory v-model="subscription.category">
        <v-chip
          v-for="category in categories"
          :key="category"
          :value="category"
          >{{ category }}</v-chip
        >
        <v-chip value="Add Category" @click="showDialogue = true">
          <v-icon left>mdi-pencil-circle</v-icon>Edit Categories</v-chip
        >
      </v-chip-group>
    </v-card-text>
    <v-form ref="inputs">
      <v-card-text class="py-0 pb-1">
        <FTextField
          v-model="subscription.source"
          label="Source"
          :rules="fieldRequired"
        ></FTextField>
        <FTextField
          v-model="subscription.destination"
          label="Destination"
          :rules="fieldRequired"
        ></FTextField>
      </v-card-text>
      <v-card-text class="pt-3 pb-0"
        ><FCurrencyField
          v-model="subscription.amount"
          label="Amount"
          :rules="fieldRequired"
          @focusout="amountZeroCheck"
          required
        ></FCurrencyField
      ></v-card-text>
    </v-form>
    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-checkbox v-model="subscription.isActive" label="Active?"></v-checkbox>
      <v-spacer></v-spacer>
      <v-checkbox
        v-model="subscription.isWithdrawal"
        label="Withdrawal?"
      ></v-checkbox>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-actions class="justify-end pl-4 pt-1">
      <FBtn color="error" @click="clear">Clear</FBtn>
      <FBtn color="success" @click="submit" :disabled="isDisabled()"
        >Submit</FBtn
      >
    </v-card-actions>
    <v-dialog v-model="showDialogue" width="25%">
      <CategoryEditor :value="subscriptionKey"> </CategoryEditor>
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
import CategoryEditor from "@/components/forms/CategoryEditor.vue";
import Subscription from "@/models/Subscription";

@Component({
  components: {
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
  subscriptionKey = "Subscription";

  // currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  //   .toISOString()
  //   .substr(0, 10);

  subscription = new Subscription(true, true, "", null, "", "");

  categories: string[] = [];
  unsubscribe = onSnapshot(userDataDoc, (doc) => {
    this.categories.splice(0);
    doc
      .get("categories." + this.subscriptionKey)
      ?.forEach((category: string) => {
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
      // moment(this.subscription.date).isAfter(Date.now())
    );
  }

  submit(): void {
    this.subscription.addToDB();
    this.clear();
  }

  clear(): void {
    this.subscription = new Subscription(true, true, "", null, "", "");
    this.inputs.resetValidation();
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
