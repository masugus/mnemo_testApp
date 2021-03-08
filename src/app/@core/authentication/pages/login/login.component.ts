import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * contiene el grupo del formulario
   *
   * @type {FormGroup}
   * @memberof LoginComponent
   */
  loginForm!: FormGroup;

  /**
   * variable que usamos en el html para cambiar el tipo del input que contiene el pass
   * @memberof LoginComponent
   */
  viewPass = false;

  /**
   * Flag que usamos para la anumacion del shake.
   * @memberof LoginComponent
   */
  existsError = false;

  /**
   * Creates an instance of LoginComponent.
   * @param {FormBuilder} formBuilder
   * @param {AuthenticationService} authenticationService
   * @memberof LoginComponent
   */
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  /**
   * Inicialización del componente
   * @author Alberto Masogo Mendoza
   * @memberof LoginComponent
   */
  ngOnInit() {
    console.log('Inicio del componente');
  }


  /**
   * Método que lanza unapeticion ala API para loguearnos en la app.
   * @author Alberto Masogo Mendoza
   * @memberof LoginComponent
   */
  login() {
    if (!this.loginForm.valid) {
      this.existsError = true;

      setTimeout(() => {
        this.existsError = false;
      }, 1000);
    } else {
      this.existsError = false;
      const login$ = this.authenticationService.login(this.loginForm.value);
      login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
        })
      )
      .subscribe(
        (credentials) => {
          console.log(`${credentials.user} successfully logged in`);
        },
        (error) => {
          console.log(`Login error: ${error}`);
          this.existsError = true;
        }
      );
    }
  }

  /**
   * Funcion que llama al constructor del formulario para crear un nuevo grupo de controles
   * @author Alberto Masogo Mendoza
   * @memberof LoginComponent
   */
  createForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')),
      'password': new FormControl('', Validators.minLength(5)),
      'remember': new FormControl(false)
    });
  }

  /**
   * Destrucción del componente
   * @author Alberto Masogo Mendoza
   * @memberof LoginComponent
   */
  ngOnDestroy() {
    console.log('COmponent destroyed')
  }

}
