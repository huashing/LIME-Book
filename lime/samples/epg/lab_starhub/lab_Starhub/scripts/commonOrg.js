/*=====================================================================================
Copyright (C) 2009 Nippon Telegraph and Telephone Corporation. All rights reserved.
=====================================================================================*/
/**************************  共通データ  ********************************/
var gUregMax = 3;
var gState=new State();
function State(){
// パレンタル情報 readPersistentArray() で取得(ページ切り替え単位で更新)
	this.secret=false; // シークレットモードON/OFF
	this.age=20;

	this.bmltype=0; // 0:TOP 1:News VoD Top 2:News VoD Bulletin 3:Hot News 4:Reslut 5:Play 6:Reversi 7:HttpPos 8:mazegame

// タイマー
	this.clockTimerID=NaN; // 時計

	this.crid="";
	this.grid="";
	this.Ureg=new Array(gUregMax);
	this.retrunBmltype=0;
	
	this.launchDocument = ST_launchDocument;
	this.getUrl = ST_getUrl;
	this.load=ST_load;
}
// 初期化処理
function ST_load(){
	var tmp;
	var i,j;
	// GETデータ取得
	var uri=browser.getActiveDocument();
	if(uri==null)return;
	var ary=uri.split("?");
	this.curBml=String(ary[0]);
	if(ary!=null&&ary.length>1){
		this.Ureg = ary[1].split("&");
		if(this.Ureg.length<gUregMax){
			for(i=this.Ureg.length;i<gUregMax;i++)this.Ureg[i]="";
		}
		for(i=0;i<this.Ureg.length;i++) {
			for(j=gEncTbl.length-1;j>=0;j--)this.Ureg[i]=(String(this.Ureg[i]).split(gEncTbl[j])).join(gDecTbl[j]);
			if(this.Ureg[i]=="null"||this.Ureg[i]=="NULL")this.Ureg[i]="";
		}
		
		this.retrunBmltype=this.Ureg[0];
		this.crid=this.Ureg[1];
		this.grid=this.Ureg[2];
	}
}
function ST_launchDocument(uri){
	lockScreen();
//	showElem("loading2");
	unlockScreen();
	var ret=browser.launchDocument(gState.getUrl(uri),"cut");
	if(isNaN(ret))browser.launchDocument(gState.getUrl("startup.bml"),"cut");
//	if(isNaN(ret))browser.launchDocument(gState.getUrl("reversi-w1.bml"),"cut");
//	if(isNaN(ret))browser.launchDocument(gState.getUrl("HttpPostTest.bml"),"cut");
}
function ST_getUrl(uri){
	var i,j;
	this.Ureg=new Array(gUregMax);
	
	this.Ureg[0]=this.bmltype;
	this.Ureg[1]=this.crid;
	this.Ureg[2]=this.grid;

	for(i=0;i<this.Ureg.length;i++){
		for(j=0;j<gEncTbl.length;j++)this.Ureg[i]=(String(this.Ureg[i]).split(gDecTbl[j])).join(gEncTbl[j]);
		if(this.Ureg[i]=="null"||this.Ureg[i]=="NULL")this.Ureg[i]="";
	}
	if(this.Ureg.length>0){
		uri+="?";
		for(var i=0;i<this.Ureg.length&&i<gUregMax;i++){
			if(i!=0)uri+="&";
			uri+=(this.Ureg[i]!=null)?this.Ureg[i]:"";
		}
	}
	return uri;
}

/***************************  URLエンコード対象テーブル  *********************************/
var gDecTbl=new Array();var gEncTbl=new Array();
gDecTbl[0]='%'; gEncTbl[0]='%25';
gDecTbl[1]='#'; gEncTbl[1]='%23';
gDecTbl[2]='$'; gEncTbl[2]='%24';
gDecTbl[3]='&'; gEncTbl[3]='%26';
gDecTbl[4]='+'; gEncTbl[4]='%2B';
gDecTbl[5]='/'; gEncTbl[5]='%2F';
gDecTbl[6]=':'; gEncTbl[6]='%3A';
gDecTbl[7]=';'; gEncTbl[7]='%3B';
gDecTbl[8]='='; gEncTbl[8]='%3D';
gDecTbl[9]='?'; gEncTbl[9]='%3F';
gDecTbl[10]=' ';gEncTbl[10]='+';

/*************************  共通基礎関数  *******************************/
// ハンドラ
var gPlaySound = true;
// 処理補助
function getElementById(id){return document.getElementById(id);}
function showElem(id){getElementById(id).normalStyle.visibility="visible";}
	function hideElem(id){getElementById(id).normalStyle.visibility="hidden";}
function isVis(id){
	if(getElementById(id)==null) return false;
	if(getElementById(id).normalStyle.visibility=="visible")return true;
	return false;
}
function setImg(id,img){if(getElementById(id).data!=img)getElementById(id).data=img;}
function setText(id,str){getElementById(id).firstChild.data=String(str);}
function padding(format,str){return format.substring(0,format.length-String(str).length)+str;}
function setPos(id,l,t,w,h){
	var elSt=getElementById(id).normalStyle;
	elSt.left=l+"px";
	elSt.top=t+"px";
	elSt.width=w+"px";
	elSt.height=h+"px";
}
// 日付が現在より前ならTrue 後ならFALSEを返す
function dateCheck(arr){
	var day = new Date();
	if(arr==null) return false;
	if(arr[0] < Number(day.getFullYear()) ) return true;
	else if(arr[0] > Number(day.getFullYear()) ) return false;
	if(arr[1] < Number(day.getMonth()+1) ) return true;
	else if(arr[1] > Number(day.getMonth()+1) ) return false;
	if(arr[2] < Number(day.getDate()) ) return true;
	else if(arr[2] > Number(day.getDate()) ) return false;
	if(arr[3] < Number(day.getHours()) ) return true;
	else if(arr[3] > Number(day.getHours()) ) return false;
	if(arr[4] < Number(day.getMinutes()) ) return true;
	else if(arr[4] > Number(day.getMinutes()) ) return false;
	if(arr[5] < Number(day.getSeconds()) ) return true;
	else if(arr[5] > Number(day.getSeconds()) ) return false;
	return false;
}
function setTxtCol(id,fc,gsc){
	var elmSt=getElementById(id).normalStyle;
	if(elmSt.grayscaleColorIndex==String(gsc))return;
	elmSt.colorIndex=String(fc);
	elmSt.grayscaleColorIndex=String(gsc);
}
function romSound(id){
	browser.playRomSound("romsound://"+id);
}
function playSound(id){
	if(gPlaySound) romSound(id);
	gPlaySound=true;
}
function setStream(id,st){getElementById(id).streamStatus=st;}
function setFcs(id){
	if(gFOff)gFKey=id;
	else getElementById(id).focus();
}
function lockScreen(){browser.lockScreen();}
function unlockScreen(){browser.unlockScreen();}
function subDate(arr,date,num){
	var day=createDate(arr);
	if(!day)return NaN;
	return browser.subDate(day,date,num);
}
function createDate(arr){
	if(arr==null||arr.length!=6) return null;
	if(arr[0]>2100) return null;
	else if(arr[0]==2100&&arr[1]>2) return null;
	else if(arr[0]==2100&&arr[1]==2&&arr[2]>27) return null;
	return (new Date(arr[0],(arr[1]-1),arr[2],arr[3],arr[4],arr[5]));
}
// 文字列「…」補完処理
//   引数  txt : 対象文字列
//         len : 表示可能バイト数
//   返値  補完テキスト
function convOverText(txt,len){
	var c=0,bt=0,lim=0,ngF=false;
	for(var i=0;i<txt.length;i++){
		c=txt.charCodeAt(i);
		bt+=(c<256?1:2);
		if(len<bt){
			ngF=true;
			break;
		}
		if(bt<=len-2)lim=i+1;
	}
	if(ngF)return txt.substring(0,lim)+"…";
	return txt;
}
// epgTune処理
function epgTuneProc(serId){
	var nId=parseInt(ORG_NETWORK_ID,10);
	serId=parseInt(serId,10);
	if(!isNaN(nId)&&!isNaN(serId)){
		nId=padding("0000",nId.toString());
		serId=padding("0000",serId.toString(16));
		browser.epgTune("arib://"+nId+"."+serId+"."+serId);
	}
}
// キー連打回避処理
var gFKey="",gFOff=false,gFTmId=NaN;
function keyOff(){
	if(!isNaN(gFTmId)){
		browser.clearTimer(gFTmId);
		gFTmId=NaN;
	}
	gFKey="";
	if(document.currentFocus)gFKey=document.currentFocus.id;
	lockScreen();
	showElem("loading2");
	setFcs("default");
	unlockScreen();
	gFOff=true;
	gFTmId=browser.setInterval("keyOn();",1000,1);
}
function keyOn(){
	gFOff=false;
	if(!isNaN(gFTmId)){
		browser.clearTimer(gFTmId);
		gFTmId=NaN;
	}
	lockScreen();
	setFcs(gFKey);
	hideElem("loading2");
	unlockScreen();
	gFKey="";
}
function dummyFocus(){}
// トップ画面遷移
function launchTop(){
	gState.launchDocument("startup.bml");
//	gState.launchDocument("reversi-w1.bml");
//	gState.launchDocument("HttpPostTest.bml");
}

//backbutton
function backButton(){
	if(gFOff)return;	
	romSound(7);
	launchTop();
}	

// dボタン
function dataButtonPressed(){
	if(gFOff)return;
	romSound(7);
	launchTop();
}
// 時計
function clockStart(){
	getElementById("clock").normalStyle.top = "34px";
	if( !isNaN( gState.clockTimerID ) )browser.clearTimer( gState.clockTimerID );
	clockLoop();
}
function clockStop(){
	getElementById("clock").normalStyle.top = "-540px";
	if( !isNaN( gState.clockTimerID ) )browser.clearTimer( gState.clockTimerID );
	gState.clockTimerID = NaN;
}
function clockLoop(){
	gState.clockTimerID = NaN;
	var now = new Date();
	var text = "";
	var day = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
	var month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	
	lockScreen();
		if(now != null){
			text = day[now.getDay()]+" "+month[now.getMonth()]+" "+padding("  ",now.getDate())+" "+padding("00",now.getHours())+":"+padding("00",now.getMinutes()) ;
			setText("clock",text);
		}
		else{
			getElementById("clock").normalStyle.top = "-540px";
		}
	unlockScreen();

	gState.clockTimerID = browser.setInterval( "clockLoop();",1000,1);
}

// 現時刻がstart から end までに含まれているかチェックする
function interimCheck(start,end){
	if(!dateCheck(start)||dateCheck(end))return false;
	return true;
}
/*************************  パレンタル関連関数  *******************************/
// 受信機設定の視聴制限年齢取得処理
//   制限年齢が取得不可 : 常に 4
//   制限解除状態       : 常に 20
//   上記以外           : SecretMode OFF : DTV設定年齢(4〜20)
//                        SecretMode ON  : 19 (DTV設定年齢が19以下) / 20 (DTV設定年齢が20)
function getParental(){
	var arr=browser.readPersistentArray("nvram://receiverinfo/parentallevel","U:7b,B:1b");
	if(arr==null)gState.age=19;
	else{
		var age=parseInt(arr[0],10);
		if(arr[1]==0){
			gState.age=20;
			return;
		}
		if(age<4||age>20)age=19;
		if(gState.secret)gState.age=(age<20?19:20);
		else gState.age=age;
	}
}
/*************************  IPTV関連関数  *******************************/
// TVの視聴ライセンスから視聴可能かのチェックを行う
function hasTvViewLicense(licenseId,tierbit){
	if(licenseId==null) return false;
	// 受信機のテラビット取得
	var arr=browser.getIPTVLicenseInfo(licenseId.toUpperCase(),1);
	if(arr!=null&&arr[0]==1){
		var stbbit = padding("0000000000000000",String(arr[3]));
		var stbbitArr=new Array(stbbit.substring(0,4),stbbit.substring(4,8),stbbit.substring(8,12),stbbit.substring(12,16));

		var tvbit = padding("0000000000000000",tierbit);
		var tvbitArr=new Array(tvbit.substring(0,4),tvbit.substring(4,8),tvbit.substring(8,12),tvbit.substring(12,16));

		var retbit,tvbit;
		var bit=0;
		for(var i=0;i<4;i++){
			retbit=parseInt(stbbitArr[i],16);
			tvbit=parseInt(tvbitArr[i],16);
			bit+=retbit&tvbit;
		}
		if(bit) return true;
	}
	return false;
}
// DRMID取得
function getDRMID(str){
	var drmId=browser.getDRMID(str);
	if(drmId==null||String(drmId)=="NaN")return drmId;
	drmId=drmId.toLowerCase();
	if(drmId.indexOf("0x")==0)drmId=drmId.substring(2);
	return drmId;
}


gState.load();
