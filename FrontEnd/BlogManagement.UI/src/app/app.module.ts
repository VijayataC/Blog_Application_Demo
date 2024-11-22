import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { exceptionInterceptor } from './exception.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers:[
    HttpClientModule,
    // {provide : HTTP_INTERCEPTORS, useClass :exceptionInterceptor, multi: true },
    provideHttpClient(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
