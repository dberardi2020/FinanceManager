<template>
  <FCard>
    <FCardTitle class="justify-center">{{ value }} Categories</FCardTitle>
    <v-divider class="mb-5"></v-divider>
    <v-card-subtitle v-if="categories.length === 0" class="pa-0 ml-2"
      >No {{ value }} Categories...</v-card-subtitle
    >
    <v-chip
      class="ma-1"
      v-for="category in categories"
      :key="category"
      close
      @click:close="deleteCategory(category)"
      >{{ category }}</v-chip
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

@Component({
  components: { FBtn, FTextField, FCardTitle, FCard },
  props: ["value"],
})
export default class CategoryEditor extends Vue {
  type = this.$props.value;
  updateField = "categories." + this.type;

  categories: string[] = [];
  categoryField = "";

  unsubscribe = onSnapshot(userDataDoc, (doc) => {
    this.categories.splice(0);
    doc.get("categories." + this.type)?.forEach((category: string) => {
      this.categories.push(category);
    });
  });

  addCategory(): void {
    if (this.categoryField) {
      updateDoc(userDataDoc, {
        [this.updateField]: arrayUnion(this.categoryField),
      });
      this.categoryField = "";
    }
  }

  deleteCategory(item: string): void {
    if (item) {
      updateDoc(userDataDoc, {
        [this.updateField]: arrayRemove(item),
      });
    }
  }
}
</script>
