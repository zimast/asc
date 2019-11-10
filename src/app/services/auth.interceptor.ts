import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('id_token');

        if (idToken) {

            // 'Bearer' ... give access to the bearer of this token
            const cloned = request.clone({
                headers: request.headers.set('Authorization',
                    'Bearer ' + idToken
                )
            });

            return next.handle(cloned);

        } else {
            next.handle(request);
        }
    }

}
