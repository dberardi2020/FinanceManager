(function(e){function t(t){for(var r,a,o=t[0],i=t[1],s=t[2],l=0,f=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(t);while(f.length)f.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==c[o]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},c={app:0},u=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-70939ff3":"0fa12566","chunk-2d0cf53e":"7deddff4","chunk-b1cbaeec":"77f0ef05","chunk-09b978c8":"b5a98c2e","chunk-c9718e34":"294fde74"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-70939ff3":1,"chunk-b1cbaeec":1,"chunk-09b978c8":1,"chunk-c9718e34":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-70939ff3":"f0222215","chunk-2d0cf53e":"31d6cfe0","chunk-b1cbaeec":"bb6784a8","chunk-09b978c8":"3f9f4574","chunk-c9718e34":"e085d33d"}[e]+".css",c=i.p+r,u=document.getElementsByTagName("link"),o=0;o<u.length;o++){var s=u[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){s=f[o],l=s.getAttribute("data-href");if(l===r||l===c)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||c,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],p.parentNode.removeChild(p),n(u)},p.href=c;var b=document.getElementsByTagName("head")[0];b.appendChild(p)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=c[e]=[t,n]}));t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=o(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=c[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}c[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/FinanceManager/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var p=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0613":function(e,t,n){"use strict";var r=n("2b0e"),a=n("2f62");r["a"].use(a["a"]),t["a"]=new a["a"].Store({state:{},getters:{},mutations:{},actions:{},modules:{}})},"4e5e":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("d4ec"),a=n("bee2"),c=n("262e"),u=n("2caf"),o=n("9ab4"),i=n("0613"),s=n("6fc5"),l=function(e){Object(c["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(r["a"])(this,n),e=t.apply(this,arguments),e.user=null,e}return Object(a["a"])(n,[{key:"setUser",value:function(e){this.user=e}}]),n}(s["c"]);Object(o["a"])([s["b"]],l.prototype,"setUser",null),l=Object(o["a"])([Object(s["a"])({dynamic:!0,store:i["a"],name:"UserStore"})],l)},afbc:function(e,t,n){"use strict";var r=n("1da1"),a=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("b0c0"),n("2b0e")),c=n("8c4f"),u=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("This is the Home page")])])}],i=n("bee2"),s=n("d4ec"),l=n("262e"),f=n("2caf"),p=n("9ab4"),b=n("2fe1"),d=function(e){Object(l["a"])(n,e);var t=Object(f["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(i["a"])(n)}(a["a"]);d=Object(p["a"])([Object(b["b"])({})],d);var h=d,m=h,v=n("2877"),g=Object(v["a"])(m,u,o,!1,null,null,null),O=g.exports,j=n("6fc5"),y=n("4e5e"),_=n("0613"),k=Object(j["d"])(y["a"],_["a"]);a["a"].use(c["a"]);var w=[{path:"/",name:"Home",component:O},{path:"/login",name:"LogIn",component:function(){return Promise.all([n.e("chunk-70939ff3"),n.e("chunk-2d0cf53e")]).then(n.bind(null,"62f2"))}},{path:"/purchases",name:"Purchases",component:function(){return Promise.all([n.e("chunk-70939ff3"),n.e("chunk-b1cbaeec"),n.e("chunk-c9718e34")]).then(n.bind(null,"a871"))}},{path:"/subscriptions",name:"Subscriptions",component:function(){return Promise.all([n.e("chunk-70939ff3"),n.e("chunk-b1cbaeec"),n.e("chunk-09b978c8")]).then(n.bind(null,"4175"))}}],I=new c["a"]({mode:"hash",base:"/FinanceManager/",routes:w});I.beforeEach(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=k.user,"LogIn"===t.name||a?"LogIn"===t.name&&a?r({name:"Home"}):r():r({name:"LogIn"});case 2:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}());t["a"]=I},cd49:function(e,t,n){"use strict";n.r(t),n.d(t,"analytics",(function(){return ne})),n.d(t,"auth",(function(){return re})),n.d(t,"db",(function(){return ae}));var r=n("1da1"),a=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("96cf"),n("d3b7"),n("2b0e")),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("v-app-bar-title",{staticClass:"mr-4"},[e._v(" "+e._s(e.appTitle)+" ")]),n("v-toolbar-items",e._l(e.menuItems,(function(t){return n("v-btn",{key:t.title,attrs:{text:"",to:t.path}},[e._v(" "+e._s(t.title)+" ")])})),1),n("v-spacer"),e.isUserLoggedIn()?e._e():n("FBtn",{attrs:{text:"",to:"login"}},[e._v("Log In")]),e.isUserLoggedIn()?n("FMenu",{scopedSlots:e._u([{key:"hoverItem",fn:function(){return[n("FBtn",{attrs:{text:""}},[e._v(e._s(e.loggedInUserEmail()))])]},proxy:!0},{key:"dropdownItem",fn:function(){return[n("v-list",[n("v-list-item",[e._v("Settings")]),n("v-list-item",{on:{click:function(t){return e.logout()}}},[e._v("Log Out")])],1)]},proxy:!0}],null,!1,1036793455)}):e._e()],1),n("v-main",{staticClass:"ma-6"},[n("router-view")],1)],1)},u=[],o=n("d4ec"),i=n("bee2"),s=n("262e"),l=n("2caf"),f=n("9ab4"),p=n("2fe1"),b=n("dcc0"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-menu",e._g(e._b({attrs:{"offset-y":""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,a=t.attrs;return[n("div",e._g(e._b({},"div",a,!1),r),[e._t("hoverItem")],2)]}}],null,!0)},"v-menu",e.$attrs,!1),e.$listeners),[e._t("dropdownItem")],2)},h=[],m=function(e){Object(s["a"])(n,e);var t=Object(l["a"])(n);function n(){return Object(o["a"])(this,n),t.apply(this,arguments)}return Object(i["a"])(n)}(a["a"]);m=Object(f["a"])([Object(p["b"])({})],m);var v=m,g=v,O=n("2877"),j=n("6544"),y=n.n(j),_=n("e449"),k=Object(O["a"])(g,d,h,!1,null,null,null),w=k.exports;y()(k,{VMenu:_["a"]});var I=n("ea7b"),S=n("6fc5"),x=n("4e5e"),L=n("0613"),E=n("afbc"),P=Object(S["d"])(x["a"],L["a"]),V=function(e){Object(s["a"])(n,e);var t=Object(l["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.appTitle="Finance Manager",e.sidebar=!1,e.menuItems=[{title:"Subscriptions",path:"/subscriptions"},{title:"Purchases",path:"/purchases"}],e}return Object(i["a"])(n,[{key:"loggedInUserEmail",value:function(){var e,t;return null!==(e=null===(t=P.user)||void 0===t?void 0:t.email)&&void 0!==e?e:""}},{key:"isUserLoggedIn",value:function(){return!!P.user}},{key:"logout",value:function(){var e=Object(I["b"])();Object(I["d"])(e).then((function(){E["a"].push({name:"LogIn"})})).catch((function(e){alert(e.message)}))}}]),n}(a["a"]);V=Object(f["a"])([Object(p["b"])({components:{FMenu:w,FBtn:b["a"]}})],V);var B=V,T=B,M=n("7496"),U=n("40dc"),A=n("bb78"),C=n("8336"),F=n("8860"),$=n("da13"),N=n("f6c4"),R=n("2fa4"),D=n("2a7f"),H=Object(O["a"])(T,c,u,!1,null,null,null),Y=H.exports;y()(H,{VApp:M["a"],VAppBar:U["a"],VAppBarTitle:A["a"],VBtn:C["a"],VList:F["a"],VListItem:$["a"],VMain:N["a"],VSpacer:R["a"],VToolbarItems:D["a"]});var z=n("f309");a["a"].use(z["a"],{theme:{primary:"#008069"}});var q=new z["a"]({}),J=n("683f"),K=n("a563"),G=n("8654");a["a"].component("v-text-field",G["a"]),a["a"].use(K["a"],{decimalLength:2,autoDecimalMode:!0,defaultValue:null});K["a"];var W=n("260b"),X=n("000b"),Q=n("e71f"),Z=Object(S["d"])(x["a"],L["a"]),ee={apiKey:"AIzaSyBV60lSb6Y1Y8ojVOR4zYn6NBz5U-cd9x4",authDomain:"finance-manager-4d396.firebaseapp.com",projectId:"finance-manager-4d396",storageBucket:"finance-manager-4d396.appspot.com",messagingSenderId:"972635535553",appId:"1:972635535553:web:d57ed9013af32c2859fc40",measurementId:"G-S510X5YFW7"},te=Object(W["a"])(ee),ne=Object(X["a"])(te),re=Object(I["b"])(te),ae=Object(Q["h"])();function ce(){return new Promise((function(e){re.onAuthStateChanged(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n?(Z.setUser(n),e(!0)):(Z.setUser(null),e(!0));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}))}a["a"].config.productionTip=!1,a["a"].use(J["a"]),ce().then((function(){new a["a"]({router:E["a"],store:L["a"],vuetify:q,render:function(e){return e(Y)}}).$mount("#app")}))},dcc0:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-btn",e._g(e._b({},"v-btn",e.$attrs,!1),e.$listeners),[e._t("default")],2)},a=[],c=n("bee2"),u=n("d4ec"),o=n("262e"),i=n("2caf"),s=n("9ab4"),l=n("2b0e"),f=n("2fe1"),p=function(e){Object(o["a"])(n,e);var t=Object(i["a"])(n);function n(){return Object(u["a"])(this,n),t.apply(this,arguments)}return Object(c["a"])(n)}(l["a"]);p=Object(s["a"])([Object(f["b"])({})],p);var b=p,d=b,h=n("2877"),m=n("6544"),v=n.n(m),g=n("8336"),O=Object(h["a"])(d,r,a,!1,null,null,null);t["a"]=O.exports;v()(O,{VBtn:g["a"]})}});
//# sourceMappingURL=app.acca3350.js.map