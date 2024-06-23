import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../shared/base/http-base.service';
import { Observable } from 'rxjs';

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
}
