"use strict";(self.webpackChunkng_alain=self.webpackChunkng_alain||[]).push([[806],{2806:(K,y,r)=>{r.r(y),r.d(y,{OperationModule:()=>W});var D=r(2080),c=r(3423),p=r(1636),t=r(7716),f=r(3630),b=r(2157),x=r(8058),O=r(1147),M=r(3109),I=r(1032),P=r(8542),A=r(4453),Z=r(9374),T=r(4514),l=r(665),z=r(5887),u=r(1244),g=r(7674),v=r(4295),k=r(269),F=r(8583);function J(a,s){if(1&a){const n=t.EpF();t.TgZ(0,"button",7),t.NdJ("click",function(){return t.CHM(n),t.oxw().add()}),t._uU(1,"\u65b0\u5efa"),t.qZA()}}function B(a,s){if(1&a){const n=t.EpF();t.ynx(0),t.TgZ(1,"form",8,9),t.TgZ(3,"se",10),t.TgZ(4,"input",11),t.NdJ("ngModelChange",function(i){return t.CHM(n),t.oxw().operation.name=i}),t.qZA(),t.qZA(),t.TgZ(5,"se",12),t.TgZ(6,"location-select",13),t.NdJ("onLocationSelect",function(i){return t.CHM(n),t.oxw().onLocationSelect(i)}),t.qZA(),t.qZA(),t.qZA(),t.BQk()}if(2&a){const n=t.oxw();t.xp6(4),t.Q6J("ngModel",n.operation.name),t.xp6(2),t.Q6J("locationInfo",n.location)("sizes",8)}}function N(a,s){if(1&a){const n=t.EpF();t.ynx(0),t.TgZ(1,"table-template",14),t.NdJ("editFuncOut",function(i){return t.CHM(n),t.oxw().editFun2(i)}),t.qZA(),t.BQk()}if(2&a){const n=t.oxw();t.xp6(1),t.Q6J("dataList",n.dataSet2)("theadList",n.teadList2)("total",n.total2)("pageIndex",n.pageIndex2)("keyNameList",n.keyNameList2)("pageSize",n.pageSize2)}}function V(a,s){if(1&a&&t._UZ(0,"nz-option",22),2&a){const n=s.$implicit;t.Q6J("nzLabel",n.name)("nzValue",n.id)}}function Q(a,s){if(1&a){const n=t.EpF();t.ynx(0),t.TgZ(1,"form",8,9),t.TgZ(3,"se",15),t.TgZ(4,"input",16),t.NdJ("ngModelChange",function(i){return t.CHM(n),t.oxw().addAccount.name=i}),t.qZA(),t.qZA(),t.TgZ(5,"se",17),t.TgZ(6,"nz-select",18),t.NdJ("ngModelChange",function(i){return t.CHM(n),t.oxw().addAccount.charactarId=i}),t.YNc(7,V,1,2,"nz-option",19),t.qZA(),t.qZA(),t.TgZ(8,"se",20),t.TgZ(9,"input",21),t.NdJ("ngModelChange",function(i){return t.CHM(n),t.oxw().addAccount.phone=i}),t.qZA(),t.qZA(),t.qZA(),t.BQk()}if(2&a){const n=t.oxw();t.xp6(4),t.Q6J("ngModel",n.addAccount.name),t.xp6(2),t.Q6J("ngModel",n.addAccount.charactarId),t.xp6(1),t.Q6J("ngForOf",n.charactarList),t.xp6(2),t.Q6J("ngModel",n.addAccount.phone)}}let w=(()=>{class a{constructor(n,e,i,o,d,h,m){this.global=n,this.router=e,this.modal=i,this.apiService=o,this.msg=d,this.enumService=h,this.activatedRoute=m,this.total=0,this.isVisibleAccountList=!1,this.pageIndex2=1,this.pageSize2=10,this.total2=0,this.addTitle="",this.addAccount={},this.isEdit=!1,this.pageSize=10,this.pageIndex=1,this.isVisible=!1,this.keyNameList2=[{type:"index",name:"index"},{type:"text",name:"name"},{type:"text",name:"charactarName"},{type:"text",name:"phone"},{type:"time",name:"createTime"},{type:"text",name:"status"}],this.teadList2=[{name:"\u5e8f\u53f7",type:"index"},{name:"\u59d3\u540d"},{name:"\u89d2\u8272"},{name:"\u624b\u673a\u53f7"},{name:"\u521b\u5efa\u65f6\u95f4"},{name:"\u72b6\u6001"}],this.teadList=[{name:"\u5e8f\u53f7",type:"index"},{name:"\u8fd0\u8425\u4e2d\u5fc3"},{name:"\u8fd0\u8425\u4e2d\u5fc3\u7f16\u53f7"},{name:"\u533a\u57df"},{name:"\u521b\u5efa\u65f6\u95f4"},{name:"\u64cd\u4f5c",widthSet:!0}],this.keyNameList=[{type:"index",name:"index"},{type:"text",name:"name"},{type:"text",name:"serial"},{type:"text",name:"SSQ"},{type:"time",name:"createTime"},{type:"buttonList",buttons:[{text:"\u7f16\u8f91",index:1},{text:"\u8d26\u53f7",index:2},{text:"\u6dfb\u52a0",index:3}]}],this.dataSet=[],this.locationConfig=p.x.getCityConfig(),this.location={provinceId:-1},this.operation={name:""}}ngOnInit(){this.charactarSearch(),this.getData()}add(){this.router.navigate(["add"],{relativeTo:this.activatedRoute})}onLocationSelect(n){this.location=n}handleOk(){this.location.name=this.operation.name,this.isEdit?(this.location.id=this.operation.id,this.apiService.updateOperation(this.location).then(n=>{n&&n.data?(this.isVisible=!1,this.isEdit=!1,this.ngOnInit(),this.msg.success("\u7f16\u8f91\u6210\u529f")):(this.isVisible=!1,this.msg.error("\u7f16\u8f91\u5931\u8d25"))})):this.apiService.addOperation(this.location).then(n=>{n&&n.data?(this.isVisible=!1,this.ngOnInit(),this.msg.success("\u6dfb\u52a0\u6210\u529f")):(this.isVisible=!1,this.msg.error("\u6dfb\u52a0\u5931\u8d25"))})}handleCancel(){this.isVisible=!1,this.isEdit=!1,this.operation.name="",this.location={provinceId:-1}}getData(){this.apiService.getOperationList().then(n=>{n&&n.data?(n.data.forEach((e,i)=>{e.index=i,e.SSQ=this.enumService.getSSQ(e.provinceId,e.cityId,e.districtId)}),this.dataSet=n.data):(this.dataSet=[],this.total=0)})}editFun(n){this.editItem2=n,this.addTitle=this.editItem2.name+"-\u6dfb\u52a0\u5b50\u8d26\u53f7",1==n.btnIndex?this.router.navigate(["detail",n.id],{relativeTo:this.activatedRoute}):2==n.btnIndex?(this.isVisibleAccountList=!0,this.getAccountList({page:this.pageIndex2-1,size:this.pageSize2,operateId:n.id})):this.isVisibleAccount=!0}editFun2(n){}charactarSearch(){this.apiService.charactarSearch().then(n=>{if(n&&n.data){let e=[];n.data.forEach(i=>{"OP"==i.category&&e.push(i)}),this.charactarList=e,console.log(n.data),this.charactarMap=this.enumService.getMap(e)}})}getAccountList(n){this.apiService.getAccountList(n).then(e=>{e&&e.data&&(e.data.content.forEach((i,o)=>{i.index=o,i.charactarText=this.charactarMap[i.charactarId],i.status=i.deleted?"\u7981\u7528":"\u6b63\u5e38"}),this.dataSet2=e.data.content,this.total2=e.data.totalElements)})}onCancel(){this.isVisibleAccountList=!1}turnPage(n){}turnPage2(n){this.pageIndex=n,this.getAccountList({page:this.pageIndex2-1,size:this.pageSize2,operateId:this.editItem2.id})}addCancel(){this.isVisibleAccount=!1}addOk(){this.addAccount.operateId=this.editItem2.id,this.enumService.isMobile(this.addAccount.phone)?this.apiService.createAccount(this.addAccount).then(n=>{n&&n.data?(this.isVisibleAccount=!1,this.msg.success("\u6dfb\u52a0\u6210\u529f")):(this.isVisible=!1,this.msg.error(n.message))}):this.msg.error("\u624b\u673a\u53f7\u683c\u5f0f\u9519\u8bef")}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(p.x),t.Y36(c.F0),t.Y36(f.Te),t.Y36(b.s),t.Y36(x.dD),t.Y36(O.t),t.Y36(c.gz))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-operation-list"]],decls:10,vars:12,consts:[[3,"action"],["phActionTpl",""],[3,"dataList","theadList","total","pageIndex","keyNameList","pageSize","pageIndexOut","editFuncOut"],["nzWidth","1000px","nzTitle","\u64cd\u4f5c",3,"nzVisible","nzVisibleChange","nzOnCancel","nzOnOk"],[4,"nzModalContent"],["nzWidth","1000px","nzTitle","\u8fd0\u8425\u4e2d\u5fc3\u5b50\u8d26\u53f7",3,"nzVisible","nzFooter","nzVisibleChange","nzOnCancel"],["nzWidth","800px",3,"nzVisible","nzTitle","nzVisibleChange","nzOnCancel","nzOnOk"],["nz-button","","nzType","primary",3,"click"],["nz-form","","se-container","1"],["f","ngForm"],["label","\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0","error","\u8bf7\u8f93\u5165\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0!","required",""],["nz-input","","type","text","placeholder","\u8bf7\u8f93\u5165\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0","name","name",3,"ngModel","ngModelChange"],["label","\u9009\u62e9\u7701\u5e02\u533a\u5730\u533a","error","\u9009\u62e9\u7701\u5e02\u533a!","required",""],[3,"locationInfo","sizes","onLocationSelect"],[3,"dataList","theadList","total","pageIndex","keyNameList","pageSize","editFuncOut"],["label","\u59d3\u540d","error","\u8bf7\u8f93\u5165\u59d3\u540d!","required",""],["nz-input","","type","text","placeholder","\u8bf7\u8f93\u5165\u59d3\u540d","name","name",3,"ngModel","ngModelChange"],["label","\u9009\u62e9\u89d2\u8272","required",""],["nzPlaceHolder","\u9009\u62e9\u89d2\u8272","name","charactarId",2,"min-width","80px",3,"ngModel","ngModelChange"],[3,"nzLabel","nzValue",4,"ngFor","ngForOf"],["label","\u624b\u673a\u53f7","error","\u8bf7\u8f93\u5165\u624b\u673a\u53f7!","required",""],["nz-input","","type","number","placeholder","\u8bf7\u8f93\u5165\u624b\u673a\u53f7","name","phone",3,"ngModel","ngModelChange"],[3,"nzLabel","nzValue"]],template:function(n,e){if(1&n&&(t.TgZ(0,"page-header",0),t.YNc(1,J,2,0,"ng-template",null,1,t.W1O),t.qZA(),t.TgZ(3,"table-template",2),t.NdJ("pageIndexOut",function(o){return e.turnPage(o)})("editFuncOut",function(o){return e.editFun(o)}),t.qZA(),t.TgZ(4,"nz-modal",3),t.NdJ("nzVisibleChange",function(o){return e.isVisible=o})("nzOnCancel",function(){return e.handleCancel()})("nzOnOk",function(){return e.handleOk()}),t.YNc(5,B,7,3,"ng-container",4),t.qZA(),t.TgZ(6,"nz-modal",5),t.NdJ("nzVisibleChange",function(o){return e.isVisibleAccountList=o})("nzOnCancel",function(){return e.onCancel()}),t.YNc(7,N,2,6,"ng-container",4),t.qZA(),t.TgZ(8,"nz-modal",6),t.NdJ("nzVisibleChange",function(o){return e.isVisibleAccount=o})("nzOnCancel",function(){return e.addCancel()})("nzOnOk",function(){return e.addOk()}),t.YNc(9,Q,10,4,"ng-container",4),t.qZA()),2&n){const i=t.MAs(2);t.Q6J("action",i),t.xp6(3),t.Q6J("dataList",e.dataSet)("theadList",e.teadList)("total",e.total)("pageIndex",e.pageIndex)("keyNameList",e.keyNameList)("pageSize",e.pageSize),t.xp6(1),t.Q6J("nzVisible",e.isVisible),t.xp6(2),t.Q6J("nzVisible",e.isVisibleAccountList)("nzFooter",null),t.xp6(2),t.Q6J("nzVisible",e.isVisibleAccount)("nzTitle",e.addTitle)}},directives:[M.q,I.S,P.du,P.Hf,A.ix,Z.dQ,T.w,l._Y,l.JL,l.F,z.Lr,u.nV,u.d_,g.Zp,l.Fj,l.JJ,l.On,v._,k.Vq,F.sg,l.wV,k.Ip],encapsulation:2}),a})();var _=r(5392),E=r(7018),q=r(6704),C=r(3654);function U(a,s){if(1&a){const n=t.EpF();t.TgZ(0,"button",28),t.NdJ("click",function(){return t.CHM(n),t.oxw().showMap()}),t.O4$(),t.TgZ(1,"svg",29),t._UZ(2,"path",30),t.qZA(),t.qZA()}}const Y=function(a){return{display:a}};function j(a,s){if(1&a){const n=t.EpF();t.TgZ(0,"button",28),t.NdJ("click",function(){return t.CHM(n),t.oxw().showMap()}),t.O4$(),t.TgZ(1,"svg",29),t._UZ(2,"path",30),t.qZA(),t.qZA()}}const R=function(a){return{display:a}};const H=[{path:"",component:w},{path:"list",component:w},{path:"add",component:(()=>{class a{constructor(n,e,i,o,d,h,m){this.global=n,this.router=e,this.modal=i,this.apiService=o,this.msg=d,this.enumService=h,this.activatedRoute=m,this.containerId=`${(new Date).getTime()}`,this.isShowMap="none",this.scale=11,this.locationConfig=p.x.getCityConfig(),this.location={provinceId:-1},this.operation={name:""},this.mapOptions={zoom:this.scale},this.lng=120.133718,this.lat=30.261314,this.map=void 0,this.placeInfo={},this.locationCache=[0,0]}showMap(){this.isShowMap="block"}ngOnInit(){}back(){this.router.navigate([".."],{relativeTo:this.activatedRoute})}add(){this.operation.name?this.lngEdit&&this.latEdit?(this.operation.provinceId=this.location.provinceId,this.operation.cityId=this.location.cityId,this.operation.districtId=this.location.districtId,this.operation.longitude=this.lngEdit,this.operation.latitude=this.latEdit,this.apiService.addOperation(this.operation).then(n=>{n&&n.data?(this.msg.success("\u6dfb\u52a0\u6210\u529f"),this.operation={}):this.msg.error("\u6dfb\u52a0\u5931\u8d25")})):this.msg.error("\u70b9\u51fb\u8be6\u7ec6\u5730\u5740\u53f3\u8fb9\u6309\u94ae,\u9009\u62e9\u8be6\u7ec6\u5b9a\u4f4d\u5730\u5740"):this.msg.error("\u8bf7\u586b\u5199\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0")}sureAddress(){!this.operation.address&&this.inputAddress&&(this.operation.address=this.inputAddress),this.isShowMap="none"}closeMap(){this.isShowMap="none"}handleCancel(){this.operation.name="",this.location={provinceId:-1}}ngAfterViewInit(){this.initMap([this.lng,this.lat])}initMap(n){this.position=new window.AMap.LngLat(this.lng,this.lat),this.locationCache=n,this.mapOptions.center=this.lng&&this.lat?[this.lng,this.lat]:n,this.map=new AMap.Map(this.containerId,this.mapOptions);let i=new AMap.Autocomplete({input:"tipinput"});this.geocoder=new AMap.Geocoder({radius:1e3}),this.placeSearch=new AMap.PlaceSearch({map:this.map}),AMap.event.addListener(i,"select",o=>{console.log(o),this.lngEdit=o.poi.location.lng,this.latEdit=o.poi.location.lat,this.map.setCenter([this.lngEdit,this.latEdit]),this.setMarker(o.poi.location.lng,o.poi.location.lat)}),this.map.on("click",o=>{this.lngEdit=o.lnglat.getLng(),this.latEdit=o.lnglat.getLat(),this.regeoCode(this.lngEdit+","+this.latEdit),this.setMarker(o.lnglat.getLng(),o.lnglat.getLat())})}regeoCode(n){this.geocoder.getAddress(n,(e,i)=>{"complete"===e&&i.regeocode?this.operation.address=i.regeocode.formattedAddress:console.log("\u6839\u636e\u7ecf\u7eac\u5ea6\u67e5\u8be2\u5730\u5740\u5931\u8d25")})}clearMarker(){this.marker&&this.map.remove(this.marker)}setMarker(n,e){this.clearMarker(),this.marker=new AMap.Marker({position:[n,e],content:"<div class='img-box'>\n      <img src='assets/marker.jpg' id='animat' style='width:60px ;position:relative;animation:mymove 5s infinite;-webkit-animation:mymove 5s infinite; animation-direction:alternate;animation-timing-function: ease-in-out;-webkit-animation:mymove 5s infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function: ease-in-out;'/> </div>",offset:new AMap.Pixel(-12,-12)}),this.map.add(this.marker)}onLocationSelect(n){this.location=n}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(p.x),t.Y36(c.F0),t.Y36(f.Te),t.Y36(b.s),t.Y36(x.dD),t.Y36(O.t),t.Y36(c.gz))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-operation-add"]],decls:59,vars:14,consts:[[3,"click"],["nz-form","","se-container","1"],["f","ngForm"],["label","\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0","error","\u8bf7\u8f93\u5165\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0!","required",""],["nz-input","","type","text","placeholder","\u8bf7\u8f93\u5165\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0","name","name",3,"ngModel","ngModelChange"],["label","\u9009\u62e9\u7701\u5e02\u533a\u5730\u533a","col","1","error","\u9009\u62e9\u7701\u5e02\u533a!","required",""],[3,"locationInfo","sizes","onLocationSelect"],["label","\u8be6\u7ec6\u5730\u5740","col","1","required",""],["nzSearch","",2,"width","50%",3,"nzAddOnAfter"],["nz-input","","type","text","placeholder","\u8bf7\u8f93\u5165\u5355\u4f4d\u5730\u5740","name","address",3,"ngModel","ngModelChange"],["suffixIconButton",""],["col","1",2,"text-align","center"],["nz-button","","nzType","primary",3,"disabled","click"],["nz-button","",3,"click"],[1,"map-bg",3,"ngStyle"],[1,"bgs"],[1,"map-container",3,"id"],[1,"input-card",2,"width","600px"],[2,"color","grey"],[1,"input-item"],[1,"input-item-prepend"],[1,"input-item-text"],[2,"padding-left","10px"],[2,"padding-left","10px","width","600p"],["id","myPageTop"],["id","tipinput",2,"width","500px","margin-bottom","10px",3,"ngModel","ngModelChange"],[1,"btn-box"],["nz-button","","nzType","primary",3,"click"],["nz-button","","nzType","primary","nzSearch","",3,"click"],["viewBox","64 64 896 896","focusable","false","fill","currentColor","width","1em","height","1em","data-icon","environment","aria-hidden","true"],["d","M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"]],template:function(n,e){if(1&n&&(t.TgZ(0,"page-header"),t.TgZ(1,"nz-breadcrumb"),t.TgZ(2,"nz-breadcrumb-item"),t._uU(3," \u9996\u9875 "),t.qZA(),t.TgZ(4,"nz-breadcrumb-item",0),t.NdJ("click",function(){return e.back()}),t.TgZ(5,"a"),t._uU(6,"\u8fd0\u8425\u4e2d\u5fc3"),t.qZA(),t.qZA(),t.TgZ(7,"nz-breadcrumb-item"),t._uU(8," \u6dfb\u52a0 "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(9,"nz-card"),t.TgZ(10,"nz-row"),t.TgZ(11,"form",1,2),t.TgZ(13,"se",3),t.TgZ(14,"input",4),t.NdJ("ngModelChange",function(o){return e.operation.name=o}),t.qZA(),t.qZA(),t.TgZ(15,"se",5),t.TgZ(16,"location-select",6),t.NdJ("onLocationSelect",function(o){return e.onLocationSelect(o)}),t.qZA(),t.qZA(),t.TgZ(17,"se",7),t.TgZ(18,"nz-input-group",8),t.TgZ(19,"input",9),t.NdJ("ngModelChange",function(o){return e.operation.address=o}),t.qZA(),t.qZA(),t.YNc(20,U,3,0,"ng-template",null,10,t.W1O),t.qZA(),t.TgZ(22,"se",11),t.TgZ(23,"button",12),t.NdJ("click",function(){return e.add()}),t._uU(24,"\u521b\u5efa"),t.qZA(),t.TgZ(25,"button",13),t.NdJ("click",function(){return e.back()}),t._uU(26,"\u8fd4\u56de"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(27,"div",14),t.TgZ(28,"div",15),t._UZ(29,"div",16),t.TgZ(30,"div",17),t.TgZ(31,"label",18),t._uU(32,"\u70b9\u51fb\u5730\u56fe\u83b7\u53d6\u5730\u5740\u4fe1\u606f"),t.qZA(),t.TgZ(33,"div",19),t.TgZ(34,"div",20),t.TgZ(35,"span",21),t._uU(36,"\u7ecf\u7eac\u5ea6"),t.qZA(),t.qZA(),t.TgZ(37,"span",22),t._uU(38),t.qZA(),t.qZA(),t.TgZ(39,"div",19),t.TgZ(40,"div",20),t.TgZ(41,"span",21),t._uU(42,"\u5730\u5740"),t.qZA(),t.qZA(),t.TgZ(43,"span",23),t._uU(44),t.qZA(),t.qZA(),t.TgZ(45,"div",24),t.TgZ(46,"table"),t.TgZ(47,"tr"),t.TgZ(48,"td"),t.TgZ(49,"label"),t._uU(50,"\u6551\u63f4\u70b9(\u70b9\u51fb\u5730\u56fe,\u641c\u7d22\u5730\u5740)"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(51,"tr"),t.TgZ(52,"td"),t.TgZ(53,"input",25),t.NdJ("ngModelChange",function(o){return e.inputAddress=o}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(54,"div",26),t.TgZ(55,"button",13),t.NdJ("click",function(){return e.closeMap()}),t._uU(56,"\u8fd4\u56de"),t.qZA(),t.TgZ(57,"button",27),t.NdJ("click",function(){return e.sureAddress()}),t._uU(58,"\u786e\u5b9a"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n){const i=t.MAs(12),o=t.MAs(21);t.xp6(14),t.Q6J("ngModel",e.operation.name),t.xp6(2),t.Q6J("locationInfo",e.location)("sizes",8),t.xp6(2),t.Q6J("nzAddOnAfter",o),t.xp6(1),t.Q6J("ngModel",e.operation.address),t.xp6(4),t.Q6J("disabled",i.invalid),t.xp6(4),t.Q6J("ngStyle",t.VKq(12,Y,e.isShowMap)),t.xp6(2),t.Q6J("id",e.containerId),t.xp6(9),t.AsE(" \u7eac\u5ea6:",e.latEdit?e.latEdit:"\u672a\u9009\u62e9",", \u7ecf\u5ea6:",e.lngEdit?e.latEdit:"\u672a\u9009\u62e9"," "),t.xp6(6),t.hij(" ",e.operation.address," "),t.xp6(9),t.Q6J("ngModel",e.inputAddress)}},directives:[M.q,_.Dg,_.MO,E.bd,q.SK,l._Y,l.JL,l.F,z.Lr,u.nV,u.d_,g.Zp,l.Fj,l.JJ,l.On,v._,T.w,g.gB,A.ix,Z.dQ,F.PC,C.$Z,C.Uo],styles:[".map-bg[_ngcontent-%COMP%]{width:100%;height:100%;background-color:#00000080;text-align:center;position:absolute;z-index:999;left:0;top:0;right:0}#myPageTop[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{text-align:left}.map-container[_ngcontent-%COMP%]{height:100%;width:100;position:absolute;top:0;left:0;bottom:0;right:0}h3[_ngcontent-%COMP%]{color:#fff;width:100%;height:100px;padding:0 16px;background-color:#1890ff;text-align:center;margin:0;position:absolute;z-index:999;left:0;top:0;right:0}h3[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:56px;font-size:30px;font-weight:bold;margin:0!important;padding-top:10px}.header-box[_ngcontent-%COMP%]{background:#f8f8f8;text-align:center;padding:25px 0}.header-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.header-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;font-size:18px;font-weight:200}.header-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px;font-weight:bold;color:#333}.back[_ngcontent-%COMP%]{display:inline-block;float:right;margin-right:20px;cursor:pointer;position:absolute;top:50px;right:50px}.map-box[_ngcontent-%COMP%]{position:absolute;z-index:999;top:100px;right:0;left:0;bottom:0;background:#eee}.table-head[_ngcontent-%COMP%]{border:1px solid #eee;display:inline-flex}.table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:6px 4px;font-size:14px;flex:1}table[_ngcontent-%COMP%]{width:100%}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#f8f8f8;padding:10px}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:center;padding:5px 0;line-height:30px}h5[_ngcontent-%COMP%]{height:50px;font-size:18px;font-weight:200px;line-height:50px;padding-left:20px;border-bottom:1px solid #eee;margin:0}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:center}.check[_ngcontent-%COMP%]{display:none}.checkRemark[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:70px;display:block}.marker-img[_ngcontent-%COMP%]{width:60px!important}#animat[_ngcontent-%COMP%]{position:relative}.yellow[_ngcontent-%COMP%]{color:#d1d12c}.red[_ngcontent-%COMP%]{color:tomato}.orange[_ngcontent-%COMP%]{color:orange}#video-container-box[_ngcontent-%COMP%]{position:absolute;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background:rgba(0,0,0,.5);display:none}#video-container[_ngcontent-%COMP%]{position:absolute;left:50%;margin:100px auto auto -400px;top:50%}.icon-p[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{position:relative;top:-3px}.orgInfo-box[_ngcontent-%COMP%]{background:#fff;padding:20px 20px 20px 45px}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:13px}.demo-map[_ngcontent-%COMP%]{width:500px;height:500px}.input-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;width:500px;border-width:0;border-radius:.4rem;flex:1 1 auto;padding:.75rem 1.25rem;position:absolute;top:20px;right:20px}.input-item[_ngcontent-%COMP%]{position:relative;display:flex;flex-wrap:wrap;align-items:center;width:100%;height:3rem}.input-item-text[_ngcontent-%COMP%]{width:6rem;text-align:justify;padding:.1rem .7rem;display:inline-block;text-justify:distribute-all-lines;text-align-last:justify;-moz-text-align-last:justify;-webkit-text-align-last:justify;align-items:center;margin-bottom:0;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;text-align:center;white-space:nowrap;background-color:#e9ecef;border:1px solid #ced4da;border-radius:.25rem 0 0 .25rem}#address[_ngcontent-%COMP%]{width:300px}"]}),a})()},{path:"detail/:id",component:(()=>{class a{constructor(n,e,i,o,d,h,m){this.global=n,this.router=e,this.modal=i,this.apiService=o,this.msg=d,this.enumService=h,this.activatedRoute=m,this.containerId=`${(new Date).getTime()}`,this.isShowMap="none",this.scale=11,this.locationConfig=p.x.getCityConfig(),this.location={provinceId:-1},this.operation={name:""},this.mapOptions={zoom:this.scale},this.lng=120.133718,this.lat=30.261314,this.map=void 0,this.placeInfo={},this.locationCache=[0,0]}showMap(){this.isShowMap="block"}ngOnInit(){this.id=this.activatedRoute.snapshot.params.id,this.apiService.getOperationById(this.id).then(n=>{n&&n.data?(this.operation=n.data,this.latEdit=n.data.latitude,this.lngEdit=n.data.longitude,this.location={provinceId:n.data.provinceId,cityId:n.data.cityId,districtId:n.data.districtId}):this.operation={}})}back(){this.router.navigate(["../../"],{relativeTo:this.activatedRoute})}add(){this.operation.name?this.lngEdit&&this.latEdit?(this.operation.provinceId=this.location.provinceId,this.operation.cityId=this.location.cityId,this.operation.districtId=this.location.districtId,this.operation.longitude=this.lngEdit,this.operation.latitude=this.latEdit,this.apiService.updateOperation(this.operation).then(n=>{n&&n.data?(this.msg.success("\u7f16\u8f91\u6210\u529f"),this.back()):this.msg.error("\u6dfb\u52a0\u5931\u8d25")})):this.msg.error("\u70b9\u51fb\u8be6\u7ec6\u5730\u5740\u53f3\u8fb9\u6309\u94ae,\u9009\u62e9\u8be6\u7ec6\u5b9a\u4f4d\u5730\u5740"):this.msg.error("\u8bf7\u586b\u5199\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0")}sureAddress(){!this.operation.address&&this.inputAddress&&(this.operation.address=this.inputAddress),this.isShowMap="none"}closeMap(){this.isShowMap="none"}handleCancel(){this.operation.name="",this.location={provinceId:-1}}ngAfterViewInit(){this.initMap([this.lng,this.lat])}initMap(n){this.position=new window.AMap.LngLat(this.lng,this.lat),this.locationCache=n,this.mapOptions.center=this.lng&&this.lat?[this.lng,this.lat]:n,this.map=new AMap.Map(this.containerId,this.mapOptions);let i=new AMap.Autocomplete({input:"tipinput"});this.geocoder=new AMap.Geocoder({radius:1e3}),this.placeSearch=new AMap.PlaceSearch({map:this.map}),AMap.event.addListener(i,"select",o=>{console.log(o),this.lngEdit=o.poi.location.lng,this.latEdit=o.poi.location.lat,this.map.setCenter([this.lngEdit,this.latEdit]),this.setMarker(o.poi.location.lng,o.poi.location.lat)}),this.map.on("click",o=>{this.lngEdit=o.lnglat.getLng(),this.latEdit=o.lnglat.getLat(),this.regeoCode(this.lngEdit+","+this.latEdit),this.setMarker(o.lnglat.getLng(),o.lnglat.getLat())})}regeoCode(n){this.geocoder.getAddress(n,(e,i)=>{"complete"===e&&i.regeocode?this.operation.address=i.regeocode.formattedAddress:console.log("\u6839\u636e\u7ecf\u7eac\u5ea6\u67e5\u8be2\u5730\u5740\u5931\u8d25")})}clearMarker(){this.marker&&this.map.remove(this.marker)}setMarker(n,e){this.clearMarker(),this.marker=new AMap.Marker({position:[n,e],content:"<div class='img-box'>\n      <img src='assets/marker.jpg' id='animat' style='width:60px ;position:relative;animation:mymove 5s infinite;-webkit-animation:mymove 5s infinite; animation-direction:alternate;animation-timing-function: ease-in-out;-webkit-animation:mymove 5s infinite;-webkit-animation-direction:alternate;-webkit-animation-timing-function: ease-in-out;'/> </div>",offset:new AMap.Pixel(-12,-12)}),this.map.add(this.marker)}onLocationSelect(n){this.location=n}}return a.\u0275fac=function(n){return new(n||a)(t.Y36(p.x),t.Y36(c.F0),t.Y36(f.Te),t.Y36(b.s),t.Y36(x.dD),t.Y36(O.t),t.Y36(c.gz))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-operation-detail"]],decls:59,vars:14,consts:[[3,"click"],["nz-form","","se-container","1"],["f","ngForm"],["label","\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0","error","\u8bf7\u8f93\u5165\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0!","required",""],["nz-input","","type","text","placeholder","\u8bf7\u8f93\u5165\u8fd0\u8425\u4e2d\u5fc3\u540d\u79f0","name","name",3,"ngModel","ngModelChange"],["label","\u9009\u62e9\u7701\u5e02\u533a\u5730\u533a","col","1","error","\u9009\u62e9\u7701\u5e02\u533a!","required",""],[3,"locationInfo","sizes","onLocationSelect"],["label","\u8be6\u7ec6\u5730\u5740","col","1","required",""],["nzSearch","",2,"width","50%",3,"nzAddOnAfter"],["nz-input","","type","text","placeholder","\u8bf7\u8f93\u5165\u5355\u4f4d\u5730\u5740","name","address",3,"ngModel","ngModelChange"],["suffixIconButton",""],["col","1",2,"text-align","center"],["nz-button","","nzType","primary",3,"disabled","click"],["nz-button","",3,"click"],[1,"map-bg",3,"ngStyle"],[1,"bgs"],[1,"map-container",3,"id"],[1,"input-card",2,"width","600px"],[2,"color","grey"],[1,"input-item"],[1,"input-item-prepend"],[1,"input-item-text"],[2,"padding-left","10px"],[2,"padding-left","10px","width","600p"],["id","myPageTop"],["id","tipinput",2,"width","500px","margin-bottom","10px",3,"ngModel","ngModelChange"],[1,"btn-box"],["nz-button","","nzType","primary",3,"click"],["nz-button","","nzType","primary","nzSearch","",3,"click"],["viewBox","64 64 896 896","focusable","false","fill","currentColor","width","1em","height","1em","data-icon","environment","aria-hidden","true"],["d","M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"]],template:function(n,e){if(1&n&&(t.TgZ(0,"page-header"),t.TgZ(1,"nz-breadcrumb"),t.TgZ(2,"nz-breadcrumb-item"),t._uU(3," \u9996\u9875 "),t.qZA(),t.TgZ(4,"nz-breadcrumb-item",0),t.NdJ("click",function(){return e.back()}),t.TgZ(5,"a"),t._uU(6,"\u8fd0\u8425\u4e2d\u5fc3"),t.qZA(),t.qZA(),t.TgZ(7,"nz-breadcrumb-item"),t._uU(8," \u7f16\u8f91 "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(9,"nz-card"),t.TgZ(10,"nz-row"),t.TgZ(11,"form",1,2),t.TgZ(13,"se",3),t.TgZ(14,"input",4),t.NdJ("ngModelChange",function(o){return e.operation.name=o}),t.qZA(),t.qZA(),t.TgZ(15,"se",5),t.TgZ(16,"location-select",6),t.NdJ("onLocationSelect",function(o){return e.onLocationSelect(o)}),t.qZA(),t.qZA(),t.TgZ(17,"se",7),t.TgZ(18,"nz-input-group",8),t.TgZ(19,"input",9),t.NdJ("ngModelChange",function(o){return e.operation.address=o}),t.qZA(),t.qZA(),t.YNc(20,j,3,0,"ng-template",null,10,t.W1O),t.qZA(),t.TgZ(22,"se",11),t.TgZ(23,"button",12),t.NdJ("click",function(){return e.add()}),t._uU(24,"\u786e\u5b9a"),t.qZA(),t.TgZ(25,"button",13),t.NdJ("click",function(){return e.back()}),t._uU(26,"\u8fd4\u56de"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(27,"div",14),t.TgZ(28,"div",15),t._UZ(29,"div",16),t.TgZ(30,"div",17),t.TgZ(31,"label",18),t._uU(32,"\u70b9\u51fb\u5730\u56fe\u83b7\u53d6\u5730\u5740\u4fe1\u606f"),t.qZA(),t.TgZ(33,"div",19),t.TgZ(34,"div",20),t.TgZ(35,"span",21),t._uU(36,"\u7ecf\u7eac\u5ea6"),t.qZA(),t.qZA(),t.TgZ(37,"span",22),t._uU(38),t.qZA(),t.qZA(),t.TgZ(39,"div",19),t.TgZ(40,"div",20),t.TgZ(41,"span",21),t._uU(42,"\u5730\u5740"),t.qZA(),t.qZA(),t.TgZ(43,"span",23),t._uU(44),t.qZA(),t.qZA(),t.TgZ(45,"div",24),t.TgZ(46,"table"),t.TgZ(47,"tr"),t.TgZ(48,"td"),t.TgZ(49,"label"),t._uU(50,"\u6551\u63f4\u70b9(\u70b9\u51fb\u5730\u56fe,\u641c\u7d22\u5730\u5740)"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(51,"tr"),t.TgZ(52,"td"),t.TgZ(53,"input",25),t.NdJ("ngModelChange",function(o){return e.inputAddress=o}),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(54,"div",26),t.TgZ(55,"button",13),t.NdJ("click",function(){return e.closeMap()}),t._uU(56,"\u8fd4\u56de"),t.qZA(),t.TgZ(57,"button",27),t.NdJ("click",function(){return e.sureAddress()}),t._uU(58,"\u786e\u5b9a"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n){const i=t.MAs(12),o=t.MAs(21);t.xp6(14),t.Q6J("ngModel",e.operation.name),t.xp6(2),t.Q6J("locationInfo",e.location)("sizes",8),t.xp6(2),t.Q6J("nzAddOnAfter",o),t.xp6(1),t.Q6J("ngModel",e.operation.address),t.xp6(4),t.Q6J("disabled",i.invalid),t.xp6(4),t.Q6J("ngStyle",t.VKq(12,R,e.isShowMap)),t.xp6(2),t.Q6J("id",e.containerId),t.xp6(9),t.AsE(" \u7eac\u5ea6:",e.latEdit?e.latEdit:"\u672a\u9009\u62e9",", \u7ecf\u5ea6:",e.lngEdit?e.latEdit:"\u672a\u9009\u62e9"," "),t.xp6(6),t.hij(" ",e.operation.address," "),t.xp6(9),t.Q6J("ngModel",e.inputAddress)}},directives:[M.q,_.Dg,_.MO,E.bd,q.SK,l._Y,l.JL,l.F,z.Lr,u.nV,u.d_,g.Zp,l.Fj,l.JJ,l.On,v._,T.w,g.gB,A.ix,Z.dQ,F.PC,C.$Z,C.Uo],styles:[".map-bg[_ngcontent-%COMP%]{width:100%;height:100%;background-color:#00000080;text-align:center;position:absolute;z-index:999;left:0;top:0;right:0}#myPageTop[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{text-align:left}.map-container[_ngcontent-%COMP%]{height:100%;width:100;position:absolute;top:0;left:0;bottom:0;right:0}h3[_ngcontent-%COMP%]{color:#fff;width:100%;height:100px;padding:0 16px;background-color:#1890ff;text-align:center;margin:0;position:absolute;z-index:999;left:0;top:0;right:0}h3[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{line-height:56px;font-size:30px;font-weight:bold;margin:0!important;padding-top:10px}.header-box[_ngcontent-%COMP%]{background:#f8f8f8;text-align:center;padding:25px 0}.header-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.header-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;font-size:18px;font-weight:200}.header-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:18px;font-weight:bold;color:#333}.back[_ngcontent-%COMP%]{display:inline-block;float:right;margin-right:20px;cursor:pointer;position:absolute;top:50px;right:50px}.map-box[_ngcontent-%COMP%]{position:absolute;z-index:999;top:100px;right:0;left:0;bottom:0;background:#eee}.table-head[_ngcontent-%COMP%]{border:1px solid #eee;display:inline-flex}.table-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:6px 4px;font-size:14px;flex:1}table[_ngcontent-%COMP%]{width:100%}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#f8f8f8;padding:10px}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:center;padding:5px 0;line-height:30px}h5[_ngcontent-%COMP%]{height:50px;font-size:18px;font-weight:200px;line-height:50px;padding-left:20px;border-bottom:1px solid #eee;margin:0}table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{text-align:center}.check[_ngcontent-%COMP%]{display:none}.checkRemark[_ngcontent-%COMP%]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:70px;display:block}.marker-img[_ngcontent-%COMP%]{width:60px!important}#animat[_ngcontent-%COMP%]{position:relative}.yellow[_ngcontent-%COMP%]{color:#d1d12c}.red[_ngcontent-%COMP%]{color:tomato}.orange[_ngcontent-%COMP%]{color:orange}#video-container-box[_ngcontent-%COMP%]{position:absolute;z-index:1000;top:0;right:0;left:0;bottom:0;height:100%;background:rgba(0,0,0,.5);display:none}#video-container[_ngcontent-%COMP%]{position:absolute;left:50%;margin:100px auto auto -400px;top:50%}.icon-p[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{position:relative;top:-3px}.orgInfo-box[_ngcontent-%COMP%]{background:#fff;padding:20px 20px 20px 45px}tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:13px}.demo-map[_ngcontent-%COMP%]{width:500px;height:500px}.input-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;width:500px;border-width:0;border-radius:.4rem;flex:1 1 auto;padding:.75rem 1.25rem;position:absolute;top:20px;right:20px}.input-item[_ngcontent-%COMP%]{position:relative;display:flex;flex-wrap:wrap;align-items:center;width:100%;height:3rem}.input-item-text[_ngcontent-%COMP%]{width:6rem;text-align:justify;padding:.1rem .7rem;display:inline-block;text-justify:distribute-all-lines;text-align-last:justify;-moz-text-align-last:justify;-webkit-text-align-last:justify;align-items:center;margin-bottom:0;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;text-align:center;white-space:nowrap;background-color:#e9ecef;border:1px solid #ced4da;border-radius:.25rem 0 0 .25rem}#address[_ngcontent-%COMP%]{width:300px}"]}),a})()}];let $=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[c.Bz.forChild(H)],c.Bz]}),a})(),W=(()=>{class a{}return a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[[D.m8,$]]}),a})()}}]);