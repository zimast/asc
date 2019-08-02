import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lesson } from '../model/lesson.model';
import { LessonsService } from '../services/lessons.service';

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
    this.lessonsService.loadAllLessons()
      .pipe(map((response: LessonsResponse) => response.lessons))
  }

}
