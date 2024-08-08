import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from '@app/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private messageService: MessageService) {}

  handleError(error: any): void {
    console.error('An error occurred:', error);
    this.zone.run(() => {
      this.messageService.showMessage(
        'An unexpected error occurred. Please try again later.'
      );
    });
  }
}
