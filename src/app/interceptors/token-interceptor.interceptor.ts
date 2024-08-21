import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CustomLoaderService } from '../services/custom-loader/custom-loader.service';
import { CustomAlertService } from '../services/custom-alert/custom-alert.service';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService,
        public customLoader: CustomLoaderService,
        public customAlert: CustomAlertService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let timeToken;
        let tokenexpireIn;
        let reg = /(\/viacep)|(\/auth)|(\/login)+/g;
        let url = request.url;
        let isAuth = reg.test(url);
        let showError = true;
        // console.log(request.url);
        
        if (!(request.url.indexOf("api/v3/construtora/empreendimento/busca-imagens-firebase") > 0)){
            this.customLoader.show();
        }else {
            showError = false;
        }

        this.authService.getTimeToken().then((res) => {
            timeToken = res;
            tokenexpireIn = timeToken - 600000;
            
        
            // Implementing after...
            // if (Date.now() > tokenexpireIn) {
            //     if (!isAuth) {
            //         this.authService.updateToken()
            //             .then((res) => {
            //                 console.log(res);
            //             })
            //             .catch((err) => {
            //                 console.log(err);
            //             })
            //     }
            // }
        })

        return from(this.authService.getToken())
            .pipe(
                switchMap((token) => {
                    // this.customLoader.show();
                    this.customLoader.dismiss();
                    token = token ? token : ''
                    let headers, requestClone
                    if (!isAuth) {
                        headers = request.headers
                            .set('Authorization', 'Bearer ' + token)
                        requestClone = request.clone({
                            headers
                        });
                    }
                    else {
                        this.customLoader.dismiss();
                        requestClone = request.clone();
                    }

                    return next.handle(requestClone)
                        .pipe(
                            // map((event: HttpEvent<any>) => {
                            //     if (event instanceof HttpResponse) {
                            //       console.log('event--->>>', event);
                            //     }
                            //     return event;
                            //   }),
                            catchError(response => {
                                this.customLoader.dismiss();
                                if (response instanceof HttpErrorResponse) {
                                    if (response.status === 403 && showError) {
                                        this.customAlert.alertToken({
                                            title: "Ops! 😔",
                                            message: `${response.error.message ? response.error.message : 'Sessão expirada'}`,
                                            type: "fail",
                                            okFunction: () => {
                                                this.router.navigate([''])
                                            },
                                        })
                                    }
                                }
                                return throwError(response);
                            }),
                            finalize(() => {                                
                                this.customLoader.dismiss();
                            })
                        )

                })
            );
    }
}
