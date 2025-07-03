//Formulario usado para que el usuario introduzca los datos de la nueva nota
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nota } from '../../services/notas.service'; //Importamos la interfaz para crear notas

//Importación de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './nota-form.component.html',
})
export class NotaFormComponent {
  @Output() save = new EventEmitter<Nota>();

  //Creamos el objeto nota para almacenar los valores introducidos por el usuario
  nota: Nota = { id: 0, titulo: '', descripcion: '' };

  //Al clickar en el botón "Crear" del formulario en el html, se invoca el método para crear la nota
  onSubmit() {
    this.save.emit(this.nota);
    this.nota = { id: 0, titulo: '', descripcion: '' };
  }
}