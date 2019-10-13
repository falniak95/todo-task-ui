import { Component, OnInit  } from '@angular/core';
import { ToDoItem } from 'src/app/model/entity/todoitem/to-do-item';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TodoItemService } from 'src/app/service/todoitem/todo-item.service';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';
import { DatePipe } from '@angular/common'
import EntityUtil from 'src/app/model/framework/utils/entity-util';
import { AlertService } from 'src/app/service/framework/alert-service';

interface Status {
  name: string;
  value: boolean;
}
interface DeadlineStatus {
  name: string;
  value: string;
}
interface SortType {
  name: string;
  value: string;
}

@Component({
  selector: 'app-see-todo-item',
  templateUrl: './see-todo-item.component.html',
  styleUrls: ['./see-todo-item.component.css'],
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

export class SeeTodoItemComponent implements OnInit {

  searchName: string;
  selectedToDoItem: ToDoItem;
  closeResult: string;
  todoItemList: ToDoItem[];
  todolists: ToDoList[];
  selectedDate: Date;
  relatedToDoItemList: ToDoItem[];
  todoItem: ToDoItem;
  isRelatedStatus: boolean = false;
  isPickedList: boolean = false;
  minDateValue : Date = new Date();
  pickedToDoList: ToDoList;
  pickedDependency: ToDoItem;
  status: Status[] = [{name:'All', value:null},{name:'Completed', value:true},{name:'Uncompleted', value:false}];
  selectedStatus: Status;
  deadlineStatus: DeadlineStatus[] = [{name:'All', value:'all'},{name:'Expired', value:'expired'},{name:'Unexpired', value:'unexpired'}];
  selectedDeadlineStatus: DeadlineStatus;
  selectedStatusName:string;
  selectedDeadlineStatusName: string;
  sortList: SortType[] = [{name:'None', value:'none'},{name:'Name (DESC)', value:'nameDESC'},{name:'Name (ASC)', value:'nameASC'},{name:'Deadline (DESC)', value:'deadlineDESC'},{name:'Deadline (ASC)', value:'deadlineASC'},{name:'Status (DESC)', value:'statusDESC'},{name:'Status (ASC)', value:'statusASC'}];


  constructor(protected todoItemService: TodoItemService,
              protected todoListService: ToDoListService,
              private modalService: NgbModal,
              private alertService: AlertService) { }

  ngOnInit() {
  this.getAllItems();

  }

  async getAllItems() {
    this.todoItemList = await this.todoItemService.getAll();
    this.todolists = await this.todoListService.getAll();

  }

  openLg(content, entity: any) {

    this.selectedToDoItem = entity;
    const modal: NgbModalRef = this.modalService.open(content, { size: 'lg' });
  }
  clearForm() {
    this.searchName = '';
    this.selectedDeadlineStatus = null;
    this.selectedStatus = null;
    this.getAllItemList();
  }
  async getAllItemList() {
    this.todoItemList = await this.todoItemService.getAll();
  }


  clicked(content, todoItem: ToDoItem) {
    this.selectedToDoItem = todoItem;
    this.openLg(content, this.selectedToDoItem);
  }
  async searchToDoItem(entity: any) {

    let nameFilter: string='';
    let statusFilter: string;
    let deadlineFilter: string;
    if(entity.searchName!=null){
      nameFilter=entity.searchName;
    }
    if(this.selectedStatusName=="Completed"){
      statusFilter='t';
    }else if(this.selectedStatusName=="Uncompleted"){
      statusFilter='f';
    }else{
      statusFilter='a';
    }
    if(this.selectedDeadlineStatusName!=null){
      deadlineFilter=this.selectedDeadlineStatusName;
    }else{
      deadlineFilter='a';
    }
    this.todoItemList = [];
    let dtoList: ToDoItem[] =await this.todoItemService.searchByParams(entity.searchName, statusFilter, deadlineFilter);
    dtoList.forEach( async element => {
      this.todoItemList.push(await this.todoItemService.findById(element.id));
    });
  }

  async deleteWithAllDependicies(todoItem : ToDoItem){
    let list : ToDoList = await this.todoListService.findById(todoItem.toDoList.id);
    if(todoItem.dependencyItem != null){
      todoItem.dependencyItem=null;
      todoItem= await this.todoItemService.save(todoItem);
    }

    (await this.todoItemService.searchByDependency(todoItem.id)).forEach(async item => {
      item.dependencyItem=null;
      await this.todoItemService.save(item);

    });
    await this.todoItemService.delete(todoItem);
    await this.todoListService.save(list);
    this.getAllItems();
  }

  async setAsCompleted(item: ToDoItem ) {

    let dependedItem : ToDoItem;
    let list : ToDoList = await this.todoListService.findById(item.toDoList.id);
    console.log('list is',list);
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

  deleteClicked(todoItem: ToDoItem) {
    if (confirm('To Do Item: ' + todoItem.name + '  will delete, dependencies will be deleted as well. Are you confirm?') ) {
        this.deleteWithAllDependicies(todoItem);
    }
    event.stopPropagation();

  }
  completedClicked(todoItem: ToDoItem) {
    if (confirm('To Do Item: ' + todoItem.name + '  will set as Completed, Are you confirm?') ) {
        this.setAsCompleted(todoItem);
    }
    event.stopPropagation();

  }

  async editClicked(content, todoItem: ToDoItem) {
    this.selectedToDoItem = todoItem;
    event.stopPropagation();
    this.todoItemList = await this.todoItemService.getAll();
    this.pickedToDoList = await this.todoListService.findById(todoItem.toDoList.id);
    this.fillItemList();
    this.openLg(content, this.selectedToDoItem);
  }
  onChangeStatusFilter(event) {
    console.log(event);
    this.selectedStatusName=event.value.name;
}

onSortTypeChanged(event) {

  if(event.value.value=='deadlineDESC'){
 this.todoItemList = this.sortDataByDeadline('desc');
}else if(event.value.value=='deadlineASC'){
  this.todoItemList = this.sortDataByDeadline('asc');
 }else if (event.value.value=='statusDESC'){
  this.todoItemList = this.sortDataByStatus('desc');
 } else if (event.value.value=='statusASC'){
  this.todoItemList = this.sortDataByStatus('asc');
 }else if (event.value.value=='nameDESC'){
  this.todoItemList = this.sortDataByName('desc');
 } else if (event.value.value=='nameASC'){
  this.todoItemList = this.sortDataByName('asc');
 }else{
   this.getAllItems();
 }

}

sortDataByName(type: string):ToDoItem[]{

  if(type=='desc')
 return this.todoItemList.sort((_a, _b): number => {
  if(_a.name >  _b.name)return -1;
  else if(_a.name < _b.name) return 1;
  return 0;

});
else{
  return this.todoItemList.sort((_a, _b): number => {
    if(_a.name >  _b.name)return 1;
    else if(_a.name < _b.name) return -1;
    return 0;

  });


}
}
sortDataByDeadline(type: string):ToDoItem[]{

  if(type=='desc')
 return this.todoItemList.sort((_a, _b): number => {
  if(_a.deadline >  _b.deadline)return -1;
  else if(_a.deadline < _b.deadline) return 1;
  return 0;

});
else{
  return this.todoItemList.sort((_a, _b): number => {
    if(_a.deadline >  _b.deadline)return 1;
  else if(_a.deadline < _b.deadline) return 1;
    else if(_a.deadline < _b.deadline) return -1;
    return 0;

  });
}
}
sortDataByStatus(type: string):ToDoItem[]{
  if(type=='desc')
  return this.todoItemList.sort((_a, _b): number => {
   if(_a.status >  _b.status)return -1;
   else if(_a.status < _b.status) return 1;
   return 0;

 });
 else
  return this.todoItemList.sort((_a, _b): number => {
    if(_a.status >  _b.status)return 1;
    else if(_a.status < _b.status) return -1;
    return 0;

  });


 }
 sortByName(type: string):ToDoItem[]{
   if(type=='desc')
  return this.todoItemList.sort((_a, _b): number => {
   if(_a.name >  _b.name)return -1;
   else if(_a.name < _b.name) return 1;
   return 0;

 });
 else
 return this.todoItemList.sort((_a, _b): number => {
  if(_a.name >  _b.name)return 1;
  else if(_a.name < _b.name) return -1;
  return 0;

});
 }
onChangeDeadlineStatus(event) {
  this.selectedDeadlineStatusName=event.value.name;

}
  onChangeToDoList(event) {

}
async fillItemList(){

  this.relatedToDoItemList = await this.todoItemService.searchByRelatedList(this.pickedToDoList);
}

onChangeDependency(event) {
  this.pickedDependency=event.value;
}

onDateChange(event) {
  let date = new Date(Date.parse(event));
  this.selectedDate = date;
}

  handleChange(e) {
    let isRelatedStatus = e.checked;
}

async editSaved(entity: any) {

  let item : ToDoItem = await this.todoItemService.findById(this.selectedToDoItem.id);
  let list : ToDoList = await this.todoListService.findById(this.pickedToDoList.id);
  let dependedItem : ToDoItem ;
  item.name = this.selectedToDoItem.name;
  item.detail = this.selectedToDoItem.detail;
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
  this.getAllItems();

}



}
