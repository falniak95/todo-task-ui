import { Component, OnInit } from '@angular/core';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';

@Component({
  selector: 'app-see-todo-list',
  templateUrl: './see-todo-list.component.html',
  styleUrls: ['./see-todo-list.component.css']
})
export class SeeTodoListComponent implements OnInit {

  todolists: ToDoList[];
  constructor(protected todoListService : ToDoListService) { }

  ngOnInit() {
    this.getAllLists();
  }

  async getAllLists(){
    this.todolists = await this.todoListService.getAll();
  }
}
