import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Enums/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  private apiUrl: string;
  constructor(private _http: HttpClient) {
    this.apiUrl = environment.BASE_API_URL + 'Blog/';
  }

  getBlogList(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}GetAllBlogList`);
  }

  // CREATE
  createBlog(item: any): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}CreateBlog`, item);
  }

  // READ (GET BY ID)
  getBlogById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.get<any>(url);
  }

  // UPDATE
  updateBlog(item: any): Observable<any> {
    // const url = `${this.apiUrl}/${id}`;
    return this._http.put<any>(`${this.apiUrl}UpdateBlog`, item);
  }

  // DELETE
  deleteBlog(id: number): Observable<any> {
    // const url = `${this.apiUrl}DeleteBlog${id}`;
    return this._http.delete<any>(`${this.apiUrl}DeleteBlog?id=` + id);
  }

  // deleteBlog(id: number): Observable<any> {
  //   return this._http.get<any>(`${this.apiUrl}DeleteBlog?id=` + id);
  // }

}
