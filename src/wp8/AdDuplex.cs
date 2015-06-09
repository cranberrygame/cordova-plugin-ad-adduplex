// Copyright (c) 2014 cranberrygame
// Email: cranberrygame@yahoo.com
// Phonegap plugin: http://www.github.com/cranberrygame
// Construct2 phonegap plugin: https://www.scirra.com/forum/viewtopic.php?f=153&t=109586
//                             https://dl.dropboxusercontent.com/u/186681453/index.html
//                             https://www.scirra.com/users/cranberrygame
// Facebook: https://www.facebook.com/profile.php?id=100006204729846
// License: MIT (http://opensource.org/licenses/MIT)
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
        private AdControl bannerView;
        private Grid bannerGrid;

        public void preloadBannerAd(string args)
        {
            string appId = JsonHelper.Deserialize<string[]>(args)[0];
            Debug.WriteLine("appId: " + appId);
           
            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {   
                _preloadBannerAd(appId);
                
				DispatchCommandResult(new PluginResult(PluginResult.Status.OK));			
				//DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            });
        }
        public void showBannerAd(string args)
        {
            string appId = JsonHelper.Deserialize<string[]>(args)[0];
            Debug.WriteLine("appId: " + appId);
			string position=JsonHelper.Deserialize<string[]>(args)[1];
			Debug.WriteLine(position);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _showBannerAd(appId, position);

				DispatchCommandResult(new PluginResult(PluginResult.Status.OK));			
				//DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            });
        }
        public void hideBannerAd(string args)
        {
            //this.adUnit = JsonHelper.Deserialize<string[]>(args)[0];
            //Debug.WriteLine("adUnit: " + adUnit);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _hideBannerAd();

				DispatchCommandResult(new PluginResult(PluginResult.Status.OK));			
				//DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            });	
        }
        public void refreshBannerAd(string args)
        {
            //this.adUnit = JsonHelper.Deserialize<string[]>(args)[0];
            //Debug.WriteLine("adUnit: " + adUnit);

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {
                _refreshBannerAd();

				DispatchCommandResult(new PluginResult(PluginResult.Status.OK));			
				//DispatchCommandResult(new PluginResult(PluginResult.Status.ERROR));
            });					
        }		
 		//---------------------------
        private void _preloadBannerAd(string appId)
        {
            if (bannerView == null)
            {
                bannerView = new AdControl();
                bannerView.AppId = appId;
                bannerView.Width = 480;
                bannerView.Height = 80;
                bannerView.AdLoaded += bannerView_AdLoaded;
                bannerView.AdLoadingError += bannerView_AdLoadingError;
                //bannerView.RefreshInterval = 30;
            }
        }
        private void _showBannerAd(string appId, string position)
        {
            if (bannerView == null)
            {
                _preloadBannerAd(appId);
            }

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
        private void _refreshBannerAd()
        {
            if (bannerView != null)
            {
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