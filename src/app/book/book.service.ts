import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../shared/base/http-base.service';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService extends HttpBaseService {
  private endpoint = 'api/books';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getBooks(): Observable<any> {
    return this.httpGet(this.endpoint);
  }

  getBookById(id: number): Observable<Book> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  importBooks(file: FormData): Observable<any> {
    return this.httpPost(`${this.endpoint}/import`, file);
  }

  saveBook(form: Book): Observable<Book> {
    return this.httpPost(`${this.endpoint}/save-book`, form);
  }

  updateBook(form: Book, id: number): Observable<Book> {
    return this.httpPut(`${this.endpoint}/${id}`, form);
  }

  deleteBook(id: number): Observable<void> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }
}
