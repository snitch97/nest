// When your endpoint doesn't return anything after a period of time,
// you want to terminate with an error response.

import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, throwError, timeout, TimeoutError } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            timeout(5000),
            catchError(err => {
                if(err instanceof TimeoutError){
                    //  You can also add custom logic before throwing RequestTimeoutException.
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            })
        )
    }
}