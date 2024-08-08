import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '@app/services/task.service';
import { MessageService } from '@app/services/message.service';
import { motivationalQuotes } from '@app/mock-data/motivational-quotes';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [
    trigger('detailsExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', opacity: '0' })
      ),
      state('expanded', style({ height: '*', opacity: '1' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  showDetails: boolean = false;
  quote: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private messageService: MessageService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.setRandomQuote();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
      this.messageService.showMessage('Task added successfully!');
    } else {
      this.showFormErrors();
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  private setRandomQuote(): void {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    this.quote = motivationalQuotes[randomIndex];
  }

  private showFormErrors(): void {
    let errorMessage = '';
    const titleControl = this.taskForm.get('title');
    const descriptionControl = this.taskForm.get('description');

    if (titleControl?.invalid) {
      errorMessage +=
        'Title is required and should be at least 3 characters long. ';
    }
    if (descriptionControl?.invalid) {
      errorMessage +=
        'Description is required and should be at least 3 characters long.';
    }

    this.messageService.showMessage(errorMessage.trim());
  }
}
