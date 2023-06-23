import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticatedDto } from './AuthenticationDto';
import { UserService } from './services/users.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  user: AuthenticatedDto | undefined;
//   alertItem: AlertItem;
  constructor(
    public router: Router,
    private userService: UserService
  ) {
    this.userService.loggedUser.subscribe(res => this.user = res);
    // this.alertItem = new AlertItem();
  }

//   showErrorAlertItem(msj: string): Promise<any> {
//     this.alertItem.type = 'error';
//     this.alertItem.title = 'Error';
//     this.alertItem.timer = 3000;
//     this.alertItem.text = msj;
//     return this.alertItem.Show();
//   }

  errorMethod(error: HttpErrorResponse) {
    if (error.status !== 401) {
      return throwError(error);
    } else if (error.status === 401) {
        this.router.navigate(['/login']);
    }
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let value = this.user ? this.user.token?.value : '';
    if(req.headers.has('token')){
      req.headers.delete('token');
    }
    let modifiedReq = req.clone({
      headers: req.headers.set('token', `${value}`),
    });

    return next.handle(modifiedReq).pipe(catchError(this.errorMethod));
  }
}