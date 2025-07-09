//Clase para manejar el login de usuario
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private backendUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  //Clave para comprobar si el usuario está loggeado
  private isLoggedInKey = 'isLoggedIn';

  //Función para comprobar las credenciales del usuario
  login(usuario: string, contrasena: string): Observable<any> {
    //Si es correcto, devuelve un true. En caso contrario, un false 
    //ESTO HAY QUE CAMBIARLO AL CREAR LA BASE DE DATOS!!!
    return this.http.post(`${this.backendUrl}/auth/login`, {
      usuario,
      contrasena
    });
  }

  //Función para guardar el token en el localStorage del navegador cliente
  guardarToken(token: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('isLoggedIn', 'true');
  }

  //Función para obtener el token guardado del navegador cliente
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  //Función para cerrar sesión (HAY QUE PONER UN BOTÓN DE LOG OUT)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);  }

  //Función para comprobar si el usuario está ya loggeado
  isLogged(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
