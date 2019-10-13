import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/entity/manage/auth/user';
import { UserService } from 'src/app/service/manage/auth/user.service';
import { CacheService } from 'src/app/service/framework/cache.service';
import Storage from 'src/app/model/framework/constants/storage';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  user: User;
  constructor(protected userService: UserService,
              private cacheService: CacheService) { }

  ngOnInit() {
    this.user = this.cacheService.get(Storage.USER);

  }

  async saveUser(entity: any) {

    let newUser: User = await this.userService.findById(this.user.id);
    console.log('user log ',this.user);
    if(this.user.firstName!=null)
    newUser.firstName= this.user.firstName;
    if(this.user.lastName!=null)
    newUser.lastName= this.user.lastName;
    if(this.user.password!=null)
    newUser.password= this.user.password;
    if(this.user.phoneNo!=null)
    newUser.phoneNo= this.user.phoneNo;
    this.user = await this.userService.save(newUser);

  }

}
