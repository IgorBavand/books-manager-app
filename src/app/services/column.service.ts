import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from '../shared/base/http-base.service';
import { Observable } from 'rxjs';
import { Column } from '../models/Colunm';

@Injectable({
  providedIn: 'root',
})
export class ColumnService extends HttpBaseService {
  private endpoint = 'api/columns';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getColumns(): Observable<Column[]> {
    return this.httpGet(this.endpoint);
  }
}
