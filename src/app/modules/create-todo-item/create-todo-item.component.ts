import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/service/todoitem/todo-item.service';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoItem } from 'src/app/model/entity/todoitem/to-do-item';
import EntityUtil from 'src/app/model/framework/utils/entity-util';



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
  pickedToDoList: ToDoList;
  pickedDependency: ToDoItem;
  selectedDate: Date;
  todoitemList: ToDoItem[];
  todoItem: ToDoItem;
  isRelatedStatus: boolean = false;
  isPickedList: boolean = false;
  minDateValue : Date = new Date();

  ngOnInit() {
    this.fillDropDown();
  }

  async fillDropDown(){

    this.todolists= await this.toDoListService.getAll();
  }

  async createToDoItem(entity: any){
    let newToDoItem : ToDoItem = new ToDoItem();
    newToDoItem.name = entity.name;
    newToDoItem.detail = entity.detail;
    newToDoItem.deadline = this.selectedDate;
    if(this.isRelatedStatus == true) {

      newToDoItem.dependencyItem = EntityUtil.toSimple(this.pickedDependency);
    }
    newToDoItem.toDoList = EntityUtil.toSimple(this.pickedToDoList);
    newToDoItem = await this.toDoItemService.save(newToDoItem);

    this.name = '';
    this.detail = '';
    this.deadline = null;
    this.pickedToDoList=null;
    this.pickedDependency=null;
    this.isRelatedStatus = false;


  }
  onChangeToDoList(event) {
    this.pickedToDoList=event.value;
    this.isPickedList=true;
    this.fillItemList();
}
async fillItemList(){
  this.todoitemList = await this.toDoItemService.searchByRelatedList(this.pickedToDoList);

}

onChangeDependency(event) {
  this.pickedDependency=event.value;
}

onDateChange(event) {
  let date = new Date(Date.parse(event));
  this.selectedDate=date;
}

  handleChange(e) {
    let isRelatedStatus = e.checked;
}


}
