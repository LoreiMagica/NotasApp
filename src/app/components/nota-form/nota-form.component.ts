//Formulario usado para que el usuario introduzca los datos de la nueva nota
import { Component, EventEmitter, Output, Inject, Optional} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nota } from '../../services/notas.service'; //Importamos la interfaz para crear notas

//Librería para abrir y cerrar la ventana de editar
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

//Importación de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './nota-form.component.html',
    styleUrl: './nota-form.component.css',

})

export class NotaFormComponent {

  //Creamos el objeto nota para almacenar los valores introducidos por el usuario
  nota: Nota = { id: 0, titulo: '', descripcion: '', estado: 'pendiente'};
  @Output() save = new EventEmitter<Nota>();

  //Do
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Nota,
    @Optional() private dialogRef: MatDialogRef<NotaFormComponent>
  ) {
    // Si viene como diálogo de edición, copiamos los datos
    if (data) {
      this.nota = { ...data };
    }
  }




  //Al clickar en el botón "Crear" del formulario en el html, se invoca el método para crear la nota
  onSubmit() {
    this.save.emit(this.nota);
    if (this.dialogRef) {
      // Si se abrió como diálogo para editar, devolvemos la nota editada
      this.dialogRef.close(this.nota);
    } else {
      // Si se usó como formulario de crear, creamos la nota
      this.save.emit(this.nota);

      // Limpiamos el objeto nota
      this.nota = {
        id: 0,
        titulo: '',
        descripcion: '',
        estado: 'pendiente'
      };
  }
}
}