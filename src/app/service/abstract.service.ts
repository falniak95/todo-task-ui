import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Type, Injector } from '@angular/core';
import { SimpleEntity } from '../model/entity/simple-entity';
import { AlertService } from './framework/alert-service';
import { GenericEntity } from '../model/entity/generic-entity';
import { Injectable } from '@angular/core';
import AppConfig from 'src/app-config';

@Injectable({
  providedIn: 'root'
})


export abstract class AbstractService<E extends GenericEntity> {
  seperator = '/';
  message = '';


  protected url = AppConfig.url;
  protected http: HttpClient;
  protected alertService: AlertService;
  protected formType: Type<any>;

  constructor(protected injector: Injector, protected path: string) {
    this.url += path;
    this.http = injector.get(HttpClient);
    this.alertService = injector.get(AlertService);
  }



  async save(entity: E) {
    if (entity.id != null) {
      return this.update(entity);
    } else {
      try {
        const resp = await this.http.post<E>(this.url, entity).toPromise();
        this.alertService.success('Save succesfull');
        return resp;
      } catch (e) {
        this.alertService.error(e.error);
        throw e;
      }
    }
  }

  private async update(entity: E) {
    try {
      const resp = await this.http.put<E>(this.url, entity).toPromise();
      this.alertService.success('Save succesfull');
      return resp;
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async saveAll(entities: E[]) {
    try {
      const resp = await this.http
        .post<E>(this.url + '/saveAll', entities)
        .toPromise();
      this.alertService.success('Save succesfull');
      return resp;
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async delete(entity: E) {
    await this.deleteById(entity.id);
  }

  async deleteAll(entities: E[]) {
    const ids = entities.map(({ id }) => id);
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', String(id));
    });
    try {
      const resp = await this.http
        .delete(this.url + this.seperator + '/deleteAllByIds', { params })
        .toPromise();
      this.alertService.success('Deleted succesfully');
      return resp;
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async deleteAllByIds(ids: number[]) {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', String(id));
    });
    try {
      const resp = await this.http
        .delete(this.url + this.seperator + '/deleteAllByIds/', { params })
        .toPromise();
      this.alertService.success('Deleted succesfully');
      return resp;
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async deleteById(id: number) {
    try {
      const resp = await this.http
        .delete(this.url + this.seperator + id)
        .toPromise();
      this.alertService.success('Deleted succesfully');
      return resp;
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async copy(id: number) {
    try {
      return await this.http
        .get<E>(this.url + '/copy' + this.seperator + id)
        .toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async new() {
    try {
      return await this.http.get<E>(this.url + '/new').toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

  async getAll() {
    try {
      return await this.http.get<E[]>(this.url).toPromise();
    } catch (e) {
      this.alertService.error(e.error);
      throw e;
    }
  }

}
