﻿(function(n){"use strict";WinJS.Namespace.define("AdDuplexJs.Controls",{AdControl:WinJS.Class.define(function(n,t){this._element=n||document.createElement("div");this._element.winControl=this;this.networkManager=new AdDuplex.WinRT.Core.NetworkManager("8.0.5.1");this.networkManager.addEventListener("installationlogcompleted",this.onInstallationLogCompleted.bind(this));this.networkManager.addEventListener("adloaded",this.onNetworkManagerAdLoaded.bind(this));this.networkManager.addEventListener("adloadingerror",this.onNetworkManagerAdLoadingError.bind(this));this.networkManager.addEventListener("clicklogcompleted",this.onClickLoadCompleted.bind(this));this._resetConfig="false";this._isTest="false";this._adSize=this.validateAdSize("250x250");this._refreshInterval="60";this._appId="0";t&&(this.resetConfig=t.resetConfig||this._resetConfig,this.isTest=t.isTest||this._isTest,this.size=t.size||this._adSize.sizeString,this.refreshInterval=t.refreshInterval||this._refreshInterval,this.appId=t.appId||this._appId);this._asyncCommand=null;this._controlBaseZIndex=5;this.adBackgrounds=["#A200FF","#00ABA9","#8CBF26","#A05000","#F09609","#1BA1E2","#339933"];this.init();this.initializeAdFrame();this.changeAdSize();this.onLoaded()},{init:function(){this.swapFramesInterval=setInterval(this.swapFrames.bind(this),2500);this.currentAdInfo=this.getDefaultAd();this.actionManager=new AdDuplex.WinRT.Core.ActionManager},onLoaded:function(){Windows.ApplicationModel.DesignMode.designModeEnabled||(this.controlSettings=AdDuplex.WinRT.Core.SettingsManager.getSettings("8.0.4.1",this.resetConfig),this.networkManager.installationId=this.controlSettings.installationId.replace(/-/g,""),this.installationInfo=AdDuplex.WinRT.Core.SettingsManager.getInstallationInfo(this.appId,this.networkManager.installationId,"WINRTJS",this.networkManager.controlVersion),this.networkManager.installationInfo=this.installationInfo,this.controlSettings.isInstallationReported===null&&this.networkManager.reportInstallation(),clearInterval(this.loadingTimer),this.loadingTimer=setInterval(this.onLoadingTimerTick.bind(this),this.refreshInterval),clearInterval(this.loggingTimer),this.loggingTimer=setInterval(this.onLoggingTimerTick.bind(this),3e3),this.loadNewAd())},setup:function(){this.onLoaded()},dispose:function(){this.onUnloaded()},onUnloaded:function(){this.loadingTimer!==null&&(clearInterval(this.loadingTimer),this.loadingTimer=null);this.loggingTimer!==null&&(clearInterval(this.loggingTimer),this.loggingTimer=null)},resetConfig:{get:function(){return this._resetConfig},set:function(n){this._resetConfig=n==="true"||n===!0?!0:!1}},isTest:{get:function(){return this._isTest},set:function(n){this._isTest=n==="true"||n===!0?!0:!1;this.networkManager.isTest=this._isTest}},size:{get:function(){return this._adSize},set:function(n){this._adSize=this.validateAdSize(n);try{this.changeAdSize()}catch(t){}}},appId:{get:function(){return this._appId},set:function(n){this._appId=n}},refreshInterval:{get:function(){return this._refreshInterval},set:function(n){this._refreshInterval=this.validateRefreshInterval(n)}},element:{get:function(){return this._element}},changeAdSize:function(){this.outerAdFrame.style.setProperty("width",this.size.width,"important");this.outerAdFrame.style.setProperty("height",this.size.height,"important");this.line1.style.setProperty("font-size",this.size.fontSize,"important");this.line2.style.setProperty("font-size",this.size.fontSize,"important");this.line3.style.setProperty("font-size",this.size.fontSize,"important");this.line4.style.setProperty("font-size",this.size.fontSize,"important");this.div1.style.setProperty("bottom",this.size.gapSize,"important");this.div2.style.setProperty("top",this.size.gapSize,"important");this.resetAd()},isUsable:function(){var n=!1;return this.outerAdFrame.style.visibility!="hidden"&&this.outerAdFrame.style.height==this.size.height&&this.outerAdFrame.style.width==this.size.width&&this.outerAdFrame.style.opacity>.9&&(n=!0),n&&(n=this.isElementVisible(this.outerAdFrame)),n},isElementVisible:function(n){var e=window,t=document,u,f,o,r,s,i,h;if(!n||n&&n.nodeType!==1||!n.getClientRects||!t.elementFromPoint||!t.querySelector||!n.contains||n.offsetWidth===0||n.offsetHeight===0)return!1;for(u=e.innerHeight?e.innerHeight:t.documentElement.clientHeight,f=n.getClientRects(),o=function(n,i){var u=!0,f=(n.left+n.right)/2,e=(n.top+n.bottom)/2,r=t.elementFromPoint(f,e);return(u=u&&r===i||i.contains(r),u===!1)?!1:(f=n.left+10,e=n.top+10,r=t.elementFromPoint(f,e),u=u&&r===i||i.contains(r),u===!1)?!1:(f=n.right-10,e=n.top+10,r=t.elementFromPoint(f,e),u=u&&r===i||i.contains(r),u===!1)?!1:(f=n.left+10,e=n.bottom-10,r=t.elementFromPoint(f,e),u=u&&r===i||i.contains(r),u===!1)?!1:(f=n.right-10,e=n.bottom-10,r=t.elementFromPoint(f,e),u&&r===i||i.contains(r))},r=0,s=f.length;r<s;r++)if(i=f[r],h=i.top>0?i.top<=u:i.bottom>0&&i.bottom<=u,h&&o(i,n))return!0;return!1},validateAdSize:function(n){switch(n){case"300x250":return{width:"300px",height:"250px",halfHeight:"125px",sizeString:n,fontSize:"25.267px",gapSize:"0"};case"728x90":return{width:"728px",height:"90px",halfHeight:"45px",sizeString:n,fontSize:"25.267px",gapSize:"0"};case"500x130":return{width:"500px",height:"130px",halfHeight:"65px",sizeString:n,fontSize:"25.267px",gapSize:"0"};case"292x60":return{width:"292px",height:"60px",halfHeight:"30px",sizeString:n,fontSize:"14.6px",gapSize:"0"};case"250x125":return{width:"250px",height:"125px",halfHeight:"62.5px",sizeString:n,fontSize:"20px",gapSize:"0"};case"160x600":return{width:"160px",height:"600px",halfHeight:"300px",sizeString:n,fontSize:"20px",gapSize:"30px"};case"250x250":return{width:"250px",height:"250px",halfHeight:"125px",sizeString:n,fontSize:"25.267px",gapSize:"0"};default:return{width:"250px",height:"250px",halfHeight:"125px",sizeString:n,fontSize:"25.267px",gapSize:"0"}}},validateRefreshInterval:function(n){return n!==null&&(n*=1e3),n=n||2e4,n<2e4&&(n=2e4),n},validateApplicationView:function(n){switch(n){case 0:return"FullScreenLandscape";case 1:return"Filled";case 2:return"Snapped";case 3:return"FullScreenPortrait"}},fadeIn:function(t){return n.UI.executeTransition(t,{property:"opacity",delay:0,duration:500,timing:"linear",from:0,to:1})},fadeOut:function(t){return n.UI.executeTransition(t,{property:"opacity",delay:0,duration:500,timing:"linear",to:0})},properFadeOut:function(n){this.fadeOut(n)},properFadeIn:function(n){this.fadeIn(n)},swapFrames:function(){var n=this.firstTextAdFrame.style.opacity==="1";n?(this.properFadeOut(this.firstTextAdFrame),this.properFadeIn(this.secondTextAdFrame)):(this.properFadeOut(this.secondTextAdFrame),this.properFadeIn(this.firstTextAdFrame))},onClickLoadCompleted:function(){this.controlSettings.clickedAdId=null;try{AdDuplex.WinRT.Core.SettingsManager.saveSettings(this.controlSettings)}catch(n){}},onLoadingTimerTick:function(){var n=this.getDefaultAd();(this.currentAdInfo.line1===n.line1&&this.currentAdInfo.line2===n.line2||this.isElementVisible(this.outerAdFrame))&&this.loadNewAd()},onLoggingTimerTick:function(){this.isUsable()&&this.loggingTimer!=null&&(clearInterval(this.loggingTimer),this.loggingTimer=null,this.networkManager.logAdImpression(this.currentAdInfo))},displayTextAd:function(){this.line1!==null&&this.currentAdInfo!=null&&(this.line1.innerText=this.currentAdInfo.line1,this.line2.innerText=this.currentAdInfo.line2,this.line3.innerText=this.currentAdInfo.line3,this.line4.innerText=this.currentAdInfo.line4,this.imageAd.style.setProperty("visibility","hidden","important"),this.textAdFrame.style.setProperty("visibility","visible","important"))},resetAd:function(){this.currentAdInfo=this.getDefaultAd();this.displayTextAd();this.loadingTimer!=null&&(clearInterval(this.loadingTimer),this.loadingTimer=setInterval(this.onLoadingTimerTick.bind(this),this.refreshInterval),this.loadNewAd())},getDefaultAd:function(){var n=new AdDuplex.WinRT.Models.TextAdInfo;return n.adId=0,n.line1="AdDuplex - Ad Exchange",n.line2="http://AdDuplex.com",n.line3="Promote your Windows 8 app",n.line4="FREE!",n.url="http://www.adduplex.com/?utm_source=win8sdkjs&utm_medium=defaultad&utm_campaign=win8sdk",n.marketplaceAppId="",n.imageURL="",n.phoneNumber="",n.hash="",n.adType="",n.time=0,n.showLogo=!0,n},onInstallationLogCompleted:function(){this.controlSettings.isInstallationReported=!0;try{AdDuplex.WinRT.Core.SettingsManager.saveSettings(this.controlSettings)}catch(n){}},resetSwapTimer:function(){clearInterval(this.swapFramesInterval);this.swapFramesInterval=setInterval(this.swapFrames.bind(this),2500)},onNetworkManagerAdLoaded:function(n){if(n===null){this.onAdLoadingError("Something unexpected has occured");return}if(n.newAd===null){this.onAdLoadingError("Something unexpected has occured");return}this.resetSwapTimer();this.currentAdInfo=n.newAd;this.currentAdInfo.adType==="Text"?(this.switchBackgroundColor(),this.displayTextAd(),this.logAdImpression()):this.currentAdInfo.adType==="Image"&&this.displayImageAd(this.currentAdInfo.imageURL);this.switchLogo();this.onAdLoaded(this.currentAdInfo)},onAdLoaded:function(n){this.dispatchEvent("adLoaded",{newAd:n})},onAdClicked:function(n){this.dispatchEvent("adClicked",{clickedAd:n})},onAdLoadingError:function(n){this.dispatchEvent("adLoadingError",{loadingError:n})},switchLogo:function(){this.currentAdInfo.showLogo?this.logoImage.style.setProperty("visibility","visible","important"):this.logoImage.style.setProperty("visibility","hidden","important")},logAdImpression:function(){if(!Windows.ApplicationModel.DesignMode.designModeEnabled&&(this.loggingTimer=setInterval(this.onLoggingTimerTick.bind(this),3e3),!this.isUsable())){this.onAdLoadingError("Ad control is hidden by other control or invisible");if(this.isTest){var n=new Windows.UI.Popups.MessageDialog("Some element is covering AdDuplex ad control. Make sure the control is fully visible and is not hidden by other elements or animations.");try{this._asyncCommand!=null&&this._asyncCommand.cancel();this._asyncCommand=n.showAsync()}catch(t){}}}},commandInvokedHandler:function(){},switchBackgroundColor:function(){if(this.textAdFrame!=null){var n=this.adBackgrounds[Math.floor(Math.random()*this.adBackgrounds.length)];this.textAdFrame.style.setProperty("background-color",n,"important")}},onNetworkManagerAdLoadingError:function(n){this.onAdLoadingError(n)},displayImageAd:function(n){this.imageAd.addEventListener("load",this.onImageLoaded.bind(this));this.imageAd.src=n},onImageLoaded:function(){this.imageAd.style.setProperty("visibility","visible","important");this.textAdFrame.style.setProperty("visibility","hidden","important");this.logAdImpression()},loadNewAd:function(){Windows.ApplicationModel.DesignMode.designModeEnabled||(this.installationInfo.viewMode=this.validateApplicationView(Windows.UI.ViewManagement.ApplicationView.value),this.controlSettings.clickedAdId!=null&&this.networkManager.logPreviousClick(this.controlSettings.clickedAdId,this.controlSettings.viewMode,this.controlSettings.adSize),this.networkManager.loadNewAdsFromString("Banner"+this.size.sizeString))},createOuterAdFrame:function(){this.outerAdFrame=document.createElement("div");this.outerAdFrame=this.forceDefaultStyleParameters(this.outerAdFrame);this.outerAdFrame.style.setProperty("width",this.size.width,"important");this.outerAdFrame.style.setProperty("height",this.size.height,"important");this.outerAdFrame.style.setProperty("overflow","hidden","important");this.outerAdFrame.style.setProperty("opacity","1","important");this.outerAdFrame.style.setProperty("cursor","pointer","important");this.outerAdFrame.style.setProperty("z-index",this._controlBaseZIndex,"important");this.outerAdFrame.style.setProperty("position","absolute","important")},createAdLogo:function(){var t=document.createElement("div"),n;t=this.forceDefaultStyleParameters(t);t.style.setProperty("width","inherit","important");t.style.setProperty("height","inherit","important");t.style.setProperty("position","absolute","important");n=document.createElement("div");n=this.forceDefaultStyleParameters(n);n.style.setProperty("position","relative","important");n.style.setProperty("width","relative","important");n.style.setProperty("height","inherit","important");this.logoImageClickArea=document.createElement("div");this.logoImageClickArea=this.forceDefaultStyleParameters(this.logoImageClickArea);this.logoImageClickArea.style.setProperty("style-float","right","important");this.logoImageClickArea.style.setProperty("bottom","0","important");this.logoImageClickArea.style.setProperty("right","0","important");this.logoImageClickArea.style.setProperty("margin","2px","important");this.logoImageClickArea.style.setProperty("position","absolute","important");this.logoImageClickArea.style.setProperty("width","30px","important");this.logoImageClickArea.style.setProperty("height","25px","important");this.logoImageClickArea.addEventListener("click",this.displayAdduplexSite.bind(this));this.logoImageClickArea.style.setProperty("cursor","pointer","important");this.logoImage=document.createElement("img");this.logoImage=this.forceDefaultStyleParameters(this.logoImage);this.logoImage.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACTUAAAk1AYaqPFAAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAclJREFUOE/VkTlIw1AcxhWdHEQnQRB0UcEDxAM80bWCk4PipojiAeIsIqiLm4q4OXfRYqo91MYj1KMebUG0VqoW8WqsTdIkpkleYp7wIDU42cXhI/mS//fje++fpqoqlkr9Q6A7Ku32X3BBk5t97NOeIRY4SZK0jw4N3/t9fhzNSYpq7TvnguZH8VCfNwALHTTTe87dzgY+fdU4Q0IPFBWbnJgItDa30CzLbsK5YR8fKHLSNCMp3x7JAIwIig29h3ngSFuLqZ4PGZdl2dphaieHBgYfVp9Ed9Y6JR1r3/VZKAPwPaHYlu+E0xGtATx2ugZ0vkkH8F84HN6qqqgU8qbM4lxQ8P7MQiUBYZNcKyU07sdfx/z81VJIOMuwxBQEBABgsGV+9zjwUrJLn0VKAnZ5uLs2Iv6MPCUqm/qGs9MzV031DfEeIhIq3qIpXlY20CxSErDzhL2vwZkIXAL0g17+Bt4hBOIuF1FWUiqdejx7CaBay3eYaLdWQJ+HSgIS79JeNkYl8m00W2Cn4xCYaYkB8/XrUX1tHbc4v+BHs9eMvJ2jXc/KQ+JEzzAsJaotZeNFJC5peQf6509gF7VGP+d+kwH4V6UYqGJfA5fFbHyx7xkAAAAASUVORK5CYII=";this.logoImage.style.setProperty("style-float","right","important");this.logoImage.style.setProperty("bottom","0","important");this.logoImage.style.setProperty("right","0","important");this.logoImage.style.setProperty("margin","2px","important");this.logoImage.style.setProperty("position","absolute","important");this.logoImage.style.setProperty("width","16px","important");this.logoImage.style.setProperty("height","11px","important");this.logoImage.style.setProperty("cursor","pointer","important");this.logoImage.addEventListener("click",this.displayAdduplexSite.bind(this));t.appendChild(n);n.appendChild(this.logoImage);n.appendChild(this.logoImageClickArea);this.logoImage.style.setProperty("z-index",this._controlBaseZIndex+5,"important");this.logoImageClickArea.style.setProperty("z-index",this._controlBaseZIndex+5,"important");this.outerAdFrame.appendChild(t)},displayAdduplexSite:function(n){n.stopPropagation();this.actionManager.displayWebPageFromString("http://www.adduplex.com/?utm_source=win8sdkjs&utm_medium=logo&utm_campaign=win8sdk")},createImageAdFrame:function(){this.imageAd=document.createElement("image");this.imageAd=this.forceDefaultStyleParameters(this.imageAd);this.imageAd.style.setProperty("position","absolute","important");this.imageAd.style.setProperty("width","inherit","important");this.imageAd.style.setProperty("height","inherit","important");this.imageAd.style.setProperty("cursor","pointer","important");this.imageAd.style.setProperty("z-index",this._controlBaseZIndex+1,"important")},createTextAdFrame:function(){this.createFirstTextAdFrame();this.createSecondTextAdFrame();this.textAdFrame=document.createElement("div");this.textAdFrame=this.forceDefaultStyleParameters(this.textAdFrame);this.textAdFrame.style.setProperty("width","inherit","important");this.textAdFrame.style.setProperty("height","inherit","important");this.textAdFrame.style.setProperty("overflow","inherit","important");this.textAdFrame.style.setProperty("z-index",this._controlBaseZIndex+1,"important");this.textAdFrame.appendChild(this.firstTextAdFrame);this.textAdFrame.appendChild(this.secondTextAdFrame)},initializeAdFrame:function(){this.createOuterAdFrame();this.createTextAdFrame();this.createImageAdFrame();this.createAdLogo();this.imageAd.style.setProperty("visibility","hidden","important");this.textAdFrame.style.setProperty("visibility","visible","important");this.outerAdFrame.appendChild(this.imageAd);this.outerAdFrame.appendChild(this.textAdFrame);this.switchBackgroundColor();this._element.appendChild(this.outerAdFrame);this.outerAdFrame.addEventListener("click",this.onClickTargetTapped.bind(this))},createFirstTextAdFrame:function(){var u,f,i,r,n,t;this.firstTextAdFrame=document.createElement("table");this.firstTextAdFrame=this.forceDefaultStyleParameters(this.firstTextAdFrame);this.firstTextAdFrame.style.setProperty("height","inherit","important");this.firstTextAdFrame.style.setProperty("width","inherit","important");this.firstTextAdFrame.style.setProperty("position","absolute","important");this.firstTextAdFrame.style.opacity="1";this.firstTextAdFrame.style.setProperty("padding-bottom","13px","important");this.firstTextAdFrame.style.setProperty("padding-left","2px","important");this.firstTextAdFrame.style.setProperty("padding-top","3px","important");this.firstTextAdFrame.style.setProperty("padding-right","2px","important");this.firstTextAdFrame.style.setProperty("table-layout","fixed","important");this.firstTextAdFrame.style.setProperty("text-align","center","important");u=document.createElement("tr");u=this.forceDefaultStyleParameters(u);f=document.createElement("tr");f=this.forceDefaultStyleParameters(f);i=document.createElement("td");i=this.forceDefaultStyleParameters(i);i.style.setProperty("width","100%","important");i.style.setProperty("height","50%","important");r=document.createElement("td");r=this.forceDefaultStyleParameters(r);r.style.setProperty("width","100%","important");r.style.setProperty("height","50%","important");n=document.createElement("div");n=this.forceDefaultStyleParameters(n);n.style.setProperty("width","100%","important");n.style.setProperty("height","100%","important");n.style.setProperty("overflow","hidden","important");n.style.setProperty("position","relative","important");t=document.createElement("div");t=this.forceDefaultStyleParameters(t);t.style.setProperty("width","100%","important");t.style.setProperty("height","100%","important");t.style.setProperty("overflow","hidden","important");t.style.setProperty("position","relative","important");this.line1=document.createElement("div");this.line1=this.forceDefaultStyleParameters(this.line1);this.line1.style.setProperty("position","absolute","important");this.line1.style.setProperty("bottom","0","important");this.line1.style.setProperty("left","0","important");this.line1.style.setProperty("right","0","important");this.line1.style.setProperty("font-weight","bold","important");this.line1.style.setProperty("inner-text","AdDuplex","important");this.line1.style.setProperty("color","white","important");this.line1.style.setProperty("word-wrap","break-word","important");this.line1.style.setProperty("overflow","hidden","important");this.line1.style.setProperty("z-index",this._controlBaseZIndex,"important");this.line1.style.setProperty("font-family","Segoe UI");this.line2=document.createElement("div");this.line2=this.forceDefaultStyleParameters(this.line2);this.line2.style.setProperty("position","absolute","important");this.line2.style.setProperty("top","0","important");this.line2.style.setProperty("left","0","important");this.line2.style.setProperty("right","0","important");this.line2.style.setProperty("inner-text","cross-promotion network","important");this.line2.style.setProperty("color","white","important");this.line2.style.setProperty("word-wrap","break-word","important");this.line2.style.setProperty("overflow","hidden","important");this.line2.style.setProperty("z-index",this._controlBaseZIndex,"important");this.line2.style.setProperty("font-family","Segoe UI");n.appendChild(this.line1);t.appendChild(this.line2);i.appendChild(n);r.appendChild(t);u.appendChild(i);f.appendChild(r);this.firstTextAdFrame.appendChild(u);this.firstTextAdFrame.appendChild(f)},createSecondTextAdFrame:function(){var i,r,n,t;this.secondTextAdFrame=document.createElement("table");this.secondTextAdFrame=this.forceDefaultStyleParameters(this.secondTextAdFrame);this.secondTextAdFrame.style.setProperty("height","inherit","important");this.secondTextAdFrame.style.setProperty("width","inherit","important");this.secondTextAdFrame.style.setProperty("position","absolute","important");this.secondTextAdFrame.style.opacity="0";this.secondTextAdFrame.style.setProperty("padding-bottom","15px","important");this.secondTextAdFrame.style.setProperty("padding-left","2px","important");this.secondTextAdFrame.style.setProperty("padding-top","2px","important");this.secondTextAdFrame.style.setProperty("padding-right","2px","important");this.secondTextAdFrame.style.setProperty("table-layout","fixed","important");this.secondTextAdFrame.style.setProperty("text-align","center","important");i=document.createElement("tr");i=this.forceDefaultStyleParameters(i);r=document.createElement("tr");r=this.forceDefaultStyleParameters(r);n=document.createElement("td");n=this.forceDefaultStyleParameters(n);n.style.setProperty("width","100%","important");n.style.setProperty("height","50%","important");t=document.createElement("td");t=this.forceDefaultStyleParameters(t);t.style.setProperty("width","100%","important");t.style.setProperty("height","50%","important");this.div1=document.createElement("div");this.div1=this.forceDefaultStyleParameters(this.div1);this.div1.style.setProperty("width","100%","important");this.div1.style.setProperty("height","100%","important");this.div1.style.setProperty("overflow","hidden","important");this.div1.style.setProperty("position","relative","important");this.div2=document.createElement("div");this.div2=this.forceDefaultStyleParameters(this.div2);this.div2.style.setProperty("width","100%","important");this.div2.style.setProperty("height","100%","important");this.div2.style.setProperty("overflow","hidden","important");this.div2.style.setProperty("position","relative","important");this.line3=document.createElement("div");this.line3=this.forceDefaultStyleParameters(this.line3);this.line3.style.setProperty("position","absolute","important");this.line3.style.setProperty("bottom","0","important");this.line3.style.setProperty("left","0","important");this.line3.style.setProperty("right","0","important");this.line3.style.setProperty("inner-text","for Windows and Windows Phone","important");this.line3.style.setProperty("color","white","important");this.line3.style.setProperty("word-wrap","break-word","important");this.line3.style.setProperty("overflow","hidden","important");this.line3.style.setProperty("z-index",this._controlBaseZIndex,"important");this.line3.style.setProperty("font-family","Segoe UI");this.line4=document.createElement("div");this.line4=this.forceDefaultStyleParameters(this.line4);this.line4.style.setProperty("position","absolute","important");this.line4.style.setProperty("top","0","important");this.line4.style.setProperty("left","0","important");this.line4.style.setProperty("right","0","important");this.line4.style.setProperty("inner-text","Promote your app for FREE","important");this.line4.style.setProperty("color","white","important");this.line4.style.setProperty("word-wrap","break-word","important");this.line4.style.setProperty("overflow","hidden","important");this.line4.style.setProperty("z-index",this._controlBaseZIndex,"important");this.line4.style.setProperty("font-family","Segoe UI");this.div1.appendChild(this.line3);this.div2.appendChild(this.line4);n.appendChild(this.div1);t.appendChild(this.div2);i.appendChild(n);r.appendChild(t);this.secondTextAdFrame.appendChild(i);this.secondTextAdFrame.appendChild(r)},onClickTargetTapped:function(){this.handleAdClick()},isStringEmptyOrNull:function(n){return!n||0===n.length},handleAdClick:function(){if(this.currentAdInfo!=null){this.onAdClicked(this.currentAdInfo);try{this.isStringEmptyOrNull(this.currentAdInfo.marketplaceAppId)?this.isStringEmptyOrNull(this.currentAdInfo.url)||this.actionManager.displayWebPage(this.networkManager.getClickLogRequestUri(this.currentAdInfo.adId,this.validateApplicationView(Windows.UI.ViewManagement.ApplicationView.value),"Banner"+this.size.sizeString.toString())):(this.saveClickedAdId(),this.actionManager.displayStore(this.currentAdInfo.marketplaceAppId))}catch(n){}}},saveClickedAdId:function(){this.controlSettings.clickedAdId=this.currentAdInfo.adId;this.controlSettings.viewMode=this.validateApplicationView(Windows.UI.ViewManagement.ApplicationView.value);this.controlSettings.adSize="Banner"+this.size.sizeString.toString();try{AdDuplex.WinRT.Core.SettingsManager.saveSettings(this.controlSettings)}catch(n){}},forceDefaultStyleParameters:function(n){return n.style.setProperty("text-shadow","none","important"),n.style.setProperty("azimuth","center","important"),n.style.setProperty("background-attachment","scroll","important"),n.style.setProperty("background-color","transparent","important"),n.style.setProperty("background-image","none","important"),n.style.setProperty("background-position","0% 0%","important"),n.style.setProperty("background-repeat","repeat","important"),n.style.setProperty("border-collapse","separate","important"),n.style.setProperty("border-spacing","0","important"),n.style.setProperty("border-top-style","none","important"),n.style.setProperty("border-right-style","none","important"),n.style.setProperty("border-bottom-style","none","important"),n.style.setProperty("border-left-style","none","important"),n.style.setProperty("border-top-width","medium","important"),n.style.setProperty("border-right-width","medium","important"),n.style.setProperty("border-bottom-width","medium","important"),n.style.setProperty("border-left-width","medium","important"),n.style.setProperty("bottom","auto","important"),n.style.setProperty("caption-side","top","important"),n.style.setProperty("clear","none","important"),n.style.setProperty("clip","auto","important"),n.style.setProperty("content","normal","important"),n.style.setProperty("counter-increment","none","important"),n.style.setProperty("counter-reset","none","important"),n.style.setProperty("cue-after","none","important"),n.style.setProperty("cue-before","none","important"),n.style.setProperty("cursor","auto","important"),n.style.setProperty("direction","ltr","important"),n.style.setProperty("elevation","level","important"),n.style.setProperty("empty-cells","show","important"),n.style.setProperty("float","none","important"),n.style.setProperty("font-size","medium","important"),n.style.setProperty("font-style","normal","important"),n.style.setProperty("font-variant","normal","important"),n.style.setProperty("font-weight","normal","important"),n.style.setProperty("height","auto","important"),n.style.setProperty("left","auto","important"),n.style.setProperty("letter-spacing","normal","important"),n.style.setProperty("line-height","normal","important"),n.style.setProperty("list-style-image","none","important"),n.style.setProperty("list-style-position","outside","important"),n.style.setProperty("list-style-type","disc","important"),n.style.setProperty("margin-right","0","important"),n.style.setProperty("margin-left","0","important"),n.style.setProperty("margin-top","0","important"),n.style.setProperty("margin-bottom","0","important"),n.style.setProperty("max-height","none","important"),n.style.setProperty("max-width","none","important"),n.style.setProperty("min-height","0","important"),n.style.setProperty("min-width","0","important"),n.style.setProperty("orphans","2","important"),n.style.setProperty("outline-color","invert","important"),n.style.setProperty("outline-style","none","important"),n.style.setProperty("outline-width","medium","important"),n.style.setProperty("overflow","visible","important"),n.style.setProperty("padding-top","0","important"),n.style.setProperty("padding-right","0","important"),n.style.setProperty("padding-bottom","0","important"),n.style.setProperty("padding-left","0","important"),n.style.setProperty("page-break-after","auto","important"),n.style.setProperty("page-break-before","auto","important"),n.style.setProperty("page-break-inside","auto","important"),n.style.setProperty("pause-after","0","important"),n.style.setProperty("pause-before","0","important"),n.style.setProperty("pitch-range","50","important"),n.style.setProperty("pitch","medium","important"),n.style.setProperty("play-during","auto","important"),n.style.setProperty("position","static","important"),n.style.setProperty("richness","50","important"),n.style.setProperty("right","auto","important"),n.style.setProperty("speak-header","once","important"),n.style.setProperty("speak-numeral","continuous","important"),n.style.setProperty("speak-punctuation","none","important"),n.style.setProperty("speak","normal","important"),n.style.setProperty("speech-rate","medium","important"),n.style.setProperty("stress","50","important"),n.style.setProperty("table-layout","auto","important"),n.style.setProperty("text-decoration","none","important"),n.style.setProperty("text-indent","0","important"),n.style.setProperty("text-transform","none","important"),n.style.setProperty("top","auto","important"),n.style.setProperty("unicode-bidi","normal","important"),n.style.setProperty("vertical-align","baseline","important"),n.style.setProperty("volume","medium","important"),n.style.setProperty("white-space","normal","important"),n.style.setProperty("widows","2","important"),n.style.setProperty("width","auto","important"),n.style.setProperty("word-spacing","normal","important"),n.style.setProperty("z-index","auto","important"),n}})});WinJS.Class.mix(AdDuplexJs.Controls.AdControl,WinJS.Utilities.createEventProperties("adLoaded"),WinJS.Utilities.createEventProperties("adLoadingError"),WinJS.Utilities.createEventProperties("adClick"),WinJS.UI.DOMEventMixin)})(WinJS);
/*
//# sourceMappingURL=AdControl.min.js.map
*/