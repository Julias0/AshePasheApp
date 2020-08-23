import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

class MockUserService {
  private currentUser: User;

  constructor() {
    this.currentUser = {
      id: 'ciubqoioqienqeixqoien1231',
      fullname: 'Test Man',
      email: 'test@test.com',
      location: {
        latitude: 123,
        longitude: 23
      },
      createdAt: new Date()
    };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setUser(user: User) {
    this.currentUser = user;
  }
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let mockUserService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePage],
      providers: [
        FormBuilder,
        {
          provide: UserService,
          useClass: MockUserService
        }
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    mockUserService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('save should work properly', () => {
    expect(mockUserService.getCurrentUser().email).toBe('test@test.com');
    expect(mockUserService.getCurrentUser().fullname).toBe('Test Man');

    component.fg.controls.email.setValue('kumro@kumro.com');
    component.fg.controls.fullname.setValue('Kumro Man');

    component.save();

    expect(mockUserService.getCurrentUser().email).toBe('kumro@kumro.com');
    expect(mockUserService.getCurrentUser().fullname).toBe('Kumro Man');
  });

  it('reset after save shouldnt revert to old values', () => {
    expect(component.fg.value.email).toBe('test@test.com');
    expect(component.fg.value.fullname).toBe('Test Man');

    component.fg.controls.email.setValue('kumro@kumro.com');
    component.fg.controls.fullname.setValue('Kumro Man');

    component.save();

    expect(mockUserService.getCurrentUser().email).toBe('kumro@kumro.com');
    expect(mockUserService.getCurrentUser().fullname).toBe('Kumro Man');

    component.reset();

    expect(component.fg.value.email).toBe('kumro@kumro.com');
    expect(component.fg.value.fullname).toBe('Kumro Man');
  });

  it('should have proper user', () => {
    expect(component.currentUser.fullname).toBe('Test Man');
    const app = fixture.nativeElement;
    fixture.detectChanges();
    expect(app.querySelector('ion-avatar > img').src).toBe('https://robohash.org/Test%20Man');

    expect(component.fg.value.email).toBe('test@test.com');
    expect(component.fg.value.fullname).toBe('Test Man');
  });

  it('reset should work properly', () => {
    expect(component.fg.value.email).toBe('test@test.com');
    expect(component.fg.value.fullname).toBe('Test Man');

    component.fg.controls.email.setValue('kumro@kumro.com');
    component.fg.controls.fullname.setValue('Kumro Man');

    expect(component.fg.value.email).toBe('kumro@kumro.com');
    expect(component.fg.value.fullname).toBe('Kumro Man');

    component.reset();

    expect(component.fg.value.email).toBe('test@test.com');
    expect(component.fg.value.fullname).toBe('Test Man');
  });
});
