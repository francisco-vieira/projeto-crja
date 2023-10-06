import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tarefa} from "../model/tarefa";
import {env} from "../../var/env";

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private host = env.host.concat('tarefas')

  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.host.concat("/todos"), this.httpOptions)
  }

  getId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.host}?id=${id}`, this.httpOptions)
  }

  post(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.host, JSON.stringify(tarefa), this.httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.host}?id=${id}`, this.httpOptions)
  }

}
