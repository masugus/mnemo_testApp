import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginComponent } from './login.component';
import { environment } from '@env/environment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSlideToggleModule
      ],
      declarations: [LoginComponent],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(inject([AuthenticationService], (service: any) => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = service;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login ', fakeAsync(() => {
    const authToken = 'as';
    component.createForm();
    component.loginForm.get('username')?.setValue('Darth revan');
    component.loginForm.get('password')?.setValue('1234qwerty');


    authService
      .login(component.loginForm.value)
      .subscribe((credentials: any) => {
        expect(credentials.username).toEqual(
          component.loginForm.get('username')?.value
        );
      });
    httpTestingController
      .expectOne(`${environment.serverUrl}/login`)
      .flush({ token: authToken, retoken: '12345', username: 'Darth revan' });
    flushMicrotasks();
    component.login();
    tick(6000);
  }));
});
