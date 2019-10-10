import { GenericEntity } from "../entity/generic-entity";
import { AbstractService } from '../../service/abstract.service';
import { Input, ViewChild, Injector, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CacheService } from "src/app/service/framework/cache.service";
import { AlertService } from "src/app/service/framework/alert-service";
import AppContext from "../framework/app-context";

export abstract class AbstractFormComponent<E extends GenericEntity, S extends AbstractService<E>>
 implements AfterViewInit, AfterViewChecked {

  ngAfterViewInit() {

}

ngAfterViewChecked() {

}


  @Input() id: number;
  @Input() entity: E;


  pageFieldPermissions: object;
  service: S;
  cacheService: CacheService;
  alertService: AlertService;
  isPreparedForm: boolean = false;


  constructor(protected injector: Injector, protected context: string, public title?: string) {
      this.service = this.injector.get(AppContext.get(this.context).service);
      this.cacheService = injector.get(CacheService);
      this.alertService = injector.get(AlertService);
      if (this.title == null) this.title = this.context;
  }

  isSaved() {
      if (this.entity != null && this.entity.id != null) {
          return true;
      }
      return false;
  }



}
