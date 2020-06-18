import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Automovil } from '../models';
import { MessagesService } from '../messages.service';
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private autosURL = 'https://catalogo-autos.herokuapp.com/api/autos/limit/100';
  private autosActionsURL = 'https://catalogo-autos.herokuapp.com/api/autos';

  constructor(private http: HttpClient, private messagesServices: MessagesService) { }

  getAutos(): Observable<any> {
    return this.http.get<any>(this.autosURL).pipe(
      catchError(this.handleError<any>('getAutos')),
      tap(() => this.messagesServices.add('Autos Obtenidos'))
    )
  }

  updateAutos(auto: Automovil): Observable<any> {
    return this.http.put<any>(`${this.autosActionsURL}/${auto._id}`, auto).pipe(
      catchError(this.handleError<any>('updateAutos')),
      tap((result) => {
        console.log(result);
        this.messagesServices.add(`Auto actualizado con el id: ${result.data._id} `)
      })
    )
  }


  deleteAuto(auto:Automovil):Observable<any>{
    var idEliminado = auto._id;
    return this.http.delete<any>(`${this.autosActionsURL}/${auto._id}`).pipe(
      catchError(this.handleError<any>('deleteAuto')),
      tap((result) => {
        console.log(result);
        this.messagesServices.add(`Auto eliminado con el id: ${idEliminado} `)
      })
    )
  }


  /*addAuto(auto:any):Observable<any>{
    return this.http.post<any>(`${this.autosActionsURL}?${auto._id}`,auto);

  }*/
  addAuto(auto: Automovil): Observable<any> {
    return this.http.post<any>(this.autosActionsURL, auto).pipe(
      catchError(this.handleError<any>('addAuto')),
      tap((result) => {
        console.log(result);
        this.messagesServices.add(`Auto agregado con el id: ${result.data._id} `)
      })

    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messagesServices.add(`${operation} fallo: ${error.messages}`)
      return of(result as T);
    }

  }

}
