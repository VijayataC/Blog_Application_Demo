import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';

@Injectable()
export class exceptionInterceptor implements HttpInterceptor  {
  snackBar: any;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      
      catchError((err)=>{ 
        console.log('request err called');
        let userFriendlyMessage = 'An unexpected error occurred. Please try again later.';

        if(err.error instanceof ErrorEvent)
          {
            userFriendlyMessage = `Network Error: ${err.error.message}`;
          }
          else {
            // Server-side error
            switch (err.status) {
              case 400:
                userFriendlyMessage = 'Bad Request. Please check your input.';
                break;
              case 401:
                userFriendlyMessage = 'Unauthorized. Please log in again.';
                break;
              case 403:
                userFriendlyMessage = 'Forbidden. You do not have access.';
                break;
              case 404:
                userFriendlyMessage = 'Resource not found.';
                break;
              case 500:
                userFriendlyMessage = 'Server error. Please try again later.';
                break;
              default:
                userFriendlyMessage = `Unexpected Error: ${err.statusText} (${err.status})`;
                break;
            }
          }
           // Show user-friendly message using Snackbar or any other mechanism
           alert(userFriendlyMessage)
        // this.snackBar.open(userFriendlyMessage, 'Close', {
        //   duration: 5000, // Duration of the message in milliseconds
        // });

        // Re-throw the error so it can be handled by other parts of the app if needed
        return throwError(() => new Error(userFriendlyMessage));
      }),
      finalize(()=>{ console.log('tt');})
       
      
    );
  }
}
