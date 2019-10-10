import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CacheService } from '../../framework/cache.service';
import { LoginResponseModel } from '../../../model/entity/manage/auth/login-response-model';
import Storage from '../../../model/framework/constants/storage';
import AppConfig from 'src/app-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  protected url = AppConfig.url;
  private systemLangCode = 'tr';

  constructor(private http: HttpClient, private router: Router, private cacheService: CacheService) { }

  login(formValue): any {
    return new Promise((resolve) => {
      let params = new HttpParams();
      params = params.append('username', formValue.username);
      params = params.append('password', formValue.password);
      this.http.get<LoginResponseModel>(this.url + '/public/login', { params, withCredentials: true })
        .subscribe(
          resp => {

            this.createSession(resp, formValue.rememberMe);

          },
          (err: HttpErrorResponse) => {
            console.log(err);
            resolve(err.error);
          });
    });
  }

  async createSession(loginResponseModel: LoginResponseModel, rememberMe: boolean) {
    if (rememberMe) {
      this.cacheService.setLocal(Storage.SESSION_TYPE, Storage.LOCALE_STORAGE);
      this.cacheService.storage_type = Storage.LOCALE_STORAGE;
      localStorage.setItem(Storage.TOKEN, JSON.stringify(loginResponseModel.token));
      localStorage.setItem(Storage.USER, JSON.stringify(loginResponseModel.user));
      localStorage.setItem(Storage.SESSION_TYPE, JSON.stringify(Storage.LOCALE_STORAGE));
    } else {
      this.cacheService.setLocal(Storage.SESSION_TYPE, Storage.SESSION_STORAGE);
      this.cacheService.storage_type = Storage.SESSION_STORAGE;
      sessionStorage.setItem(Storage.TOKEN, JSON.stringify(loginResponseModel.token));
      sessionStorage.setItem(Storage.USER, JSON.stringify(loginResponseModel.user));
     }
    window.document.title += ' - ' + loginResponseModel.user.firstName;
    this.router.navigate(['/app']);
  }
  isLoggedIn(): boolean {
    return (localStorage.getItem(Storage.USER) != null || sessionStorage.getItem(Storage.USER) != null);
  }

  async logOut() {
    await this.http.get<any>(this.url + '/public/login/' + this.cacheService.get(Storage.TOKEN)).toPromise().then(resp => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload(true);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload(true);
    });
  }


}
