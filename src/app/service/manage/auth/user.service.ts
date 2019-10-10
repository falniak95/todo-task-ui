import { Injectable, Injector } from '@angular/core';
import { AbstractService } from '../../abstract.service';
import { User } from '../../../model/entity/manage/auth/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {

  constructor(protected injector: Injector) {
    super(injector, '/manage/auth/user');

/*
  newInstance():User {
    return new User;
  }*/

}
}
