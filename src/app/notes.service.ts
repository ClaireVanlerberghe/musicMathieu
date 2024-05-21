import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getJsonData(): Observable<string> {
    return this.http.get<string>('assets/notes.json');
  }
}