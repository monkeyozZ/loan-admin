webpackJsonp([7],{bWPM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i,s,n,o=a("Xxa5"),l=a.n(o),u=a("exGp"),c=a.n(u),d=a("cAgV"),m=a("Q0Ca"),p=a("vLgD"),f=this,h=(r=c()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(p.a)({url:"card/index",method:"get",params:e}));case 1:case"end":return t.stop()}},t,f)})),function(t){return r.apply(this,arguments)}),v=(i=c()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(p.a)({url:"card/index",method:"post",data:{_id:e}}));case 1:case"end":return t.stop()}},t,f)})),function(t){return i.apply(this,arguments)}),g={update:(s=c()(l.a.mark(function t(e,a){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(p.a)({url:"card/update/"+e,method:"post",data:a}));case 1:case"end":return t.stop()}},t,f)})),function(t,e){return s.apply(this,arguments)}),getonelist:v,getlist:h,delcount:(n=c()(l.a.mark(function t(e){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",Object(p.a)({url:"card/delete",method:"post",data:{_id:e}}));case 1:case"end":return t.stop()}},t,f)})),function(t){return n.apply(this,arguments)})},b=a("mtWM"),w=a.n(b),_={directives:{waves:d.a},filters:{transtatus:m.e},data:function(){var t,e,a,r,i=this;return{tableData:[],loading:!1,dialogFormVisible:!1,id:"",url:"",Form:{title:"",imgurl:"",des:"",url:"",recommend:!1,status:!1,order:""},fileList:[],isupdata:!1,rules:{title:[{required:!0,message:"请输入信用卡名称",trigger:"blur"}],des:[{required:!0,message:"请输入信用卡概述",trigger:"blur"}],url:[{validator:(t=c()(l.a.mark(function t(e,a,r){var s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:""===a?r(new Error("请输入推广链接")):(s=new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"),s.test(a)||r(new Error("网址格式不正确")),r());case 1:case"end":return t.stop()}},t,i)})),function(e,a,r){return t.apply(this,arguments)}),trigger:"blur"}],pass_rate:[{validator:(e=c()(l.a.mark(function t(e,a,r){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:""!==a?/^[1-9]\d*|0$/.test(a)||r(new Error("请输入数字")):r(new Error("请输入信用卡通过率"));case 1:case"end":return t.stop()}},t,i)})),function(t,a,r){return e.apply(this,arguments)}),trigger:"blur"}],success_num:[{validator:(a=c()(l.a.mark(function t(e,a,r){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:""!==a?/^[1-9]\d*|0$/.test(a)||r(new Error("请输入数字")):r(new Error("请输入下款成功数"));case 1:case"end":return t.stop()}},t,i)})),function(t,e,r){return a.apply(this,arguments)}),trigger:"blur"}],order:[{validator:(r=c()(l.a.mark(function t(e,a,r){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:""!==a?/^[1-9]\d*|0$/.test(a)||r(new Error("请输入数字")):r(new Error("请输入排序"));case 1:case"end":return t.stop()}},t,i)})),function(t,e,a){return r.apply(this,arguments)}),trigger:"blur"}]},listQuery:{page:1,limit:10},total:null}},methods:{getlist:function(){var t=this;this.loading=!0,g.getlist(this.listQuery).then(function(e){t.tableData=e.data.cardlist,t.total=e.data.total,t.loading=!1}).catch(function(t){console.log(t)})},handleEdit:function(t){this.id=t,this.dialogFormVisible=!0,this.url="http://admin.wumakeji.com/card/update/"+this.id},getonelist:function(t){var e=this;g.getonelist(t).then(function(t){200===t.status&&(e.Form.title=t.data.onelist.title,e.fileList.push({url:"http://admin.wumakeji.com/"+t.data.onelist.imgurl}),e.$set(e.Form,"originpic",t.data.onelist.imgurl),e.Form.des=t.data.onelist.des,e.Form.url=t.data.onelist.url,e.Form.recommend=t.data.onelist.recommend,e.Form.status=t.data.onelist.status,e.Form.order=t.data.onelist.order)}).catch(function(t){console.log("err:"+t)})},upData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(t.isupdata?t.$refs.upload.submit():(t.initformdata(),w.a.post("http://admin.wumakeji.com/card/update/"+t.id,t.FormData).then(function(e){200===e.data.status?(t.$notify({title:"成功",message:e.data.message,type:"success"}),t.getlist(),t.dialogFormVisible=!1):t.$notify.error({title:"失败",message:e.data.message})})))})},handleDelete:function(t){var e=this;this.$confirm("确定删除该记录吗？","温馨提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){g.delcount(t).then(function(t){200===t.data.status?(e.$notify({title:"成功",message:t.data.message,type:"success"}),e.getlist()):e.$notify.error({title:"失败",message:t.data.message})})})},uploadsuccess:function(t,e,a){200===t.status?(this.$notify({title:"成功",message:t.message,type:"success"}),this.getlist(),this.dialogFormVisible=!1):this.$notify.error({title:"失败",message:t.message})},initformdata:function(){this.FormData=new FormData,this.FormData.append("title",this.Form.title),this.FormData.append("des",this.Form.des),this.FormData.append("url",this.Form.url),this.FormData.append("recommend",this.Form.recommend),this.FormData.append("status",this.Form.status),this.FormData.append("order",this.Form.order)},change:function(){this.isupdata=!0},uploading:function(t,e,a){console.log(t.percent)},handleSizeChange:function(t){this.listQuery.limit=t,this.getlist()},handleCurrentChange:function(t){this.listQuery.page=t,this.getlist()}},watch:{dialogFormVisible:{handler:function(){this.dialogFormVisible||(this.id="",this.isupdata=!1)}},id:{handler:function(){this.id?this.getonelist(this.id):this.fileList=[]},immediate:!0}},beforeRouteEnter:function(t,e,a){a(function(t){t.getlist()})}},F={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{staticClass:"path"},[a("span",{staticStyle:{float:"left"}},[t._v("当前位置：")]),t._v(" "),a("el-breadcrumb-item",[t._v("信用卡管理")]),t._v(" "),a("el-breadcrumb-item",{attrs:{to:{path:"/card/index"}}},[t._v("信用卡列表")])],1),t._v(" "),a("div",{staticClass:"card-container"},[a("div",{staticClass:"table-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{label:"ID",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"排序",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.order))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"信用卡名称",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"信用卡概述"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.des))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"推广链接"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.url))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("transtatus")(e.row.status)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"primary",icon:"el-icon-edit",circle:""},on:{click:function(a){t.handleEdit(e.row._id)}}}),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(a){t.handleDelete(e.row._id)}}})]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,40],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:"编辑",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("div",{staticClass:"form-box"},[a("el-form",{ref:"dataForm",attrs:{rules:t.rules,model:t.Form,"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"信用卡名称：",prop:"title"}},[a("el-input",{staticStyle:{width:"60%"},attrs:{placeholder:"信用卡名称"},model:{value:t.Form.title,callback:function(e){t.$set(t.Form,"title",e)},expression:"Form.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"信用卡icon：",prop:"pic"}},[a("el-upload",{ref:"upload",attrs:{action:t.url,"file-list":t.fileList,limit:1,data:t.Form,"auto-upload":!1,accept:"image/*","list-type":"picture-card","on-success":t.uploadsuccess,"on-change":t.change}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过100kb")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"信用卡概述：",prop:"des"}},[a("el-input",{staticStyle:{width:"60%"},attrs:{type:"textarea",placeholder:"信用卡概述",autosize:{minRows:2,maxRows:4}},model:{value:t.Form.des,callback:function(e){t.$set(t.Form,"des",e)},expression:"Form.des"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"推广链接：",prop:"url"}},[a("el-input",{staticStyle:{width:"90%"},attrs:{placeholder:"推广链接"},model:{value:t.Form.url,callback:function(e){t.$set(t.Form,"url",e)},expression:"Form.url"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否首页推荐："}},[a("el-switch",{attrs:{"active-text":"是","inactive-text":"否"},model:{value:t.Form.recommend,callback:function(e){t.$set(t.Form,"recommend",e)},expression:"Form.recommend"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否开启："}},[a("el-switch",{attrs:{"active-text":"开启","inactive-text":"暂停"},model:{value:t.Form.status,callback:function(e){t.$set(t.Form,"status",e)},expression:"Form.status"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"排序：",prop:"order"}},[a("el-input",{staticStyle:{width:"120px"},attrs:{placeholder:"排序（数字）"},model:{value:t.Form.order,callback:function(e){t.$set(t.Form,"order",e)},expression:"Form.order"}})],1)],1),t._v(" "),a("div",{staticClass:"form-footer"},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.upData(e)}}},[t._v("保存修改")])],1)],1)])],1)},staticRenderFns:[]};var y=a("VU/8")(_,F,!1,function(t){a("eCw5")},"data-v-6cfec116",null);e.default=y.exports},eCw5:function(t,e){}});
//# sourceMappingURL=7.98b9046329df9bdd6c4c.js.map