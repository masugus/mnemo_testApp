import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
// Navigate
export class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
  navigate(url: string) {
    return url;
  }
}
const mockSnapshot: any = {
  toString: () => {},
};

const activatedRouteSnapshotMock: any = {
  params: { id: 'login' },
  routeConfig: { path: 'login' },
};
describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        {
          provide: ActivatedRouteSnapshot,
          useValue: activatedRouteSnapshotMock,
        },
        { provide: Router, useValue: RouterStub },
      ],
    });

    authenticationGuard = TestBed.inject(AuthenticationGuard);
  });

  it('should have a canActivate method', () => {
    expect(typeof authenticationGuard.canActivate).toBe('function');
  });
});
