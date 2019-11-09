import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson.model';
import { AuthService } from '../services/auth.service';

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

  constructor(private lessonsService: LessonsService, private authService: AuthService) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.lessons$ = this.lessonsService.loadAllLessons().pipe(map((response: LessonsResponse) => response.lessons), catchError(err => of([])));
  }

}
