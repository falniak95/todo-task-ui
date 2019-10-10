import { Injectable } from '@angular/core';
import Storage from 'src/app/model/framework/constants/storage';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  storage_type = null;

  constructor() { }

  get(key: string) {
    if (this.storage_type == Storage.LOCALE_STORAGE) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return JSON.parse(sessionStorage.getItem(key));
    }
  }

  set(key: string, value:any) {
    if (key != null && value != null) {
      if (this.storage_type == Storage.LOCALE_STORAGE) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocal(key: string, value:any) {
    if (key != null && value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key:string) {
    if (key != null) {
      if (this.storage_type == Storage.LOCALE_STORAGE) {
        localStorage.removeItem(key);
      } else {
        sessionStorage.removeItem(key);
      }
    }
  }

}
