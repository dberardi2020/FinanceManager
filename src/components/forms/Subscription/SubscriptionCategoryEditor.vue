<template>
  <FCard>
    <FCardTitle class="justify-center">Subscription Categories</FCardTitle>
    <v-divider class="mb-5"></v-divider>
    <v-card-subtitle v-if="categories.length === 0" class="pa-0 ml-2"
      >No Subscription Categories...</v-card-subtitle
    >
    <v-chip
      class="ma-1"
      v-for="category in categories"
      :key="category.name"
      close
      @click:close="deleteCategory(category)"
      @click="updateWithdrawal(category)"
      :color="category.isWithdrawal ? 'error' : 'success'"
    >
      <v-icon small v-if="category.isWithdrawal" left>mdi-minus</v-icon>
      <v-icon small v-if="!category.isWithdrawal" left>mdi-plus</v-icon>
      {{ category.name }}
    </v-chip>
    <v-divider class="my-5"></v-divider>
    <FTextField
      v-model="categoryField"
      outlined
      label="Category Name"
      v-on:keyup.enter="addCategory"
    ></FTextField>
    <v-card-actions class="justify-end">
      <FBtn color="success" @click="addCategory">Add Category</FBtn>
    </v-card-actions>
  </FCard>
</template>

<script lang="ts">
import { userDataDoc } from "@/models/UserData";
import {
  arrayUnion,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import Vue from "vue";
import Component from "vue-class-component";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import Category, { subscriptionCategories } from "@/models/Category";

@Component({
  components: { FBtn, FTextField, FCardTitle, FCard },
})
export default class SubscriptionCategoryEditor extends Vue {
  categories: Category[] = [];
  categoryField = "";

  unsubscribe = onSnapshot(userDataDoc, (doc) => {
    this.categories.splice(0);
    doc.get(subscriptionCategories)?.forEach((category: Category) => {
      this.categories.push(category);
    });
  });

  addCategory(): void {
    if (this.categoryField) {
      let newCategory: Category = {
        name: this.categoryField,
        isWithdrawal: true,
      };

      updateDoc(userDataDoc, {
        [subscriptionCategories]: arrayUnion(newCategory),
      });

      this.categoryField = "";
    }
  }

  updateWithdrawal(item: Category): void {
    if (item) {
      item.isWithdrawal = !item.isWithdrawal;
      updateDoc(userDataDoc, {
        [subscriptionCategories]: this.categories,
      });
    }
  }

  deleteCategory(item: Category): void {
    if (item) {
      updateDoc(userDataDoc, {
        [subscriptionCategories]: arrayRemove(item),
      });
    }
  }
}
</script>
