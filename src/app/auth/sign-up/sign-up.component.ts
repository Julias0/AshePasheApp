import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  domain: string;
  email: string;
  myGroup: FormGroup;
  refreshToken: string;

  constructor(private menuController: MenuController, private iab: InAppBrowser, private authService: AuthService, private formBuidler: FormBuilder, private toastController: ToastController,) {
    this.menuController.enable(false, 'navigation');
  }

  samlLogic(url) {
    url += '&RelayState=MOBILE';
    const browser = this.iab.create(url, '_blank', 'location=yes');
    browser.on('loadstop').subscribe(event => {
      var getResponse = setInterval(() =>{
        browser.executeScript({
          code: 'try{document.getElementById("fyle-login-response").innerHTML;}catch(err){}'
        }).then((responseData) => {
          var response = responseData && responseData[0];
          var data = '';

          try {
            data = JSON.parse(response);
          } catch (err) {
          }
          if (data) {
            clearInterval(getResponse);
            browser.close();
            this.refreshToken = data['refresh_token'];
            this.toastController.create({
              message: data['refresh_token'],
            }).then(alert => {
              return alert.present();
            });
          }
        });
      }, 1000);
    });
  };

  saml() {
    this.authService.checkEmailExists(this.myGroup.value.email).then(res => {
      if (res && res.idp_url) {
        this.domain = res.cluster_domain;
        this.samlLogic(res.idp_url)
      }
    })
  };

  ngOnInit() { 
    this.domain = 'Nothing';
    this.myGroup = this.formBuidler.group({
      email: ['', Validators.required]
    });
  }

}
