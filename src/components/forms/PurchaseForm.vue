<template>
  <div>
    <FCard class="pa-4">
      <h2>Purchase Details</h2>
      <FDatePicker v-model="datePicker" @change="logDate"></FDatePicker>
    </FCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FCard from "@/components/vuetify-component-wrappers/FCard/FCard.vue";
import FDatePicker from "@/components/vuetify-component-wrappers/FDatePicker/FDatePicker.vue";
import FBtn from "@/components/vuetify-component-wrappers/FBtn/FBtn.vue";

@Component({
  components: { FBtn, FDatePicker, FCard },
})
export default class PurchaseForm extends Vue {
  datePicker = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);

  logDate(): void {
    console.log(this.datePicker);
  }
}
</script>

<style scoped></style>
