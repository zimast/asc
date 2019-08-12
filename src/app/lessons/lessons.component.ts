import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private readonly lessonsService: LessonsService,
    private readonly authService: AuthService  
  ) { }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons().pipe(map((response: LessonsResponse) => response.lessons));
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

}