import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/service/todoitem/todo-item.service';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoItem } from 'src/app/model/entity/todoitem/to-do-item';



@Component({
  selector: 'app-create-todo-item',
  templateUrl: './create-todo-item.component.html',
  styleUrls: ['./create-todo-item.component.css']
})
export class CreateTodoItemComponent implements OnInit {

  constructor(protected toDoItemService: TodoItemService,
              protected toDoListService: ToDoListService) { }

  name: string;
  detail: string;
  deadline: Date;
  searchText: string;
  todolists: ToDoList[];
  todolist: ToDoList;
  todoitemList: ToDoItem[];
  todoItem: ToDoItem;
  isRelatedStatus: boolean = false;

  ngOnInit() {
    this.fillDropDown();
  }

  async fillDropDown(){

    this.todolists= await this.toDoListService.getAll();
    this.todoitemList= await this.toDoItemService.getAll();
  }
z
  createToDoItem(entity: any){

  }

  handleChange(e) {
    let isRelatedStatus = e.checked;
}


}
