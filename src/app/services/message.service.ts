import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  showMessage(msg: string) {
    this.messageSubject.next(msg);
    setTimeout(() => this.messageSubject.next(null), 3000);
  }
}
