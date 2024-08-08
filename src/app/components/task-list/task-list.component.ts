import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@app/models/task.model';
import { TaskService } from '@app/services/task.service';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService
  ) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit(): void {}

  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
    this.messageService.showMessage('Task status updated!');
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.messageService.showMessage('Task deleted successfully!');
  }
}
