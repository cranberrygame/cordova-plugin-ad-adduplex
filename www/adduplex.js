
module.exports = {
	_loadedBannerAd: false,
	_isShowingBannerAd: false,
	//
	setLicenseKey: function(email, licenseKey) {
		var self = this;	
        cordova.exec(
            null,
            null,
            'AdDuplex',
            'setLicenseKey',			
            [email, licenseKey]
        ); 
    },
	setUp: function(appKey, adUnitId, isOverlap, isTest) {
		var self = this;	
        cordova.exec(
            function (result) {
				if (typeof result == "string") {
					if (result == "onBannerAdPreloaded") {					
						if (self.onBannerAdPreloaded)
							self.onBannerAdPreloaded();
					}
					else if (result == "onBannerAdLoaded") {
						self._loadedBannerAd = true;
						
						if (self.onBannerAdLoaded)
							self.onBannerAdLoaded();
					}
					else if (result == "onBannerAdShown") {
						self._loadedBannerAd = false;
						self._isShowingBannerAd = true;
					
						if (self.onBannerAdShown)
							self.onBannerAdShown();
					}
					else if (result == "onBannerAdHidden") {
						self._isShowingBannerAd = false;
					
						 if (self.onBannerAdHidden)
							self.onBannerAdHidden();
					}					
				}
				else {
					//var event = result["event"];
					//var location = result["message"];				
					//if (event == "onXXX") {
					//	if (self.onXXX)
					//		self.onXXX(location);
					//}
				}			
			}, 
			function (error) {
			},
            'AdDuplex',
            'setUp',			
            [appId, adUnitId, isOverlap, isTest]
        ); 
    },	
	preloadBannerAd: function() {
		cordova.exec(
			null,
			null,
			'AdDuplex',
			'preloadBannerAd',
			[appId]
		);
    },
    showBannerAd: function(position) {
		cordova.exec(
			null,
			null,
			'AdDuplex',
			'showBannerAd',
			[position]
		); 
    },
	reloadBannerAd: function() {
		cordova.exec(
			null,
			null,
			'AdDuplex',
			'reloadBannerAd',
			[]
		);
    },
    hideBannerAd: function() {
		cordova.exec(
			null,
			null,
			'AdDuplex',
			'hideBannerAd',
			[]
		);
    },
	loadedBannerAd: function() {
		return this._loadedBannerAd;
	},
	isShowingBannerAd: function() {
		return this._isShowingBannerAd;
	},
	onBannerAdPreloaded: null,
	onBannerAdLoaded: null,
	onBannerAdShown: null,
	onBannerAdHidden: null	
};
