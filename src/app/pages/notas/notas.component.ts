//Clase que se encarga de hacer de puente entre el NotasService y el usuario
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaFormComponent } from '../../components/nota-form/nota-form.component'; //Importamos el formulario de notas
import { NotasService, Nota } from '../../services/notas.service'; //Importamos el servicio de notas

//Librería para abrir y cerrar la ventana de editar
import { MatDialog } from '@angular/material/dialog';

//Para que funcione ngModel
import { FormsModule } from '@angular/forms';


//Importación de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



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
    MatIconModule,
    MatChipsModule,
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',

})
export class NotasComponent implements OnInit {

  //Constructores para:
  constructor(
    private notasService: NotasService, // obtener el servicio que gestiona las operaciones con notas
    private dialog: MatDialog //Crear el diálogo de editar
  ) {}
  
notasOriginales: Nota[] = []; // Guarda todas las notas sin filtrar
notas: Nota[] = [];           // Notas que se muestran
filtroEstado: string = '';    // Filtro actual ('' muestra todas)

//Función para cargar las notas al cargar la página web
ngOnInit(): void {
  this.notasOriginales = this.notasService.obtenerNotas();
  this.filtrarNotas(); // Para aplicar filtro si está activo
}

 //Función para crear la nueva nota
crearNota(nota: Nota) {
  this.notasService.guardarNotas(nota);
  this.notasOriginales = this.notasService.obtenerNotas();
  this.filtrarNotas();
}

//Función para eliminar una nota elegida de la lista
borrarNota(id: number) {
  this.notasService.eliminarNotas(id);
  this.notasOriginales = this.notasService.obtenerNotas();
  this.filtrarNotas();
}

// Ordena por ID ascendente
ordenarPorIdAsc() {
  this.notas.sort((a, b) => a.id - b.id);
}

// Ordena por ID descendente
ordenarPorIdDesc() {
  this.notas.sort((a, b) => b.id - a.id);
}

// Filtra las notas según el filtro clickado
filtrarNotas() {
  if (this.filtroEstado === '') {
    this.notas = [...this.notasOriginales];
  } else {
    this.notas = this.notasOriginales.filter(nota => nota.estado === this.filtroEstado);
  }
}



  //Función para mostrar mejor el texto del chip que dice el estado de la nota
  getEstadoLegible(estado: string): string {
  switch (estado) {
    case 'pendiente':
      return 'Pendiente';
    case 'progreso':
      return 'En progreso';
    case 'completada':
      return 'Completada';
    default:
      return estado;
  }
}

//Función para abrir un diálogo donde el usuario puede actualizar los parámetros de su nota
editarNota(nota: any) {
  const dialogRef = this.dialog.open(NotaFormComponent, {
    width: '100%',
    maxWidth: '600px', //Límite para que no se abra un diálogo gigante
    height: '100%',
    maxHeight: '500px',
    panelClass: 'custom-dialog-container',
    data: nota,
  });

  //Función para actualizar la lista de notas tras editar
  dialogRef.afterClosed().subscribe((notaEditada) => {
    if (notaEditada) {
      const index = this.notas.findIndex((n) => n.id === notaEditada.id);
      if (index !== -1) {
        this.notas[index] = notaEditada;
      }
    }
  });
}
}
