import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
  }
  user = {
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  isLogin: boolean = false;
  notLoggedIn: boolean = true;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) this.notLoggedIn = false;
  }

  register(): void {
    if (!this.checkData(true)) return;
    this.authService.register(this.user).subscribe(
      (response) => {
        alert('Usuario registrado, inicie sesión');
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
      }
    );
  }

  checkData(register: boolean): boolean {
    if (this.user.username === '') {
      alert('El usuario debe tener un nombre');
      return false;
    }
    if (register && this.user.email === '') {
      alert('El usuario debe tener un email');
      return false;
    }
    if (this.user.password === '') {
      alert('El usuario debe tener una contraseña');

      return false;
    }
    return true;
  }

  login(): void {
    if (!this.checkData(false)) return;
    this.authService.login(this.user).subscribe(
      (response) => {
        if (response.token === '') {
          alert('Contraseña Incorrecta!');
          return;
        }
        console.log('Logeado');
        // save the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);

        window.location.reload();
      },
      (error) => {
        console.error('Error al loguear el usuario:', error);
      }
    );
  }

  // login() {
  //   this.authService.login(this.user).subscribe({
  //     next: (response) => {
  //       console.log('User logged in:', response);
  //       // Puedes guardar el token JWT aquí
  //     },
  //     error: (error) => {
  //       console.error('Error logging in:', error);
  //     }
  //   });
  // }
}
