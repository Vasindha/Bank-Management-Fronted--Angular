import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService,private toaster :ToastrService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
  let modifyReq = req;
  

  if (authToken) {
    modifyReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
  }
  return next.handle(modifyReq).pipe(
    catchError((error) => {
      

      if (error.status == 401 && error.error == null) {
        this.toaster.info("Session Expired","Expired!!!")
        this.authService.logOut()
        
      }
      if(error.status == 403 && error.error == null){
        error.error = "You are not Authorized!!!!"
      }
      return throwError(error);
    })
  );
  }

}






