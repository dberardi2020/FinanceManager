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

  errorAlert(code: string): void {
    const userNotFound = "auth/user-not-found";
    const emailInUse = "auth/email-already-in-use";

    switch (code) {
      case userNotFound:
        alert("User not found: Try signing up!");
        break;
      case emailInUse:
        alert("User already exists: Try logging in!");
        break;
      default:
        alert("Error: " + code);
    }
  }
}
