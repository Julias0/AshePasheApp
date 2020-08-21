import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  protected fg: FormGroup;

  constructor(
    private menuController: MenuController,
    private toastController: ToastController,
    private authService: AuthService,
    private formBuidler: FormBuilder,
    private router: Router) {
    this.menuController.enable(false, 'navigation');
  }

  ngOnInit() {
    this.fg = this.formBuidler.group({
      email: [''],
      password: ['']
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate([
        '/',
        'ashe-pashe',
        'dashboard'
      ]);
    }
  }

  signIn() {
    console.log('Sign in clicked');
    console.log(this.fg.value);
    this.authService.signIn(this.fg.value.email, this.fg.value.password).then(valid => {
      if (valid) {
        this.toastController.create({
          message: 'You are now logged in!',
        }).then(alert => {
          return alert.present();
        }).then(() => {
          this.router.navigate([
            '/',
            'ashe-pashe',
            'dashboard'
          ]);
        });
      } else {
        this.toastController.create({
          message: 'You made some mistake! Shame Shame',
        }).then(alert => {
          return alert.present();
        })
      }
    });
  }

}
