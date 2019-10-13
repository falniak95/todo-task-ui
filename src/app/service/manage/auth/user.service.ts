import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '../../abstract.service';
import { User } from '../../../model/entity/manage/auth/user';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {

  constructor(protected injector: Injector) {
    super(injector, '/public/user');

  }
  async findById(id: number) {
    let params = new HttpParams();
    params = params.append('id', String(id));
    try {
      return await this.http.get<User>(this.url + '/findById', { params })
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }


/*
  newInstance():User {
    return new User;
  }*/

}

