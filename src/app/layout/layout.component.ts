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
                  command: (event) => { this.isCreateList=!this.isCreateList; this.isSeeLists=false;this.isSeeLists=false;this.isSeeItems=false;this.isCreateItem=false;}
              },
              {label: 'To-Do Lists Detail And Settings',
              icon: 'pi pi-fw pi-list',
              command: (event) => { this.isSeeLists=!this.isSeeLists;this.isCreateList=false;this.isSeeItems=false;this.isCreateItem=false;}
            }
          ]
      },
      {
          label: 'To Do Item',
          icon: 'pi pi-fw pi-list',
          items: [
              {label: 'Create New To-Do Item',
              icon: 'pi pi-fw pi-plus-circle',
              command: (event) => { this.isCreateItem=!this.isCreateItem;this.isSeeItems=false;this.isSeeLists=false;this.isCreateList=false;}
            },


              {label: 'To-Do Items Detail And Settings',
              icon: 'pi pi-fw pi-list',
              command: (event) => { this.isSeeItems=!this.isSeeItems;this.isCreateItem=false;this.isSeeLists=false;this.isCreateList=false;}
            }
          ]
      },
      {
          label: 'Help',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents',
                  icon: 'pi pi-pi pi-bars'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-pi pi-search',
                  items: [
                      {
                          label: 'Text',
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'User',
                          icon: 'pi pi-fw pi-file',
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      }
  ];





  }

}
