import { AuthenticationService } from '../services/authentication/authentication.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'imgJwt'
})
export class ImgJwtPipe implements PipeTransform {
  // sanitizer: any;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,

  ) { }

  transform(url): Observable<SafeUrl> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http
      .get(url, { headers: headers, responseType: 'blob' })
      .pipe(
        map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
      );
  }
  // async transform(src: string): Promise<string> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  //   try {
  //     const imageBlob = await this.http.get(src, { headers, responseType: 'blob' }).toPromise();
  //     const reader = new FileReader();
  //     return new Promise((resolve, reject) => {
  //       reader.onloadend = () => resolve(reader.result as string);
  //       reader.readAsDataURL(imageBlob);
  //     });
  //   } catch {
  //     return 'assets/svg/logo_ompplus.svg';
  //   }
  // }

}

// import { Pipe, PipeTransform } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Pipe({
//     name: 'secure'
// })
// export class SecurePipe implements PipeTransform {

//     constructor(
//         private http: HttpClient, 
//         private sanitizer: DomSanitizer) { }

//     transform(url): Observable<SafeUrl> {
//         return this.http
//             .get(url, { responseType: 'blob' })
//             .pipe(
//                 map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)))
//             );
//     }

// }