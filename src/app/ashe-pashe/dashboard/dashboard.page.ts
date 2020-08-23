import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController, ToastController } from '@ionic/angular';
import { Plugins, Capacitor, GeolocationPosition } from '@capacitor/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  position: GeolocationPosition;
  constructor(
    private menuController: MenuController,
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.menuController.enable(true, 'navigation');
  }

  ngOnInit() {
    const that = this;
    that.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('Geolocation')) {
        Capacitor.Plugins.Geolocation.getCurrentPosition().then((location) => {
          that.position = location;
        });
      }
    });
  }
}
