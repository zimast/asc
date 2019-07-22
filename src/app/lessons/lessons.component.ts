import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson';
import { LessonsService } from '../services/lessons.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  public lessons$: Observable<Lesson[]>;

  constructor(private lessonsService: LessonsService) { }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons();
  }

}
