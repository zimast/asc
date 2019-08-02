import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson.model';

interface LessonsResponse {
  lessons: Lesson[];
}

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  public lessons$: Observable<Lesson[]>;

  constructor(private readonly lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons().pipe(map((response: LessonsResponse) => response.lessons));
  }

}