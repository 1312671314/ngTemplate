import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class NoticeService {
  constructor() {}
  sub = new Subject<any>();
}
