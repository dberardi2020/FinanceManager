import Component from "vue-class-component";
import Vue from "vue";

@Component
export class LogInSignUp extends Vue {
  emailRules = [
    (v: string): boolean | string => !!v || "E-mail is required",
    (v: string): boolean | string => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  passwordMinLength = 6;
  passwordRules = [
    (v: string): boolean | string => !!v || "Password is required",
    (v: string): boolean | string =>
      v.length >= this.passwordMinLength ||
      "Password must be at least 6 characters",
  ];
}
