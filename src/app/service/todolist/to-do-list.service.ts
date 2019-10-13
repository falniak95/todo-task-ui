import { Injectable, Injector } from '@angular/core';
import { ToDoList } from 'src/app/model/entity/todolist/to-do-list';
import { AbstractService } from '../abstract.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService  extends AbstractService<ToDoList> {

  constructor(protected injector: Injector) {
    super(injector, '/todo/list');

  }

  async findById(id: number) {
    let params = new HttpParams();
    params = params.append('id', String(id));
    try {
      return await this.http
        .get<ToDoList>(this.url + '/findById', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }


  async searchByName(name: string) {
    let params = new HttpParams();
    params = params.append('listName', String(name));
    try {
      return await this.http
        .get<ToDoList[]>(this.url + '/searchByName', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

}
