(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d216f43"],{c550:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-form",{ref:"form",model:{value:t.isFormValid,callback:function(e){t.isFormValid=e},expression:"isFormValid"}},[a("v-container",[a("FTextField",{attrs:{rules:t.emailRules,label:"Email",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("FTextField",{attrs:{rules:t.passwordRules,type:"password",counter:"",label:"Password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("FBtn",{staticClass:"mr-4",attrs:{disabled:!t.isFormValid,color:"success"},on:{click:t.logIn}},[t._v(" Log In ")]),a("FBtn",{staticClass:"mr-4",attrs:{disabled:!t.isFormValid,color:"success"},on:{click:t.signUp}},[t._v(" Create Account ")])],1)],1)},n=[],s=a("d4ec"),i=a("bee2"),o=a("262e"),c=a("2caf"),l=(a("b0c0"),a("9ab4")),u=a("2fe1"),d=a("1b40"),f=a("ea7b"),b=a("cdea"),p=a("dcc0"),m=(a("ac1f"),a("00b4"),a("2b0e")),v=function(t){Object(o["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(s["a"])(this,a),t=e.apply(this,arguments),t.emailRules=[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}],t.passwordMinLength=6,t.passwordRules=[function(t){return!!t||"Password is required"},function(e){return e.length>=t.passwordMinLength||"Password must be at least 6 characters"}],t}return Object(i["a"])(a,[{key:"errorAlert",value:function(t){var e="auth/user-not-found",a="auth/email-already-in-use";switch(t){case e:alert("User not found: Try signing up!");break;case a:alert("User already exists: Try logging in!");break;default:alert("Error: "+t)}}}]),a}(m["a"]);v=Object(l["a"])([u["b"]],v);var h=a("cd49"),g=a("afbc"),j=a("e71f"),w=function(t){Object(o["a"])(a,t);var e=Object(c["a"])(a);function a(){var t;return Object(s["a"])(this,a),t=e.apply(this,arguments),t.isFormValid=!1,t.name="",t.email="",t.password="",t}return Object(i["a"])(a,[{key:"logIn",value:function(){var t=this;this.form.validate()&&Object(f["c"])(h["auth"],this.email,this.password).then((function(){g["a"].push({name:"Home"})})).catch((function(e){t.errorAlert(e.code)}))}},{key:"signUp",value:function(){var t=this;this.form.validate()&&Object(f["a"])(h["auth"],this.email,this.password).then((function(t){Object(j["k"])(Object(j["f"])(h["db"],"users",t.user.uid),{}),alert("Created account: "+t.user.email),g["a"].push({name:"Home"})})).catch((function(e){t.errorAlert(e.code)}))}}]),a}(v);Object(l["a"])([Object(d["b"])("form")],w.prototype,"form",void 0),w=Object(l["a"])([Object(u["b"])({components:{FBtn:p["a"],FTextField:b["a"]}})],w);var O=w,y=O,k=a("2877"),F=a("6544"),x=a.n(F);a("4de4"),a("d3b7"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");function C(t){return m["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var r=a.props,n=a.data,s=a.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var i=n.attrs;if(i){n.attrs={};var o=Object.keys(i).filter((function(t){if("slot"===t)return!1;var e=i[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(n.staticClass+=" ".concat(o.join(" ")))}return r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),e(r.tag,n,s)}})}var P=a("d9f7"),V=C("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,r=e.props,n=e.data,s=e.children,i=n.attrs;return i&&(n.attrs={},a=Object.keys(i).filter((function(t){if("slot"===t)return!1;var e=i[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),t(r.tag,Object(P["a"])(n,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(a||[])}),s)}}),A=a("4bd4"),E=Object(k["a"])(y,r,n,!1,null,null,null);e["default"]=E.exports;x()(E,{VContainer:V,VForm:A["a"]})}}]);
//# sourceMappingURL=chunk-2d216f43.6c44a3f8.js.map