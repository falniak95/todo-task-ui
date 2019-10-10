import { Observable, of } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Injectable, Injector} from '@angular/core';
import Storage from '../model/framework/constants/storage';
import { catchError, tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { CacheService } from '../service/framework/cache.service';
import { AlertService } from '../service/framework/alert-service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    private tokenPrefix = 'Bearer ';
    protected alertService: AlertService;

    constructor(private injector: Injector, private cacheService: CacheService, private router: Router) {
        this.alertService = injector.get(AlertService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!req.url.includes('/public')) {

        console.log('Coming Token is : ', this.tokenPrefix.concat(this.cacheService.get(Storage.TOKEN)));

        req = req.clone({
              setHeaders: {
                  Authorization: this.tokenPrefix.concat(this.cacheService.get(Storage.TOKEN))
                }
              , withCredentials: true
          });
      }

      console.log('Header is', req.headers.get('Authorization'));
      const params = new HttpParams({encoder: new CustomEncoder(), fromString: req.params.toString().replace('+', '%2B')});
      req = req.clone({params});
      return next.handle(req).pipe(catchError((error, caught) => {
          this.handleError(error);
          return of(error);
      }) as any);
    }

    private handleError(err: HttpErrorResponse) {
        if (err.status === 401) {
            console.log('Unauthorized ' + err.error);
            this.cacheService.remove(Storage.USER);
            this.router.navigate(['/login']);
            return of(err.message);
        } else if (err.status === 400) {
            if (err.error == null) {
                this.alertService.error('400 : Sunucu hatalı istekleri kabul etmiyor');
                throw err;
            } else {
                throw err;
            }
        } else if (err.status === 404) {
            if (err.error == null) {
                this.alertService.error('404 : Servis sunucuda bulunamadı');
                throw err;
            } else {
                throw err;
            }
        } else {
            throw err;
        }
    }
}

class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
      return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
      return encodeURIComponent(value);
    }

    decodeKey(key: string): string {
      return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
      return decodeURIComponent(value);
    }
  }
