<?xml version="1.0" encoding="EUC-JP" ?>
<!DOCTYPE bml PUBLIC
  "-//IPTVF CDN:2008//DTD BML Document for IPTV//JA"
  "http://www.iptvforum.jp/CDN/DTD/bml_100_0_iptv.dtd">
<?bml bml-version="100.0" ?>

<bml>
<head>
<title>VOD Main Page</title>

<style><![CDATA[
	body{
		clut:url(img/default.clt);
		background-color-index:0;
	}

div:focus	{background-color-index:7;}
div:blur	{background-color-index:0;}

.inner {
top:64px;
left:152px;
width:830px;
height:500px;
background-color-index:8;
}

.v1g {
width:124px;
height:124px;
background-color-index:8;
}

.v2g {
width:252px;
height:124px;
background-color-index:8;
}

.img {
width:120px;
height:120px;
left:2px;top:2px;
}

.img2 {
width:246px;
height:120px;
left:2px;top:2px;
}


]]></style>

	<script ><![CDATA[

  function key_Press(){

    var e = document.currentEvent;
       var key =e.keyCode;
    //action to be taken with the key
    movIMG(key);
  }
	
function launch(){

    var e = document.currentEvent;
    var name = e.target.id;

if(name==1){
     browser.launchDocument("lime/menu_ho.bml", "cut");
  }else if(name==2){
     browser.launchDocument("lime/dnp/mainmenu.bml", "cut");
}else if(name==3){
     browser.launchDocument("lime/info.bml", "cut");
}else if(name==14){
     browser.launchDocument("lime/info.bml", "cut");
}else {browser.launchDocument("lime/info.bml", "cut");}

}

	]]></script>
</head>
<body>

<div style="left:0px; top:20px; width:960px; height:540px">
<!--<object type="image/jpeg" data="img/title.jpg" style="left:230px;top:0px;width:512px;height:39px;"/>
<object type="image/jpeg" data="img/title.jpg" style="left:230px;top:0px;width:512px;height:39px;"/>-->
<object type="image/X-arib-png" data="img/title11.png" style="left:152px;top:0px;width:656px;height:50px;"/>


<div class='inner'>

<!-- ====================================  first row ================================ -->

<div id="1" class='v2g' style="left:0px;top:0px;nav-index:0;nav-right:1;nav-left:2;nav-up:7;nav-down:3" onclick="launch();">
<object  class='img2' type="image/X-arib-png" data="img/m_ho.png" style=""/>
</div>

<div  id="2" class='v2g' style="left:264px;top:0px;nav-index:1;nav-right:2;nav-left:0;nav-up:9;nav-down:4" onclick="launch();">
<object class="img2" type="image/X-arib-png" data="img/m_yo.png" style=""/>
</div>

<div  id="3" class='v1g' style="left:536px;top:0px;nav-index:2;nav-right:0;nav-left:1;nav-up:11;nav-down:6" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_va.png" style=""/>
</div>

<!-- ====================================  second row ================================ -->


<div class='v1g' style="left:0px;top:136px;nav-index:3;nav-right:4;nav-left:6;nav-up:0;nav-down:7" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_id.png" style=""/>
</div>

<div class='v2g' style="left:136px;top:136px;nav-index:4;nav-right:5;nav-left:3;nav-up:1;nav-down:8" onclick="launch();">
<object  class='img2' type="image/X-arib-png" data="img/m_ad.png" style=""/>
</div>

<div class='v1g'  style="left:402px;top:136px;nav-index:5;nav-right:6;nav-left:4;nav-up:1;nav-down:10" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_an.png" style=""/>
</div>

<div class='v1g'  style="left:536px;top:136px;nav-index:6;nav-right:3;nav-left:5;nav-up:2;nav-down:11" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_ca.png" style=""/>
</div>

<!-- ====================================  Last row ================================ -->

<div class='v1g'  style="left:0px;top:270px;nav-index:7;nav-right:8;nav-left:11;nav-up:3;nav-down:0" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_h1.png" style=""/>
</div>

<div class='v1g'  style="left:134px;top:270px;nav-index:8;nav-right:9;nav-left:7;nav-up:4;nav-down:0" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_h2.png" style=""/>
</div>

<div class='v1g'  style="left:268px;top:270px;nav-index:9;nav-right:10;nav-left:8;nav-up:4;nav-down:1" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_h3.png" style=""/>
</div>

<div id="14" class='v1g'  style="left:402px;top:270px;nav-index:10;nav-right:11;nav-left:9;nav-up:5;nav-down:1" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_nw.png" style=""/>
</div>

<div class='v1g'  style="left:536px;top:270px;nav-index:11;nav-right:7;nav-left:10;nav-up:6;nav-down:2" onclick="launch();">
<object  class='img' type="image/X-arib-png" data="img/m_hp.png" style=""/>
</div>

</div>


</div>
</body>
</bml>