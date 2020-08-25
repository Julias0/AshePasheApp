import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController, ToastController } from '@ionic/angular';
import { Plugins, Capacitor, GeolocationPosition, Camera, CameraResultType } from '@capacitor/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  position: GeolocationPosition;
  user: User;
  isCameraAvailable = false;
  image: string;
  platformName: string[] = [];

  constructor(
    private menuController: MenuController,
    private platform: Platform,
    private userService: UserService,
    private sms: SMS
  ) {
    this.menuController.enable(true, 'navigation');
  }

  ngOnInit() {
    const that = this;

    that.user = that.userService.getCurrentUser();
    that.platform.ready().then(() => {
      that.platformName = that.platform.platforms();
      console.log(that.platformName);
      if (Capacitor.isPluginAvailable('Geolocation')) {
        Capacitor.Plugins.Geolocation.getCurrentPosition().then((location) => {
          that.position = location;
        });
      }

      if (Capacitor.isPluginAvailable('Camera')) {
        that.isCameraAvailable = true;
      }
    });
  }

  async takeAPhoto() {
    let that = this;
    const image = await Camera.getPhoto({
      quality: 2,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });

    that.image = image.dataUrl;
  }
}
