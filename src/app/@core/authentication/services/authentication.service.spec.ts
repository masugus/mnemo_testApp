import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return credentials', () => {
        // Act
        service = TestBed.inject(AuthenticationService);

        const request = service.login({
            username: 'too',
            password: '123',
        });

        // tick(10000);
        // Assert
        request.subscribe((credent) => {
            expect(credent).toBeDefined();
            expect(credent.token).toBeDefined();
        });
    });

  });
});
