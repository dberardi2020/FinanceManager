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
import Category, { subscriptionCategories } from "@/models/Category";
import Subscription from "@/models/Subscription";
import firebase from "firebase/compat";
import Unsubscribe = firebase.Unsubscribe;

@Component({
  components: { FBtn, FTextField, FCardTitle, FCard },
})
export default class SubscriptionCategoryEditor extends Vue {
  categories: Category[] = [];
  categoryField = "";

  unsubscribe: Unsubscribe | null = null;

  addCategory(): void {
    if (this.categoryField) {
      let newCategory: Category = {
        name: this.categoryField,
        isWithdrawal: true,
      };

      updateDoc(UserData.userDataDoc, {
        [subscriptionCategories]: arrayUnion(newCategory),
      });

      this.categoryField = "";
    }
  }

  async updateWithdrawal(item: Category): Promise<void> {
    if (item) {
      item.isWithdrawal = !item.isWithdrawal;
      await updateDoc(UserData.userDataDoc, {
        [subscriptionCategories]: this.categories,
      });

      const q = query(
        Subscription.subCollection,
        where("category", "==", item.name)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let sub: Subscription | unknown = doc.data();
        if (sub instanceof Subscription) {
          sub.id = doc.id;
          sub.isWithdrawal = item.isWithdrawal;
          sub.updateInDB();
        }
      });
    }
  }

  async deleteCategory(item: Category): Promise<void> {
    if (item) {
      await updateDoc(UserData.userDataDoc, {
        [subscriptionCategories]: arrayRemove(item),
      });

      const q = query(
        Subscription.subCollection,
        where("category", "==", item.name)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let sub: Subscription | unknown = doc.data();
        if (sub instanceof Subscription) {
          sub.id = doc.id;
          sub.category = "";
          sub.updateInDB();
        }
      });
    }
  }

  mounted(): void {
    this.unsubscribe = this.handleSnapshot();

    this.$root.$on("subCategoryEditorClosed", () => {
      this.categoryField = "";
    });
  }

  handleSnapshot(): Unsubscribe {
    return onSnapshot(UserData.userDataDoc, (doc: any) => {
      this.categories.splice(0);
      doc.get(subscriptionCategories)?.forEach((category: Category) => {
        this.categories.push(category);
      });
    });
  }
}
</script>
