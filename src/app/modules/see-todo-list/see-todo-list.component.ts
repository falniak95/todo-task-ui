import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { ToDoListService } from 'src/app/service/todolist/to-do-list.service';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(protected todoListService: ToDoListService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllLists();
  }

  async getAllLists() {
    this.todolists = await this.todoListService.getAll();
  }

  openLg(content, entity: any) {

    this.selectedToDoList = entity;
    const modal: NgbModalRef = this.modalService.open(content, { size: 'lg' });
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
    this.openLg(content, this.selectedToDoList);
  }

  deleteClicked(todolist: ToDoList) {
    if (confirm('To Do List:' + todolist.name + '  will delete with all items. Are you confirm?') ) {
      console.log('clicked delete');
    }



    event.stopPropagation();

  }

  editClicked() {


    event.stopPropagation();
  }

}
