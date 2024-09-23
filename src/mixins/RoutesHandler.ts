import Vue from "vue";
import router from "@/router";
import { RoutesEnum } from "@/enums/RoutesEnum";
import UserDataStoreHandler from "@/store/handlers/UserDataStoreHandler";

export default class RoutesHandler extends Vue {
  static initializeRouterGuard(): void {
    router.beforeEach(async (to, from, next) => {
      console.log("Checking route to: " + to.path + " From: " + from.path);

      const userData = new UserDataStoreHandler();

      if (to.name !== RoutesEnum.LogIn && !userData.userLoggedIn) {
        next({ name: RoutesEnum.LogIn });
      } else if (to.name === RoutesEnum.LogIn && userData.userLoggedIn) {
        next({ name: RoutesEnum.Home });
      } else {
        next();
      }
    });
  }

  pushRoute(toRoute: RoutesEnum): void {
    router.push({ name: toRoute }).then((Route) => {
      console.log("Pushed to following route: " + Route.name);
    });
  }
}
