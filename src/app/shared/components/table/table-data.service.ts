import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private subject = new Subject()

  constructor() { }

  public sendData(data: Array<object>): void {
    this.subject.next(data)
  }

  public getData(): any {
    return this.subject.asObservable()
  }

}
