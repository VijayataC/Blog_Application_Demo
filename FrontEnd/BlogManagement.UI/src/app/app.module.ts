import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { exceptionInterceptor } from './exception.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddUpdateComponent } from './add-update/add-update.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { DispalyBlogsComponent } from './dispaly-blogs/dispaly-blogs.component';



@NgModule({
  declarations: [
    AppComponent,
    AddUpdateComponent,
    DeleteBlogComponent,
    DispalyBlogsComponent
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
