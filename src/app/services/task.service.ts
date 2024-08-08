import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '@app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: { title: string; description: string }): void {
    const newTask: Task = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      completed: false,
    };
    this.tasks.push(newTask);
    this.updateTasks();
  }

  toggleTaskCompletion(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.updateTasks();
    }
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.updateTasks();
  }

  private updateTasks(): void {
    this.tasksSubject.next([...this.tasks]);
    this.saveTasksToLocalStorage();
  }

  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.tasksSubject.next([...this.tasks]);
    }
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
