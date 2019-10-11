import { Injectable, Injector } from '@angular/core';
import { ToDoItem } from 'src/app/model/entity/todoitem/to-do-item';
import { AbstractService } from '../abstract.service';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService extends AbstractService<ToDoItem> {

  constructor(protected injector: Injector) {
    super(injector, '/todo/item');

  }
}
