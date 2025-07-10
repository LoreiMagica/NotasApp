//Clase para manejar el login del usuario
import { Component } from '@angular/core';
import { Router } from '@angular/router'; //Importamos el servicio para enrutar a otra página
import { AuthService } from '../../services/auth.service'; //Importamos el servicio de autenticación
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//Importación de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //Creamos variables para almacenar el usuario y contraseña introducidos por el usuario
  usuario: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  login() {

    //Comprueba si el usuario y contraseña son correctos
    this.authService.login(this.usuario, this.contrasena).subscribe({
      next: (response: any) => {

        //Si es correcto, se va a la página de notas usando el Router
        this.authService.guardarToken(response.access_token); // guarda el token

        localStorage.setItem('usuario', this.usuario);  //Guardamos el nombre de usuario en localStorage para mostrarlo en la sección de notas
        this.router.navigate(['/notas']); //Lleva al usuario a notas
        
    }, error: () => {

      //Si no es correcto, informa al usuario
      alert('Usuario o contraseña incorrecto');
    }
  })
}
}
