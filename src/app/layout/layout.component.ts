import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/service/manage/auth/login.service";
import { CacheService } from "../service/framework/cache.service";
import Storage from "../model/framework/constants/storage";
import { User } from "../model/entity/manage/auth/user";
import {MenuItem} from 'primeng/api';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']

})
export class LayoutComponent implements OnInit {

  items: MenuItem[];
  user: User;
  screenHeight: number;
  screenWidth: number;

  isCreateList: boolean=false;
  isSeeLists: boolean=false;

  isCreateItem: boolean=false;
  isSeeItems: boolean=false;
  isUserSettings: boolean=false;

  constructor(  private loginService: LoginService,
    private cacheService: CacheService,) { }

  logOut() {
    this.loginService.logOut();
  }

  ngOnInit() {
    this.cacheService.storage_type = this.cacheService.getLocal(Storage.SESSION_TYPE);
    this.user = this.cacheService.get(Storage.USER);
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;


    this.items = [
      {
          label: 'To-Do List',
          icon: 'pi pi-pw pi-file',
          items: [{
                  label: 'Create New To-Do List',
                  icon: 'pi pi-fw pi-calendar-plus',
                  command: (event) => { this.isCreateList=!this.isCreateList; this.isSeeLists=false;this.isSeeLists=false;this.isSeeItems=false;this.isCreateItem=false;this.isUserSettings=false;}
              },
              {label: 'To-Do Lists Detail And Settings',
              icon: 'pi pi-fw pi-list',
              command: (event) => { this.isSeeLists=!this.isSeeLists;this.isCreateList=false;this.isSeeItems=false;this.isCreateItem=false;this.isUserSettings=false;}
            }
          ]
      },
      {
          label: 'To Do Item',
          icon: 'pi pi-fw pi-list',
          items: [
              {label: 'Create New To-Do Item',
              icon: 'pi pi-fw pi-plus-circle',
              command: (event) => { this.isCreateItem=!this.isCreateItem;this.isSeeItems=false;this.isSeeLists=false;this.isCreateList=false;this.isUserSettings=false;}
            },


              {label: 'To-Do Items Detail And Settings',
              icon: 'pi pi-fw pi-list',
              command: (event) => { this.isSeeItems=!this.isSeeItems;this.isCreateItem=false;this.isSeeLists=false;this.isCreateList=false;this.isUserSettings=false;}
            }
          ]
      },  {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'User Settings',
                  icon: 'pi pi-fw pi-user',
                  command: (event) => { this.isUserSettings=!this.isUserSettings;this.isCreateItem=false;this.isSeeLists=false;this.isCreateList=false;this.isSeeItems=false;}
              }
          ]
      }
  ];





  }

}
