//Clase para realizar las operaciones con las notas del usuario
import { Injectable } from '@angular/core';

//Definimos las variables que almacenará una nota
export interface Nota {
  id: number;
  titulo: string;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class NotasService {

  //Clave de acceso del usuario a sus notas
  private storageKey = 'notes';

  //Función para obtener la lista de notas
  obtenerNotas(): Nota[] {
    const notas = localStorage.getItem(this.storageKey);
    return notas ? JSON.parse(notas) : [];
  }

  //Función para crear las notas
  guardarNotas(nota: Nota): void {
    let notas = this.obtenerNotas(); //Obtenemos la lista de notas
    if (nota.id) {
      notas = notas.map(n => n.id === nota.id ? nota : n); //En caso de tener un id ya, la sobreescribe
    } else {

      //Por ahora la id será la fecha de su creación
      nota.id = Date.now();
      notas.push(nota);
    }

    //Mandamos la nota para ser guardada en memoria (DEBE de actualizarse cuando cree la base de datos!!!)
    localStorage.setItem(this.storageKey, JSON.stringify(notas));
  }

  //Función para eliminar una nota
  eliminarNotas(id: number): void {
    const notes = this.obtenerNotas().filter(n => n.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }
}
