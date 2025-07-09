//Clase principal. Se ejecuta al lanzar la app
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; //Contenedor de la app
import { provideRouter } from '@angular/router'; //Clase para enrutar y cambiar de componente
import { routes } from './app/app.routes'; //Nuestro archivo de rutas
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; //Clase de formularios para logearse y crear notas
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';

import { provideHttpClient } from '@angular/common/http'; //Librería para comunicarse con el backend


//Cargamos la app y los imports
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
        provideHttpClient(), 
    importProvidersFrom(FormsModule, BrowserAnimationsModule, MatDialogModule), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
//Y en caso de error, lo lanza por consola