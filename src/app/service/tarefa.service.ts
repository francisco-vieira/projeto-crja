import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tarefa} from "../model/tarefa";

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private host = "http://localhost:8080/api/tarefas"

  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.host, this.httpOptions)
  }

  get(id: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.host}/${id}`, this.httpOptions)
  }

  post(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.host, JSON.stringify(tarefa), this.httpOptions)
  }

  delete(id: number): Observable<String> {
    return this.http.delete(`${this.host}/${id}`, {responseType: "text"})
  }

}
