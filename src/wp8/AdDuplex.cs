//Copyright (c) 2014 Sang Ki Kwon (Cranberrygame)
//Email: cranberrygame@yahoo.com
//Homepage: http://cranberrygame.github.io
//License: MIT (http://opensource.org/licenses/MIT)
using System.Windows;
using System.Runtime.Serialization;
using WPCordovaClassLib.Cordova;
using WPCordovaClassLib.Cordova.Commands;
using WPCordovaClassLib.Cordova.JSON;
using System.Diagnostics; //Debug.WriteLine
//
using System.Windows.Controls;
using Microsoft.Phone.Controls;
using AdDuplex;
using AdDuplex.Models;

namespace Cordova.Extension.Commands
{
    public class AdDuplex : BaseCommand
    {
        //
        public string email;
        public string licenseKey;
        public bool validLicenseKey;
        protected string TEST_APP_KEY = "";
        protected string TEST_AD_UNIT_ID = "";
        //
        private string appKey;
        private string adUnitId;
        private bool isOverlap;
        private bool isTest;
        //
        private string previousBannerPosition;
        private string previousBannerSize;
        private int lastOrientation;
        //
        public bool bannerAdPreload;
        //
        private AdControl bannerView;
        private Grid bannerGrid;

        public void setLicenseKey(string args)
        {
            string email = JsonHelper.Deserialize<string[]>(args)[0];
            string licenseKey = JsonHelper.Deserialize<string[]>(args)[1];
            Debug.WriteLine("email: " + email);
            Debug.WriteLine("licenseKey: " + licenseKey);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _setLicenseKey(email, licenseKey);
            });
        }

        public void setUp(string args)
        {
            //string bannerAdUnit = JsonHelper.Deserialize<string[]>(args)[0];
            //string fullScreenAdUnit = JsonHelper.Deserialize<string[]>(args)[1];
            //bool isOverlap = Convert.ToBoolean(JsonHelper.Deserialize<string[]>(args)[2]);
            //bool isTest = Convert.ToBoolean(JsonHelper.Deserialize<string[]>(args)[3]);
            //Debug.WriteLine("bannerAdUnit: " + bannerAdUnit);
            //Debug.WriteLine("fullScreenAdUnit: " + fullScreenAdUnit);
            //Debug.WriteLine("isOverlap: " + isOverlap);
            //Debug.WriteLine("isTest: " + isTest);			
            string appKey = JsonHelper.Deserialize<string[]>(args)[0];
            string adUnitId = JsonHelper.Deserialize<string[]>(args)[1];
            bool isOverlap = true; //Convert.ToBoolean(JsonHelper.Deserialize<string[]>(args)[2]);
            bool isTest = false; // Convert.ToBoolean(JsonHelper.Deserialize<string[]>(args)[3]);
            Debug.WriteLine("appKey: " + appKey);
            Debug.WriteLine("adUnitId: " + adUnitId);
            Debug.WriteLine("isOverlap: " + isOverlap);
            Debug.WriteLine("isTest: " + isTest);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _setUp(appKey, adUnitId, isOverlap, isTest);
            });
        }
		
        public void preloadBannerAd(string args)
        {
            string appKey = JsonHelper.Deserialize<string[]>(args)[0];
            string adUnitId = JsonHelper.Deserialize<string[]>(args)[1];
            Debug.WriteLine("appKey: " + appKey);
            Debug.WriteLine("adUnitId: " + adUnitId);
           
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {   
                _preloadBannerAd();
            });
        }
        public void showBannerAd(string args)
        {
			string position=JsonHelper.Deserialize<string[]>(args)[0];
			Debug.WriteLine(position);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _showBannerAd(position);
            });
        }
        public void reloadBannerAd(string args)
        {
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _reloadBannerAd();
            });					
        }		
        public void hideBannerAd(string args)
        {
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _hideBannerAd();
            });	
        }
		
 		//
        private void _setLicenseKey(string email, string licenseKey)
        {
            this.email = email;
            this.licenseKey = licenseKey;

            /*
                    //
                    String str1 = Util.md5("cordova-plugin-: " + email);
                    String str2 = Util.md5("cordova-plugin-ad-admob: " + email);
                    String str3 = Util.md5("com.cranberrygame.cordova.plugin.: " + email);
                    String str4 = Util.md5("com.cranberrygame.cordova.plugin.ad.admob: " + email);
                    if(licenseKey != null && (licenseKey.equalsIgnoreCase(str1) || licenseKey.equalsIgnoreCase(str2) || licenseKey.equalsIgnoreCase(str3) || licenseKey.equalsIgnoreCase(str4))) {
                        Log.d(LOG_TAG, String.format("%s", "valid licenseKey"));
                        this.validLicenseKey = true;
                    }
                    else {
                        Log.d(LOG_TAG, String.format("%s", "invalid licenseKey"));
                        this.validLicenseKey = false;
			
                        //Util.alert(plugin.getCordova().getActivity(),"Cordova Admob: invalid email / license key. You can get free license key from https://play.google.com/store/apps/details?id=com.cranberrygame.pluginsforcordova");			
                    }
            */
        }

        private void _setUp(string appKey, string adUnitId, bool isOverlap, bool isTest)
        {
            /*
                        if (!validLicenseKey) {
                            if (new Random().nextInt(100) <= 1) {//0~99					
                                bannerAdUnit = TEST_BANNER_AD_UNIT;
                                fullScreenAdUnit = TEST_FULL_SCREEN_AD_UNIT;
                            }
                        }
            */
        }
		
        private void _preloadBannerAd()
        {
			loadBannerAd();
        }
		
        private void loadBannerAd()
        {
            if (bannerView == null)
            {
                bannerView = new AdControl();
                bannerView.AppId = "AppId";
                //bannerView.AppKey = appKey;//build error
                //bannerView.AdUnitId = adUnitId;//build error				
                bannerView.Width = 480;
                bannerView.Height = 80;
                bannerView.AdLoaded += bannerView_AdLoaded;
                bannerView.AdLoadingError += bannerView_AdLoadingError;
                //bannerView.RefreshInterval = 30;
            }		
		}
		
        private void _showBannerAd(string position)
        {
            loadBannerAd();

            _hideBannerAd();

            PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
            if (frame != null)
            {
                PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
                if (page != null)
                {
                    Grid grid = page.FindName("LayoutRoot") as Grid;
                    if (grid != null)
                    {
                        if (position == "top")
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Top;
                        }
                        else
                        {
                            bannerView.VerticalAlignment = VerticalAlignment.Bottom;
                        }

                        bannerGrid = new Grid();
                        bannerGrid.Children.Add(bannerView);
                        grid.Children.Add(bannerGrid);
                    }
                }
            }
        }
        private void _reloadBannerAd()
        {
            if (bannerView != null)
            {
            }
        }
        private void _hideBannerAd()
        {
            if (bannerView != null)
            {
                PhoneApplicationFrame frame = Application.Current.RootVisual as PhoneApplicationFrame;
                if (frame != null)
                {
                    PhoneApplicationPage page = frame.Content as PhoneApplicationPage;
                    if (page != null)
                    {
                        Grid grid = page.FindName("LayoutRoot") as Grid;
                        if (grid != null)
                        {
                            if (bannerGrid != null)
                            {
                                bannerGrid.Children.Remove(bannerView);
                                grid.Children.Remove(bannerGrid);
                            }
                        }
                    }
                }
            }
        }

        void bannerView_AdLoaded(object sender, AdLoadedEventArgs e)
        {
            Debug.WriteLine("bannerView_AdLoaded");
        }
        void bannerView_AdLoadingError(object sender, AdLoadingErrorEventArgs e)
        {
            Debug.WriteLine("bannerView_AdLoadingError: " + e.Error.Message.ToString());
        }
    }
}