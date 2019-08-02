import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lesson } from '../models/lesson.model';

export interface LessonsResponse {
  lessons: Lesson[];
}

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private readonly httpClient: HttpClient) { }

  public loadAllLessons() {
    return this.httpClient.get<LessonsResponse>('/api/lessons');
  }

  public findLessonById(id: number) {
    return this.httpClient.get<Lesson>('/api/lessons/' + id);
  }
}
