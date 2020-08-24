import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController, ToastController } from '@ionic/angular';
import { Plugins, Capacitor, GeolocationPosition } from '@capacitor/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  position: GeolocationPosition;
  user: User;
  constructor(
    private menuController: MenuController,
    private platform: Platform,
    private userService: UserService
  ) {
    this.menuController.enable(true, 'navigation');
  }

  ngOnInit() {
    const that = this;

    that.user = that.userService.getCurrentUser();
    that.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('Geolocation')) {
        Capacitor.Plugins.Geolocation.getCurrentPosition().then((location) => {
          that.position = location;
        });
      }
    });
  }
}
