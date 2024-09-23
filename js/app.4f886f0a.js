(function(e){function t(t){for(var r,a,o=t[0],i=t[1],s=t[2],l=0,f=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&f.push(u[a][0]),u[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==u[o]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},u={app:0},c=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-bf14ef9a":"52a77b0b","chunk-d9673a10":"7b1ca604","chunk-2d0c0311":"e762015e","chunk-7b41d4f8":"1e69a704"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-bf14ef9a":1,"chunk-d9673a10":1,"chunk-7b41d4f8":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-bf14ef9a":"f0222215","chunk-d9673a10":"f0222215","chunk-2d0c0311":"31d6cfe0","chunk-7b41d4f8":"4b380d35"}[e]+".css",u=i.p+r,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var s=c[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===u))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){s=f[o],l=s.getAttribute("data-href");if(l===r||l===u)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||u,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],d.parentNode.removeChild(d),n(c)},d.href=u;var b=document.getElementsByTagName("head")[0];b.appendChild(d)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=o(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}u[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/FinanceManager/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0613":function(e,t,n){"use strict";var r=n("2b0e"),a=n("2f62");r["a"].use(a["a"]),t["a"]=new a["a"].Store({state:{},getters:{},mutations:{},actions:{},modules:{}})},"0911":function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var r=n("1da1"),a=n("d4ec"),u=n("bee2"),c=n("262e"),o=n("2caf"),i=(n("96cf"),n("b0c0"),n("2b0e")),s=n("afbc"),l=n("f5ab"),f=n("7f4b"),d=function(e){Object(c["a"])(n,e);var t=Object(o["a"])(n);function n(){return Object(a["a"])(this,n),t.apply(this,arguments)}return Object(u["a"])(n,[{key:"pushRoute",value:function(e){s["a"].push({name:e}).then((function(e){console.log("Pushed to following route: "+e.name)}))}}],[{key:"initializeRouterGuard",value:function(){s["a"].beforeEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("Checking route to: "+t.path+" From: "+n.path),a=new f["a"],t.name===l["a"].LogIn||a.userLoggedIn?t.name===l["a"].LogIn&&a.userLoggedIn?r({name:l["a"].Home}):r():r({name:l["a"].LogIn});case 3:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}())}}]),n}(i["a"])},"55c2":function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var r=n("1da1"),a=n("d4ec"),u=n("bee2"),c=(n("96cf"),n("d3b7"),n("ea7b")),o=n("cd49"),i=n("e71f"),s=n("6fc5"),l=n("f3ea"),f=n("0613"),d=Object(s["d"])(l["a"],f["a"]),b=function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,[{key:"logInExistingUser",value:function(e,t){return new Promise((function(n){Object(c["c"])(o["auth"],e,t).then((function(){n(!0)})).catch((function(e){console.log(e.message),n(!1)}))}))}},{key:"createNewUserAccount",value:function(e,t){return new Promise((function(n){Object(c["a"])(o["auth"],e,t).then((function(e){Object(i["e"])(Object(i["c"])(o["db"],"users",e.user.uid),{}).then(),n(!0)})).catch((function(e){console.log(e.message),n(!1)}))}))}},{key:"logOutCurrentUser",value:function(){return new Promise((function(e){Object(c["d"])(o["auth"]).then((function(){e(!0)})).catch((function(t){console.log(t.message),e(!1)}))}))}}],[{key:"initializeUserStoreAuthListener",value:function(){return new Promise((function(e){o["auth"].onAuthStateChanged(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:d.setUser(n),e(!0);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))}}]),e}()},"7f4b":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("d4ec"),a=n("bee2"),u=n("6fc5"),c=n("f3ea"),o=n("0613"),i=Object(u["d"])(c["a"],o["a"]),s=function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,[{key:"userUid",get:function(){var e,t;return null!==(e=null===(t=i.user)||void 0===t?void 0:t.uid)&&void 0!==e?e:""}},{key:"userEmail",get:function(){var e,t;return null!==(e=null===(t=i.user)||void 0===t?void 0:t.email)&&void 0!==e?e:""}},{key:"userLoggedIn",get:function(){return!!i.user}}]),e}()},afbc:function(e,t,n){"use strict";n("d3b7"),n("3ca3"),n("ddb0");var r=n("2b0e"),a=n("8c4f"),u=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("This is the Home page")])])}],o=n("bee2"),i=n("d4ec"),s=n("262e"),l=n("2caf"),f=n("9ab4"),d=n("2fe1"),b=function(e){Object(s["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(i["a"])(this,n),t.apply(this,arguments)}return Object(o["a"])(n)}(r["a"]);b=Object(f["a"])([Object(d["b"])({})],b);var p=b,h=p,m=n("2877"),v=Object(m["a"])(h,u,c,!1,null,null,null),g=v.exports;r["a"].use(a["a"]);var O=[{path:"/",name:"Home",component:g},{path:"/login",name:"LogInSignUp",component:function(){return n.e("chunk-bf14ef9a").then(n.bind(null,"707f"))}},{path:"/purchases",name:"Purchases",component:function(){return Promise.all([n.e("chunk-d9673a10"),n.e("chunk-7b41d4f8")]).then(n.bind(null,"a871"))}},{path:"/subscriptions",name:"Subscriptions",component:function(){return Promise.all([n.e("chunk-d9673a10"),n.e("chunk-2d0c0311")]).then(n.bind(null,"4175"))}}],j=new a["a"]({mode:"hash",base:"/FinanceManager/",routes:O});t["a"]=j},cd49:function(e,t,n){"use strict";n.r(t),n.d(t,"analytics",(function(){return te})),n.d(t,"auth",(function(){return ne})),n.d(t,"db",(function(){return re}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("v-app-bar-title",{staticClass:"mr-4"},[e._v(" "+e._s(e.appTitle)+" ")]),n("v-toolbar-items",e._l(e.menuItems,(function(t){return n("v-btn",{key:t.title,attrs:{text:"",to:t.path}},[e._v(" "+e._s(t.title)+" ")])})),1),n("v-spacer"),e.userData.userLoggedIn?n("FMenu",{scopedSlots:e._u([{key:"hoverItem",fn:function(){return[n("FBtn",{attrs:{text:""}},[e._v(e._s(e.userData.userEmail))])]},proxy:!0},{key:"dropdownItem",fn:function(){return[n("v-list",[n("v-list-item",{on:{click:e.logOutBtnClick}},[e._v("Log Out")])],1)]},proxy:!0}],null,!1,1765703363)}):e._e()],1),n("v-main",{staticClass:"ma-6"},[n("router-view")],1)],1)},u=[],c=n("d4ec"),o=n("bee2"),i=n("262e"),s=n("2caf"),l=n("9ab4"),f=n("2fe1"),d=n("dcc0"),b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",e._g(e._b({attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("div",e._g(e._b({},"div",a,!1),r),[e._t("hoverItem")],2)]}}],null,!0)},"v-menu",e.$attrs,!1),e.$listeners),[e._t("dropdownItem")],2)},p=[],h=function(e){Object(i["a"])(n,e);var t=Object(s["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return Object(o["a"])(n)}(r["a"]);h=Object(l["a"])([Object(f["b"])({})],h);var m=h,v=m,g=n("2877"),O=n("6544"),j=n.n(O),y=n("e449"),k=Object(g["a"])(v,b,p,!1,null,null,null),_=k.exports;j()(k,{VMenu:y["a"]});var w=n("7f4b"),I=n("55c2"),S=n("0911"),L=n("f5ab"),x=function(e){Object(i["a"])(n,e);var t=Object(s["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.apply(this,arguments),e.appTitle="Finance Manager",e.sidebar=!1,e.menuItems=[{title:"Home",path:"/"},{title:"Subscriptions",path:"/subscriptions"},{title:"Purchases",path:"/purchases"}],e.userData=new w["a"],e.userAuthHandler=new I["a"],e.routesHandler=new S["a"],e}return Object(o["a"])(n,[{key:"logOutBtnClick",value:function(){var e=this;this.userAuthHandler.logOutCurrentUser().then((function(t){t&&e.routesHandler.pushRoute(L["a"].LogIn)}))}}]),n}(r["a"]);x=Object(l["a"])([Object(f["b"])({components:{FMenu:_,FBtn:d["a"]}})],x);var P=x,E=P,A=n("7496"),U=n("40dc"),C=n("bb78"),B=n("8336"),V=n("8860"),T=n("da13"),M=n("f6c4"),H=n("2fa4"),F=n("2a7f"),$=Object(g["a"])(E,a,u,!1,null,null,null),R=$.exports;j()($,{VApp:A["a"],VAppBar:U["a"],VAppBarTitle:C["a"],VBtn:B["a"],VList:V["a"],VListItem:T["a"],VMain:M["a"],VSpacer:H["a"],VToolbarItems:F["a"]});var z=n("afbc"),D=n("0613"),N=n("f309");r["a"].use(N["a"],{theme:{primary:"#008069"}});var Y=new N["a"]({}),G=n("683f"),q=n("a563"),J=n("8654");r["a"].component("v-text-field",J["a"]),r["a"].use(q["a"],{decimalLength:2,autoDecimalMode:!0,defaultValue:null});q["a"];var K=n("260b"),W=n("000b"),X=n("ea7b"),Q=n("e71f"),Z={apiKey:"AIzaSyBV60lSb6Y1Y8ojVOR4zYn6NBz5U-cd9x4",authDomain:"finance-manager-4d396.firebaseapp.com",projectId:"finance-manager-4d396",storageBucket:"finance-manager-4d396.appspot.com",messagingSenderId:"972635535553",appId:"1:972635535553:web:d57ed9013af32c2859fc40",measurementId:"G-S510X5YFW7"},ee=Object(K["a"])(Z),te=Object(W["a"])(ee),ne=Object(X["b"])(ee),re=Object(Q["d"])();r["a"].config.productionTip=!1,r["a"].use(G["a"]),I["a"].initializeUserStoreAuthListener().then((function(){new r["a"]({router:z["a"],store:D["a"],vuetify:Y,render:function(e){return e(R)}}).$mount("#app")})),S["a"].initializeRouterGuard()},dcc0:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-btn",e._g(e._b({},"v-btn",e.$attrs,!1),e.$listeners),[e._t("default")],2)},a=[],u=n("bee2"),c=n("d4ec"),o=n("262e"),i=n("2caf"),s=n("9ab4"),l=n("2b0e"),f=n("2fe1"),d=function(e){Object(o["a"])(n,e);var t=Object(i["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return Object(u["a"])(n)}(l["a"]);d=Object(s["a"])([Object(f["b"])({})],d);var b=d,p=b,h=n("2877"),m=n("6544"),v=n.n(m),g=n("8336"),O=Object(h["a"])(p,r,a,!1,null,null,null);t["a"]=O.exports;v()(O,{VBtn:g["a"]})},f3ea:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("d4ec"),a=n("bee2"),u=n("262e"),c=n("2caf"),o=n("9ab4"),i=n("0613"),s=n("6fc5"),l=function(e){Object(u["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(r["a"])(this,n),e=t.apply(this,arguments),e.user=null,e}return Object(a["a"])(n,[{key:"setUser",value:function(e){var t;this.user=e,console.log("User set to: "+(null===(t=this.user)||void 0===t?void 0:t.email))}}]),n}(s["c"]);Object(o["a"])([s["b"]],l.prototype,"setUser",null),l=Object(o["a"])([Object(s["a"])({dynamic:!0,store:i["a"],name:"UserStore"})],l)},f5ab:function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return r})),function(e){e["Home"]="Home",e["LogIn"]="LogInSignUp"}(r||(r={}))}});
//# sourceMappingURL=app.4f886f0a.js.map