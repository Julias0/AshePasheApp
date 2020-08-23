import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignInComponent } from './sign-in.component';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardPage } from 'src/app/ashe-pashe/dashboard/dashboard.page';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        FormBuilder
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'ashe-pashe/dashboard',
            component: DashboardPage
          }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
