import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'secureImage'
})
export class SecureImagePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer,
  ) {

  }

  transform(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
