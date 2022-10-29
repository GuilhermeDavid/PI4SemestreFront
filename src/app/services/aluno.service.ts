import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../entities/aluno';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AlunoService {  
  baseUrl = environment.baseUrl;
  /*Quando o construtor for chamado ele permitirá manipular 
  * um HttpClient e um MatSnackBar*/
  constructor(private http: HttpClient, private snack: MatSnackBar){}  
 
  message(msg: String): void{ 
    this.snack.open(`${msg}`, `OK`, {
       horizontalPosition: 'end',
       verticalPosition: 'top',
       duration: 5000
   })}
   

  /*O método findAll irá fazer a requisição 
  * para o back e aguardará a resposta.*/
  findAll (): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.baseUrl);
  }

  /*método que irá apagar um registro
  *esse método, segundo o back end, deve receber
  *um id e não retornar nada.
  * A url que faz a chamada dever ser a 
  * base(baseUrl) concatenada com /id. */  
  apagar(id: any): Observable<void>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);
  }

  /*irá transformar o status do aluno para inativo (ativo=false)
  * No back, através do PUT a url espera receber o ra a ser alterado.
  * Ao final é retornado um Aluno atualizado.
  */
  atualizar(aluno: Aluno): Observable<Aluno> {
    const url = `${this.baseUrl}/${aluno.ra}`
    return this.http.put<Aluno>(url, aluno);
  }
}