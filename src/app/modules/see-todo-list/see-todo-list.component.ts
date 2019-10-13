import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {ListboxModule} from 'primeng/listbox';
import { ToDoItem } from 'src/app/model/entity/todoitem/to-do-item';
import { TodoItemService } from 'src/app/service/todoitem/todo-item.service';
import { AlertService } from 'src/app/service/framework/alert-service';
import EntityUtil from 'src/app/model/framework/utils/entity-util';

@Component({
  selector: 'app-see-todo-list',
  templateUrl: './see-todo-list.component.html',
  styleUrls: ['./see-todo-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`]
})
export class SeeTodoListComponent implements OnInit {

  searchName: string;
  listHeader = 'To Do List(s)';
  selectedToDoList: ToDoList;
  percentOfDone: number;
  closeResult: string;
  todolists: ToDoList[];
  relatedToDoItemList: ToDoItem[];
  selectedListsItems: ToDoItem[];
  selectedItem: ToDoItem;
  isItemChoosed: boolean=false;
  isRelatedStatus: boolean = false;
  isPickedList: boolean = false;
  minDateValue : Date = new Date();
  selectedDate: Date;
  pickedDependency: ToDoItem;
  pickedToDoList: ToDoList;



  constructor(protected todoListService: ToDoListService,
              protected todoItemService: TodoItemService,
              private alertService: AlertService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllLists();
  }

  async getAllLists() {
    this.todolists = await this.todoListService.getAll();
  }
  async getSelectedListsItemList(){
    this.selectedListsItems = await this.todoItemService.searchByRelatedList(this.selectedToDoList);
  }

  openLg(content, entity: any) {
    event.stopPropagation();
    this.selectedToDoList = entity;
    this.fillItemList();
    const modal: NgbModalRef = this.modalService.open(content, { size: 'lg' });
  }

  async fillItemList(){

    this.relatedToDoItemList = await this.todoItemService.searchByRelatedList(this.selectedToDoList);
  }
  async searchToDoList(entity: any) {

    this.listHeader = 'To Do List(s) start with:' + entity.searchName;
    this.todolists = await this.todoListService.searchByName(entity.searchName);

  }

  clearForm() {
    this.searchName = '';
    this.listHeader = 'To Do List(s)';
    this.getAllLists();
  }

  clicked(content, todolist: ToDoList) {
    this.selectedToDoList = todolist;
    this.getSelectedListsItemList();
    this.openLg(content, this.selectedToDoList);
  }

  deleteClicked(todolist: ToDoList) {
    if (confirm('To Do List:' + todolist.name + '  will delete with all items. Are you confirm?') ) {
      console.log('clicked delete');
    }
    event.stopPropagation();

  }

  onItemChanged(event) {
    this.isItemChoosed=true;
    if(event.value!=null){
    this.selectedItem=event.value;
    }else{
      this.isItemChoosed=false;
    }
}

  editClicked(list: ToDoList) {


    event.stopPropagation();
  }

  async setAsCompleted(item: ToDoItem ) {

    let dependedItem : ToDoItem;
    let list : ToDoList = await this.todoListService.findById(item.toDoList.id);
    if(item.status==false){
    if(item.dependencyItem !=null){
      dependedItem = await this.todoItemService.findById(item.dependencyItem.id);
      if(dependedItem.status==false){
          this.alertService.error('Depended Item(' + dependedItem.name + ') is not completed. You cannot set as Completed this item.');
      }
      else{
        item.status=true;
        await this.todoItemService.save(item);
        await this.todoItemService.save(dependedItem);
        await this.todoListService.save(list);
      }
    }
    else{
        item.status=true;
        await this.todoItemService.save(item);
        await this.todoListService.save(list);
    }
  }else{
    this.alertService.warn('Item already set as completed.');
  }


  }
  async editListSave(entity: any){
    let list: ToDoList = await this.todoListService.findById(this.selectedToDoList.id);
    if(this.selectedToDoList.name!=null)
    list.name=this.selectedToDoList.name;
    if(this.selectedToDoList.detail!=null)
    list.detail=this.selectedToDoList.detail;

    this.selectedToDoList = await this.todoListService.save(list);


  }

  async editSaved(entity: any) {

    let item : ToDoItem = await this.todoItemService.findById(this.selectedItem.id);
    let list : ToDoList = await this.todoListService.findById(this.selectedToDoList.id);
    let dependedItem : ToDoItem ;
    item.name = this.selectedItem.name;
    item.detail = this.selectedItem.detail;
    item.toDoList = EntityUtil.toSimple(this.pickedToDoList);
    if(this.selectedDate!=null){
    item.deadline = this.selectedDate;
    }
    if(this.pickedDependency!=null && this.pickedDependency.id==item.id){
      this.alertService.error('Item cannot be depended with own. Dependency Cleared');
      this.pickedDependency=null;
    }
    if(this.pickedDependency!=null && this.pickedDependency.id!=item.id){
      item.dependencyItem=EntityUtil.toSimple(this.pickedDependency);
       dependedItem = await this.todoItemService.findById(this.pickedDependency.id);
      await this.todoItemService.save(dependedItem);
    }
    item = await this.todoItemService.save(item);
    await this.todoListService.save(list);
    if(this.pickedDependency!=null && this.pickedDependency.id!=item.id){
      await this.todoItemService.save(dependedItem);
    }
  }


onDateChange(event) {
  let date = new Date(Date.parse(event));
  this.selectedDate = date;
}
handleChange(e) {
  let isRelatedStatus = e.checked;
}
onChangeDependency(event) {
  this.pickedDependency=event.value;
}

  onChangeToDoList(event) {

  }

}
