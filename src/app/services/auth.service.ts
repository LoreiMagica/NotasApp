//Clase para manejar el login de usuario
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Clave para comprobar si el usuario está loggeado
  private isLoggedInKey = 'isLoggedIn';

  //Función para comprobar las credenciales del usuario
  login(usuario: string, contrasena: string): boolean {

    //Si es correcto, devuelve un true. En caso contrario, un false 
    //ESTO HAY QUE CAMBIARLO AL CREAR LA BASE DE DATOS!!!
    if (usuario && contrasena) {
      localStorage.setItem(this.isLoggedInKey, 'true');
      return true;
    }
    return false;
  }

  //Fubción para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.isLoggedInKey);
  }

  //Función para comprobar si el usuario está ya loggeado
  isLogged(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }
}
