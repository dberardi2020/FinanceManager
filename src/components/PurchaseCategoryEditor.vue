<template>
  <FCard>
    <FCardTitle class="justify-center">Purchase Categories</FCardTitle>
    <v-divider class="mb-5"></v-divider>
    <v-card-subtitle v-if="categories.length === 0" class="pa-0 ml-2"
      >No Purchase Categories...</v-card-subtitle
    >
    <v-chip
      class="ma-1"
      v-for="category in categories"
      :key="category.name"
      close
      @click:close="deleteCategory(category)"
      >{{ category.name }}</v-chip
    >
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
import UserData from "@/models/UserData";
import {
  arrayUnion,
  onSnapshot,
  updateDoc,
  arrayRemove,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Vue from "vue";
import Component from "vue-class-component";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FCardTitle from "@/components/vuetify-component-wrappers/FCardTitle/FCardTitle.vue";
import FTextField from "@/components/vuetify-component-wrappers/FTextField/FTextField.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";
import Category, { purchaseCategories } from "@/models/Category";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;
import Purchase from "@/models/Purchase";

@Component({
  components: { FBtn, FTextField, FCardTitle, FCard },
})
export default class PurchaseCategoryEditor extends Vue {
  categories: Category[] = [];
  categoryField = "";

  unsubscribe: Unsubscribe | null = null;

  mounted(): void {
    this.unsubscribe = this.handleSnapshot();
  }

  addCategory(): void {
    if (this.categoryField) {
      let newCategory: Category = {
        name: this.categoryField,
        isWithdrawal: true,
      };

      updateDoc(UserData.userDataDoc, {
        [purchaseCategories]: arrayUnion(newCategory),
      });

      this.categoryField = "";
    }
  }

  async deleteCategory(item: Category): Promise<void> {
    if (item) {
      await updateDoc(UserData.userDataDoc, {
        [purchaseCategories]: arrayRemove(item),
      });

      const q = query(
        Purchase.purchaseCollection,
        where("category", "==", item.name)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let purchase: Purchase | unknown = doc.data();
        if (purchase instanceof Purchase) {
          purchase.id = doc.id;
          purchase.category = "";
          purchase.updateInDB();
        }
      });
    }
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
