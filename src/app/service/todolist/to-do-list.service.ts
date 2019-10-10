import { Injectable, Injector } from '@angular/core';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { AbstractService } from '../abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService  extends AbstractService<ToDoList> {

  constructor(protected injector: Injector) {
    super(injector, '/todo/list');

  }


}
