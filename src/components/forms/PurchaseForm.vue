<template>
  <FCard>
    <FCardTitle> Purchase Details </FCardTitle>
    <v-card-text class="py-3 d-flex justify-center">
      <FDatePicker
        class="elevation-1"
        v-model="purchase.date"
        @change="logDate"
        show-adjacent-months
      ></FDatePicker>
    </v-card-text>
    <v-card-text class="pb-1 pt-3 title">Category</v-card-text>
    <v-card-text class="pt-0 pb-3">
      <v-chip-group
        column
        mandatory
        v-model="purchase.category"
        v-on:change="logCategory"
      >
        <v-chip
          v-for="category in categories"
          :key="category"
          :value="category"
          >{{ category }}</v-chip
        >
        <v-chip @click="addCategory">
          <v-icon left>mdi-plus-circle</v-icon>Add Category</v-chip
        >
      </v-chip-group>
    </v-card-text>
    <v-card-text class="pt-3 pb-0"
      ><FCurrencyField v-model="purchase.amount" label="Amount"></FCurrencyField
    ></v-card-text>
    <v-card-text class="py-0 pb-1">
      <FTextField v-model="purchase.description" label="Vendor"></FTextField>
    </v-card-text>
    <v-card-actions class="justify-end">
      <FBtn color="error" @click="clear">Clear</FBtn>
      <FBtn color="success" @click="submit">Submit</FBtn>
    </v-card-actions>
  </FCard>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FDatePicker from "@/components/vuetify-component-wrappers/FDatePicker/FDatePicker.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import Purchase from "@/models/Purchase";
import FCurrencyField from "@/components/vuetify-component-wrappers/FCurrencyField/FCurrencyField.vue";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";

@Component({
  components: {
    FCardTitle,
    FTextField,
    FCurrencyField,
    FBtn,
    FDatePicker,
    FCard,
  },
})
export default class PurchaseForm extends Vue {
  categories = ["Misc", "Groceries", "Entertainment", "Essentials", "Food"];
  currentDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  purchase = new Purchase(this.currentDate, "", "", 0);

  logDate(): void {
    console.log(this.purchase.date);
  }

  logCategory(): void {
    console.log(this.purchase.category);
  }

  submit(): void {
    this.purchase.addToDB();
  }

  addCategory(): void {
    return;
  }

  clear(): void {
    this.purchase = new Purchase(this.currentDate, "", "", 0);
  }
}
</script>

<style scoped></style>
