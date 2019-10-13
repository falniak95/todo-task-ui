import { Injectable, Injector } from '@angular/core';
import { ToDoItem } from 'src/app/model/entity/todoitem/to-do-item';
import { AbstractService } from '../abstract.service';
import { HttpParams } from '@angular/common/http';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService extends AbstractService<ToDoItem> {

  constructor(protected injector: Injector) {
    super(injector, '/todo/item');

  }
  async findById(id: number) {
    let params = new HttpParams();
    params = params.append('id', String(id));
    try {
      return await this.http
        .get<ToDoItem>(this.url + '/findById', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async searchByDependency(entityId: number) {
    let params = new HttpParams();
    params = params.append('entityId', String(entityId));
    try {
      return await this.http
        .get<ToDoItem[]>(this.url + '/searchByDependency', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }
  async searchByRelatedList(list: ToDoList) {
    let params = new HttpParams();
    params = params.append('id', String(list.id));
    try {
      return await this.http
        .get<ToDoItem[]>(this.url + '/searchByToDoList', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }

  }
  async searchByParams(name: string,status: string, deadlineStatus: string) {
    let params = new HttpParams();
    params = params.append('itemName', String(name));
    params = params.append('status', String(status));
    params = params.append('deadlineStatus', String(deadlineStatus));
    try {
      return await this.http
        .get<ToDoItem[]>(this.url + '/searchByParams', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async searchByName(name: string) {
    let params = new HttpParams();
    params = params.append('itemName', String(name));
    try {
      return await this.http
        .get<ToDoItem[]>(this.url + '/searchByName', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

}
