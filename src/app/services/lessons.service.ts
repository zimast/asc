import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) {}

  public loadAllLessons() {
      return this.http.get<Lesson[]>('/api/lessons');
  }

  public findLessonById(id:number) {
      return this.http.get<Lesson>('/api/lessons/' + id);
  }
}
