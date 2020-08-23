import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  fg: FormGroup;
  message: string;

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
      email: ['', Validators.required],
      password: ['', Validators.required]
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
        this.message = 'You made some mistake! Shame Shame';
        this.toastController.create({
          message: 'You made some mistake! Shame Shame',
        }).then(alert => {
          return alert.present();
        });
      }
    });
  }

}
