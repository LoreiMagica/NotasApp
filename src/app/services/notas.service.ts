//Clase para realizar las operaciones con las notas del usuario
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Definimos las variables que almacenará una nota
export interface Nota {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'progreso' | 'completada';

}

@Injectable({ providedIn: 'root' })
export class NotasService {
  private apiUrl = 'http://localhost:3000/notas'; // Url del backend

  //Clave de acceso del usuario a sus notas
  private storageKey = 'notes';

  constructor(private http: HttpClient) {}

  //Función para obtener el token del usuario logeado
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  //Función para obtener la lista de notas
  obtenerNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  //Función para crear las notas
  guardarNotas(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota, { headers: this.getAuthHeaders() });
  }

  //Función para eliminar una nota
  eliminarNotas(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  //Función para actualizar una nota
  actualizarNota(nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.apiUrl}/${nota.id}`, nota, {
      headers: this.getAuthHeaders(),
    });
  }
}
