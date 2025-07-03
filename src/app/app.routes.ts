//Clase que se encarga de enrutar la app a otros componentes
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; //Importamos el componente de la página de login
import { NotasComponent } from './pages/notas/notas.component'; //Importamos el componente de la página donde se listan las notas

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  //La redirección por defecto será al login
  { path: 'login', component: LoginComponent }, //Ruta a login
  { path: 'notas', component: NotasComponent } //Ruta a Notas
];
