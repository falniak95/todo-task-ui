import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login/login.component';
import { PageNotFoundComponent } from '../app/pages/page-not-found/page-not-found.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { registerLocaleData, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpRequestInterceptor } from './aop/http-request-interceptor';
import { FormsModule } from '../../node_modules/@angular/forms';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {
  TabsModule,
  ModalModule,
  BsDatepickerModule,
  TooltipModule,
  TimepickerModule
} from 'ngx-bootstrap';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CreateTodoListComponent } from './modules/create-todo-list/create-todo-list.component';
import { SeeTodoListComponent } from './modules/see-todo-list/see-todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    PageNotFoundComponent,
    CreateTodoListComponent,
    SeeTodoListComponent,

  ],
  imports: [
    PanelMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    ToastModule,
    ContextMenuModule,
    TabsModule.forRoot(),
    DialogModule,
    SidebarModule,
    ConfirmDialogModule,
    VirtualScrollerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'tr-TR'
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.appStartUp();
  }
  appStartUp() {
    this.overrideJSONtoJson();
  }
  overrideJSONtoJson() {
    Date.prototype.toJSON = function() {
      let timezoneOffsetInHours = -(this.getTimezoneOffset() / 60);

      let correctedDate = new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate(),
        this.getHours(),
        this.getMinutes(),
        this.getSeconds(),
        this.getMilliseconds()
      );
      correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
      let iso = correctedDate.toISOString().replace('Z', '');
      return iso;
    };
  }
 }
