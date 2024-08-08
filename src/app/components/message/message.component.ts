import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="message" class="message">
      {{ message }}
    </div>
  `,
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message: string | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.message$.subscribe((msg) => {
      this.message = msg;
      if (msg) {
        setTimeout(() => (this.message = null), 3000);
      }
    });
  }
}
