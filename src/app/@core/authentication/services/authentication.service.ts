import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Authentication } from '../metadata/authentication';
import { Credentials } from '../metadata/credentials';

// headers
const headers: HttpHeaders = new HttpHeaders({
  'Content-type': 'application/json',
});
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /**
   * La semilla inicial de la URL a la que lanzaremos las peticiones. Es común
   * para todas ellas.
   *
   * @type {*}
   * @memberof ApiService
   */
  baseUrl: string = environment.serverUrl;

  /**
   * Creates an instance of AuthenticationService.
   * @param {HttpClient} http
   * @memberof AuthenticationService
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: Authentication): Observable<Credentials> {
    const remember = context.remember;
    if (remember) {
      localStorage.setItem('login', JSON.stringify(context));
    }
    localStorage.setItem('remember', `${remember}`);
    delete context.remember;

    // Replace by proper authentication call
    return this.http
      .post(`${this.baseUrl}/login`, context, { headers })
      .pipe(
        timeout(6000),
        tap((res: any) => {
          console.log(res);
        })
      );
  }
}
