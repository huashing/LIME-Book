//=============================================== javascript Library last update: 05/11/2009//making by www.dtop.jp//=============================================================================== 基本の設定//ブラウザ判別グローバル変数格納var _MSIE = (navigator.userAgent.indexOf('MSIE') != -1);		//Windows IE（対応ブラウザはIE6以上）var _Gecko = (navigator.userAgent.indexOf('Gecko') != -1);		//Firefoxvar _Safari = (navigator.userAgent.indexOf('Safari') != -1);	//Safari//eventに関する関数---------------------------------------------------------------//イベントオブジェクトvar evt;//マウスのX座標//引き数：//戻り値：マウスのX座標function mouseX(){	var x;		if(_MSIE){		x = evt.clientX;	}	else{		x = evt.pageX;	}	return x;}//マウスのY座標//引き数：//戻り値：マウスのY座標function mouseY(){	var y;		if(_MSIE){		y = evt.clientY;	}	else{		y = evt.pageY;	}	return y;}//windowに関する関数---------------------------------------------------------------//windowの横幅//引き数：//戻り値：windowの横幅function windowWidth(){	if(_MSIE){		return document.documentElement.clientWidth;	}	else{		return window.innerWidth;	}}//windowの縦幅//引き数：//戻り値：windowの縦幅function windowHeight(){	if(_MSIE){		return document.documentElement.clientHeight;	}	else{		return window.innerHeight;	}}//windowの横中心位置を求める//引き数：//戻り値：X座標function windowCenterX(){	var wW = windowWidth();	var sx;		if(_MSIE){		sx = document.documentElement.scrollLeft;	}	else{		sx = window.pageXOffset;	}return wW/2+sx;}//windowの縦中心位置を求める//引き数：//戻り値：Y座標function windowCenterY(){	var wH = windowHeight();	var sy;		if(_MSIE){		sy = document.documentElement.scrollTop;	}	else{		sy = window.pageYOffset;	}return wH/2+sy;}//ブラウザのイベントをキャンセルする//引き数：//戻り値：function cancelWindow(e){	if(_MSIE){		e.returnValue = false;	}	else{		e.preventDefault();	}}//==================================================== コンストラクタの設定とprototypeの設定//Effectオブジェクトとコンストラクタ//引き数：emID:エレメントid　endtime:かかる時間　k:変化の書類function Effect(emID,et,k){	this.element = document.getElementById(emID);	//エレメント名	this.endtime = et;								//かかる時間	this.kind = k;									//変化の種類	this.starttime = 0;								//初期の時間}//prototypeプロパティの設定-------------------------------------------------//フレームレートのプロパティEffect.prototype.fps = 1000/30;//エレメントX,Y位置取得し、x,yのプロパティを作成//引き数：//戻り値：prototypeプロパティ作成（x,y）格納Effect.prototype.elementXY_Init = function(){	this.x = this.element.offsetLeft;	this.y = this.element.offsetTop;}//エレメント表示する中心座標、centerX,centerYプロパティを作成//引き数：//戻り値：prototypeプロパティ作成（centerX,centerY）格納Effect.prototype.elementCenter_Init = function(x,y){	this.centerX = x;	this.centerY = y;}//エレメント横幅・縦幅取得し、w,hのプロパティを作成//引き数：//戻り値：prototypeプロパティ作成（w,h）格納Effect.prototype.zoom_Init = function(){	this.w = this.element.clientWidth;	this.h = this.element.clientHeight;}//エレメント現在の横幅・縦幅取得し、w,hのプロパティを作成//引き数：//戻り値：prototypeプロパティ作成（w,h）格納Effect.prototype.nowWH_Init = function(){	this.nowW = this.element.clientWidth;	this.nowH = this.element.clientHeight;}//エレメント.opacity取得し、alpのプロパティを作成//引き数：//戻り値：prototypeプロパティ作成（alp）格納(0-100%)Effect.prototype.alpha_Init = function(){	if(_MSIE){		this.alp = parseInt( (this.element.currentStyle.filter).match(/\d+/) );	}	else{		this.alp = parseFloat(document.defaultView.getComputedStyle(this.element, null).getPropertyValue('opacity'))*100;	}}//prototypeメソッドの設定-------------------------------------------------//エレメント位置変更//引き数：x:X座標　y:Y座標//戻り値：Effect.prototype.elementXY_Set = function(x,y){	this.element.style.left = x+"px";	this.element.style.top  = y+"px";}//エレメントの中心位置から実際の位置、x,y（エレメント左上）を求める//引き数：//戻り値：prototypeプロパティ作成（x,y）格納Effect.prototype.center_Set = function(){	this.x = this.centerX-this.nowW/2;	this.y = this.centerY-this.nowH/2;}//エレメントの透過//引き数：alp:透過率(0-100%)//戻り値：Effect.prototype.alpha_Set = function(alp){	if(_MSIE){		this.element.style.filter = 'alpha(opacity='+alp+')';	}	else{		this.element.style.opacity = alp/100;	}}//エレメント拡大縮小関数（等倍）//引き数：z:拡大率(0-100%)//戻り値：Effect.prototype.zoom_Set = function(z){	this.element.style.width = (this.w*z/100) + 'px';	this.element.style.height = (this.h*z/100) + 'px';}//エレメント表示／非表示関数//引き数：v:非表示/表示(0/1)//戻り値：Effect.prototype.visible_Set = function(v){	if(v == 0) this.element.style.visibility = "hidden";	else this.element.style.visibility = "visible";}//prototypeメソッドにおける動作バリエーション設定----------------------------------//バリエーションのセレクタ//引き数：v 最終的な値との差　f かかるframe　sv 最初の値　nowf 今のframe//k 変化バリエーション//up:徐々に減速//down:徐々に加速//same:等速//updawn:徐々に加速し減速//戻り値：求められる現在のvEffect.prototype.CHANGE = function(k,v,f,sv,nowf){	switch(k){		case 'up':			return this.UP(v,f,sv,nowf);			break;		case 'down':			return this.DOWN(v,f,sv,nowf);			break;		case 'same':			return this.SAME(v,f,sv,nowf);			break;		case 'updown':			return this.UPDOWN(v,f,sv,nowf);			break;	}}//徐々に減速//引き数：v:最終的な値との差　f:かかるframe　sv:最初の値　nowf:今のframe//戻り値：求められる現在のvEffect.prototype.UP = function(v,f,sv,nowf){	return sv+( v/Math.sqrt(f)*Math.sqrt(nowf) );}//徐々に加速//引き数：v:最終的な値との差　f:かかるframe　sv:最初の値　nowf:今のframe//戻り値：求められる現在のvEffect.prototype.DOWN = function(v,f,sv,nowf){	return sv+( v/(f*f)*(nowf*nowf) );}//等速//引き数：v:最終的な値との差　f:かかるframe　sv:最初の値　nowf:今のframe//戻り値：求められる現在のvEffect.prototype.SAME = function(v,f,sv,nowf){	return sv+( v/f*nowf );}//徐々に加速し減速//引き数：v:最終的な値との差　f:かかるframe　sv:最初の値　nowf:今のframe//戻り値：求められる現在のvEffect.prototype.UPDOWN = function(v,f,sv,nowf){	var v1 = Math.floor(v/2);	var v2 = v-v1;	var fr1 = Math.floor(f/2);	var fr2 = f-fr1;		if(fr1 >= nowf){		return sv+( v1/(fr1*fr1)*(nowf*nowf) );	}	else{		if(v != 0) sv = sv+v1;			return sv+( v2/Math.sqrt(fr2)*Math.sqrt(nowf-fr1) );	}}//メインとなるprototypeメソッド======================================================//ループ本体Effect.prototype.LOOP = function(){	this.starttime++;	this.MAIN();	//追加変更可能（エフェクトに応じて変更する）	if(this.starttime >= this.endtime){		clearInterval(this.settimer);		if(this.endevent) this.END();	//終了後実行されるイベント（エフェクトに応じて変更する）	}}//メイン実行（これを宣言するとループ開始）Effect.prototype.START = function(){	var myObj = this;	this.settimer = setInterval(function(){myObj.LOOP()},myObj.fps);}//====================================================================== エフェクト関数の設定//透明度の変更//引き数：emID:エレメント名　alp:変更後のアルファ(0-100)　t:かかる時間　k:変化の種類//endev:動作終了後に呼び出されるオブジェクト（要next_Event()メソッド）function alpha(emID,alp,t,k,endev){	var obj = new Effect(emID,t,k);	//現在の透明度取得とプロパティ作成	obj.alpha_Init();	obj.endevent = endev;		//Effectコンストラクタにプロパティの追加	obj.ealp = alp;		//メインメソッド	obj.MAIN = function(){		var ALP = this.CHANGE(this.kind,(this.ealp-this.alp),this.endtime,this.alp,this.starttime);		this.alpha_Set(ALP);	}	//終了後の呼び出しメソッド	obj.END = function(){		endev.next_Event();	}		//動作開始	obj.START();}//拡大縮小//引き数：emID:エレメント名　z:変更後の拡大率(0-100)　t:かかる時間　k:変化の種類//x,y:拡大する中心点//endev:動作終了後に呼び出されるオブジェクト（要next_Event()メソッド）function zoom(emID,z,t,k,x,y,endev){	var obj = new Effect(emID,t,k);	//現在の大きさ取得とプロパティ作成	obj.elementXY_Init();	obj.zoom_Init();	obj.elementCenter_Init(x,y);	obj.endevent = endev;	//Effectコンストラクタにプロパティの追加	obj.zoom = z;		//メインメソッド	obj.MAIN = function(){		var ZOOM = this.CHANGE(this.kind,(this.zoom-100),this.endtime,100,this.starttime);		this.zoom_Set(ZOOM);		this.nowWH_Init();		this.center_Set(this.centerX,this.centerY);				//ウィンドウ表示位置を超えてしまった場合０にする		if(this.x<0) this.x = 0;		if(this.y<0) this.y = 0;				this.elementXY_Set(this.x, this.y);	}	//終了後の呼び出しメソッド	obj.END = function(){		endev.next_Event();	}	//動作開始	obj.START();}