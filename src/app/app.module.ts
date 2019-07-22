import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import { RouterModule } from '@angular/router';
import { routesConfig } from './routes.config';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routesConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
