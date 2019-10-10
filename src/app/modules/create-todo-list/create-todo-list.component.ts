import { Component, OnInit, Injector, Input } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { AbstractFormComponent } from 'src/app/model/component/abstract-form-component';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';

@Component({
  selector: 'app-create-todo-list',
  templateUrl: './create-todo-list.component.html',
  styleUrls: ['./create-todo-list.component.css']
})
export class CreateTodoListComponent implements OnInit {

  constructor(protected toDoListService: ToDoListService) {

  }

  name: string;
	detail: string;
	status: boolean;
  todolist : ToDoList;
  ngOnInit() {



  }

  async createToDoList(entity: any) {

    let _todolist : ToDoList = new ToDoList();
    console.log(entity.name , entity.detail);
    _todolist.name = entity.name;
    _todolist.detail = entity.detail;
    _todolist = await this.toDoListService.save(_todolist);
  }

}
