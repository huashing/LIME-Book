<?xml version="1.0" encoding="EUC-JP" ?>
<?bml bml-version="100.0" ?>

<bml>
<head>
<title>Caption Test</title>

<?php
	$ip = getenv('REMOTE_ADDR');

	if( preg_match( "/[0-1a-fA-f]*:[0-1a-fA-f]*/", $ip ) )
	{
		$proto = "rtp_tts";
	}
	else
	{
		$proto = "http_tts";
	}
?>

<style><![CDATA[
	
	.button {width:140px;height:32px;}
	p:focus {background-color-index:82;}
	p.button {text-align:center;color-index:0;line-height:30px;}
	#display	{color-index:3;text-align:left;padding-top:5px;padding-left:5px;padding-right:5px;padding-bottom:5px;font-size:24px;
	top:30px;height:26px;width:700px;}
]]></style>


<script><![CDATA[

var adj_delay = 5000;

var cnt = 0;
var CounterID = NaN;
var tArr = Array();
var lNum= Number();
var fSize;
var vHost = '175.41.244.154';
//var pHost = '175.41.243.162'; /* ASTEM Talk �̂h�o�A�h���X�ł��B */
//var pHost = '[2001:e38:0:502::100]:9010'; /* ASTEM Talk �̂h�o�A�h���X�ł��B */
var pHost = 'lime.jgn-x.jp:9010'; /* ASTEM Talk �̂h�o�A�h���X�ł��B */
//var pHost = '202.180.38.226:9010'; /* ASTEM Talk �̂h�o�A�h���X�ł��B */

var obj = document.getElementById("display");
           
var url4 = "http://"+ pHost +"/eucconvert2.php";


function alert(str)
{
	obj.firstChild.data = str+"\r\n" ;
}


function startCounter()
{
	browser.sleep(adj_delay);

	if(!isNaN(CounterID))
	{
		browser.clearTimer(CounterID);
	}
	else
	{	
		CounterID = browser.setInterval("changeText();", 2000, 0);
	}
}

function changeText()
{ 

	fSize=parseInt(obj.normalStyle.fontSize);

	var ret = browser.transmitTextDataOverIP(url4,"id=ZT1_LIME_TEST_EN&startTime="+ 2000*cnt + "&timeSpan=2000","EUC-JP");

	var msg =ret[2];
	var txt = ret[2];
		
	tArr= txt.split('\n');
	tPos = txt.indexOf('\n');
	tTailLen= txt.length - tPos;
	lNum = tArr.length;
	
	
	if(tPos >0)
	{
		if(tTailLen>tPos)
		{
			tLen=tTailLen * fSize;
		}
		else
		{
			tLen=tPos *fSize;
		}
	}
	else
	{
		tLen=0;
	}

	
	if( ret[0] == 1 )
	{
		if (tPos <= 0)
		{
			obj.normalStyle.backgroundColorIndex = 8;
		}
		else if (lNum <3)
		{
			obj.normalStyle.backgroundColorIndex = 80;
			obj.normalStyle.width= (tLen +10)/2;
			obj.normalStyle.left = (960 - tLen)/2;    
			obj.normalStyle.height=fSize+10;
		}
		else
		{  
			obj.normalStyle.backgroundColorIndex = 80;
			obj.normalStyle.width= (tLen +10)/2;
			obj.normalStyle.left = (960- tLen/2)/2; 
			obj.normalStyle.height=fSize*2+10;
		}
       
		alert(""+ msg);
	}
	else
	{
		alert("Transmission failed"+cnt+" E:"+ret[0]);
	}
	cnt++;
}

function handler()
{
	var evt = document.currentEvent;
	var kcode =evt.keyCode;
	
	if (kcode == 19){goback();}
	else if (keycode == 22){}
	else if (keycode == 23){obj.normalStyle.fontSize=30;}
	else if (keycode == 24){obj.normalStyle.fontSize=36;}
}

//function goback(){ browser.launchDocument("../startup.xml", "cut");	}
function goback(){ browser.launchDocument("./top.bml", "cut");	}
function chgSmall(){ obj.normalStyle.fontSize=24;}
function chgMedium(){obj.normalStyle.fontSize=30;}
function chgLarge(){ obj.normalStyle.fontSize=36;}


]]></script>

</head>
<body onload="startCounter();" style="background-color-index:7;">

<!---
==================================================================
���݁@hls.okimediaserver.com�@�𒼏������Ă���܂��B
�@lime.jgn-x.jp�@���ł̃A�h���X�Ƃt�q�k�ɕύX���肢�ł��܂��ł��傤���H
�@
�@�@JGN-X �N���E�h�T�[�o��IP����
        IPv4�F202.180.39.202
        IPv6�F2001:e38:0:502::100

==================================================================
-->
	<div style="top:0px;left:0px;width:960px;height:540px;visibility:visible;">
		<!-- object id="vod" type="application/X-arib-contentPlayControl" data="http://hls.okimediaserver.com/pcs/resolvecontent?contents_path=/moviebox/ntt-ev/h264-sd-tts/Docu-white-J_out.mp4&protocol=http_tts" streamstatus="play" style="top:0px;left:0px;width:960px;height:540px;" / -->
		<object id="vod" type="application/X-arib-contentPlayControl" data="http://lime.jgn-x.jp/pcs/resolvecontent?contents_path=/moviebox/snow2013/sd-tts/itu2013_800k.mp4&protocol=<?php echo $proto ?>" streamstatus="play" style="top:0px;left:0px;width:960px;height:540px;" />
	</div>


<p id="display" style="top:400px;left:130px;"><![CDATA[]]></p>

<p class="button" style="top:1px;left:1px;height:1px;width:1px;color-index:3;font-size:24pt;" accesskey="B" onclick="goback();"></p>

<p class="button" style="top:10px;left:10px;height:36px;width:64px;color-index:1;font-size:24pt;" accesskey="R" onclick="chgSmall();">S</p>

<p class="button" style="top:10px;left:74px;height:36px;width:64px;color-index:2;font-size:24pt;" accesskey="G"  onclick="chgMedium();">M</p>

<p class="button" style="top:10px;left:138px;height:36px;width:64px;color-index:3;font-size:24pt;" accesskey="Y" onclick="chgLarge();">L</p>

<p style="top:0px;left:0px;height:1px;width:1px;background-color-index:8;nav-index:0;" onkeydown="handler();" onkeyup="handler();" onclick="handler();"><![CDATA[]]></p>


</body>
</bml>
