webpackJsonp([25],{"3T01":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("cAgV"),s=a("5aCZ"),i=a("HpkY"),c={components:{tinymce:s.a},directives:{waves:n.a},data:function(){return{content:""}},methods:{save:function(){var t=this;if(""===this.content)this.$notify.error({title:"失败",message:"内容不能为空"});else{var e={content:this.content};i.a.aboutinsert(e).then(function(e){200===e.data.status?t.$notify({title:"成功",message:e.data.message,type:"success"}):t.$notify.error({title:"失败",message:e.data.message})})}},getdata:function(){var t=this;i.a.aboutindex().then(function(e){200===e.data.status&&(t.content=e.data.aboutcontent)})}},mounted:function(){this.getdata()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{staticClass:"path"},[a("span",{staticStyle:{float:"left"}},[t._v("当前位置：")]),t._v(" "),a("el-breadcrumb-item",[t._v("公司管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("关于我们")])],1),t._v(" "),a("div",{staticClass:"tinymce"},[a("tinymce",{model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"btn",attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")])],1)],1)},staticRenderFns:[]};var r=a("VU/8")(c,o,!1,function(t){a("EP6a")},"data-v-003ce2f3",null);e.default=r.exports},EP6a:function(t,e){}});
//# sourceMappingURL=25.bcc166579a82f8cb0b78.js.map