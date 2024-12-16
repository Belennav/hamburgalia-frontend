import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  logout() {
    localStorage.removeItem('token');
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
    this.authService.register(this.user).subscribe(
      (response) => {
        alert('Usuario registrado, inicie sesión');
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
      }
    );
  }

  login(): void {
    this.authService.login(this.user).subscribe(
      (response) => {
        if (response.token === '') {
          alert('Contraseña Incorrecta!');
          return;
        }
        console.log('Logeado');
        // save the token in local storage
        localStorage.setItem('token', response.token);
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
