
module.exports = {

	preloadBannerAd: function(appId, successCallback, errorCallback) {
		cordova.exec(
			successCallback,
			errorCallback,
			'AdDuplex',
			'preloadBannerAd',
			[appId]
		);
    },
    showBannerAd: function(appId, position, successCallback, errorCallback) {
		cordova.exec(
			successCallback,
			errorCallback,
			'AdDuplex',
			'showBannerAd',
			[appId, position]
		); 
    },
    hideBannerAd: function(successCallback, errorCallback) {
		cordova.exec(
			successCallback,
			errorCallback,
			'AdDuplex',
			'hideBannerAd',
			[]
		);
    },
	refreshBannerAd: function(successCallback, errorCallback) {
		cordova.exec(
			successCallback,
			errorCallback,
			'AdDuplex',
			'refreshBannerAd',
			[]
		);
    }
};
