import Vue from "vue";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib";

Vue.component("v-text-field", VTextField);
Vue.use(VCurrencyField, {
  // locale: "pt-BR",
  decimalLength: 2,
  autoDecimalMode: true,
  // min: null,
  // max: null,
  defaultValue: null,
  // valueAsInteger: false,
  // allowNegative: true,
});

export default VCurrencyField;
