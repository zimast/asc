import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) {}

  loadAllLessons() {
      return this.http.get<Lesson[]>('/api/lessons');
  }

  findLessonById(id:number) {
      return this.http.get<Lesson>('/api/lessons/' + id);
  }
}
