import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  currentUser: User;
  fg: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const that = this;
    that.currentUser = that.userService.getCurrentUser();
    that.fg = that.formBuilder.group({
      fullname: [that.currentUser.fullname],
      email: [that.currentUser.email]
    });
  }

  reset() {
    const that = this;
    that.fg.controls.fullname.setValue(that.currentUser.fullname);
    that.fg.controls.email.setValue(that.currentUser.email);
  }

  save() {
    const that = this;
    that.currentUser.fullname = that.fg.controls.fullname.value;
    that.currentUser.email = that.fg.controls.email.value;
    that.userService.setUser(that.currentUser);
  }

}
