Cordova AdDuplex plugin
====================

# Overview #
Show adduplex exchange banner ad

[windows8] [wp8] [crodova cli] [phonegap build service]

Requires adduplex account https://www.adduplex.com/

This is open source cordova plugin.

You can see Cordova Plugins in one page: http://cranberrygame.github.io?referrer=github

# Change log #
```c
	
To-Do:
```
# Install plugin #

## Cordova cli ##
https://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-Line%20Interface - npm install -g cordova@6.0.0
```c
cordova plugin add cordova-plugin-ad-adduplex
(when build error, use github url: cordova plugin add cordova plugin add https://github.com/cranberrygame/cordova-plugin-ad-adduplex)
```

## Xdk ##
https://software.intel.com/en-us/intel-xdk - Download XDK - XDK PORJECTS - [specific project] - CORDOVA HYBRID MOBILE APP SETTINGS - Plugin Management - Add Plugins to this Project - Third Party Plugins -
```c
Plugin Source: Cordova plugin registry
Plugin ID: cordova-plugin-ad-adduplex
```

## Cocoon ##
https://cocoon.io - Create project - [specific project] - Setting - Plugins - Custom - Git Url: https://github.com/cranberrygame/cordova-plugin-ad-adduplex.git - INSTALL - Save

## Phonegap build service (config.xml) ##
https://build.phonegap.com/ - Apps - [specific project] - Update code - Zip file including config.xml
```c
<gap:plugin name="cordova-plugin-ad-adduplex" source="npm" />
```

## Construct2 ##
Download construct2 plugin<br>
https://dl.dropboxusercontent.com/u/186681453/pluginsforcordova/index.html<br>
How to install c2 native plugins in xdk, cocoon and cordova cli<br>
https://plus.google.com/102658703990850475314/posts/XS5jjEApJYV

# Server setting #
```c
```
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit1.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit2.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit3.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit4.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit5.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit6.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit7.png"><br>
<img src="https://raw.githubusercontent.com/cranberrygame/cordova-plugin-ad-admob/master/doc/ad_unit8.png"><br>

# API #
```javascript
var appKey = "REPLACE_THIS_WITH_YOUR_APP_KEY";
var adUnitId = "REPLACE_THIS_WITH_YOUR_AD_UNIT_ID";
var isOverlap = true; //true: overlap, false: split
var isTest = true;
/*
var appKey;
var adUnitId;
var isOverlap = true; //true: overlap, false: split
var isTest = true;
//wp8
if( navigator.userAgent.match(/Windows Phone/i) ) {
	appKey = "REPLACE_THIS_WITH_YOUR_APP_KEY";
	adUnitId = "REPLACE_THIS_WITH_YOUR_AD_UNIT_ID";
}
*/

document.addEventListener("deviceready", function(){
	//if no license key, 2% ad traffic share for dev support.
	//you can get paid license key: https://cranberrygame.github.io/request_cordova_ad_plugin_paid_license_key
	//window.adduplex.setLicenseKey("yourEmailId@yourEmaildDamin.com", "yourLicenseKey");

	window.adduplex.setUp(appKey, adUnitId, isOverlap, isTest);

	//
	window.adduplex.onBannerAdPreloaded = function() {
		alert('onBannerAdPreloaded');
	};
	window.adduplex.onBannerAdLoaded = function() {
		alert('onBannerAdLoaded');
	};
	window.adduplex.onBannerAdShown = function() {
		alert('onBannerAdShown');
	};
	window.adduplex.onBannerAdHidden = function() {
		alert('onBannerAdHidden');
	};
}, false);

window.adduplex.preloadBannerAd();//option, download ad previously for fast show
/*
position: 'top-left', 'top-center', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom-center', 'bottom-right'
size: 	'BANNER' (320x50, Phones and Tablets)
		'LARGE_BANNER' (320x100, Phones and Tablets)
		'MEDIUM_RECTANGLE' (300x250, Phones and Tablets)
		'FULL_BANNER' (468x60, Tablets)
		'LEADERBOARD' (728x90, Tablets)
		'SKYSCRAPER' (120x600, Tablets, ipad only)
		'SMART_BANNER' (Auto size, Phones and Tablets, recommended)
*/
window.adduplex.showBannerAd('top-center', 'SMART_BANNER');
window.adduplex.showBannerAd('bottom-center', 'SMART_BANNER');
window.adduplex.reloadBannerAd();
window.adduplex.hideBannerAd();

alert(window.adduplex.loadedBannerAd());//boolean: true or false

alert(window.adduplex.isShowingBannerAd());//boolean: true or false
```
# Examples #
<a href="https://github.com/cranberrygame/cordova-plugin-ad-adduplex/blob/master/example/basic/index.html">example/basic/index.html</a><br>
<a href="https://github.com/cranberrygame/cordova-plugin-ad-adduplex/blob/master/example/advanced/index.html">example/advanced/index.html</a>

# Test #

[![](http://img.youtube.com/vi/xXrVb8E8gMM/0.jpg)](https://www.youtube.com/watch?v=xXrVb8E8gMM&feature=youtu.be "Youtube")

You can also run following test xap.
https://dl.dropboxusercontent.com/u/186681453/pluginsforcordova/adduplex/xap.html

# Useful links #

Cordova Plugins<br>
http://cranberrygame.github.io?referrer=github

# Credits #
