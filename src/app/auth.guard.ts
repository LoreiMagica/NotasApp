import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'; //Obtenemos las rutas de nuestra app
import { AuthService } from './services/auth.service'; // Obtenemos el servicio de loggeo

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    //Llama a la variable del servicio de login que indica si se ha loggeado o no
    if (this.authService.isLogged()) { 
      return true; //Si el usuario se ha loggeado, devuelve un true
    } else {
      this.router.navigate(['/login']); //En caso contrario, redirige al login, y devuelve un false
      return false;
    }
  }
}
