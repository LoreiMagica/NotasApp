//Clase que se encarga de hacer de puente entre el NotasService y el usuario
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaFormComponent } from '../../components/nota-form/nota-form.component'; //Importamos el formulario de notas
import { NotasService, Nota } from '../../services/notas.service'; //Importamos el servicio de notas

//Importación de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    CommonModule,
    NotaFormComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './notas.component.html',
    styleUrl: './notas.component.css',

})
export class NotasComponent implements OnInit {
  //Guarda la información de la nota obtenida
  notas: Nota[] = [];

  constructor(private notasService: NotasService) {}

  //Función para cargar las notas al cargar la página web
  ngOnInit(): void {
    this.notas = this.notasService.obtenerNotas();
  }

  //Función para crear la nueva nota
  crearNota(nota: Nota) {
    this.notasService.guardarNotas(nota);
    this.notas = this.notasService.obtenerNotas();
  }

  //Función para eliminar una nota elegida de la lista
  borrarNota(id: number) {
    this.notasService.eliminarNotas(id);
    this.notas = this.notasService.obtenerNotas();
  }
}
