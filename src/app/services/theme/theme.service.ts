import * as Color from 'color';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage'
import { DomSanitizer } from '@angular/platform-browser';

declare var ColorThief: any;

// @Injectable({
//   providedIn: 'root'
// })

export class ThemeService {

  constructor(
    // @Inject(DOCUMENT) private document: Document,
    private storage: Storage,

  ) {

    storage.get('theme').then(cssText => {
      this.setGlobalCSS(cssText);
    });

  }

  getPalette(img: HTMLElement) {
    const colorThief = new ColorThief();
    // console.log(colorThief.getPalette(img, 3))
    if (img["complete"]) {
      return colorThief.getPalette(img, 3);
    } else {
      img.addEventListener('load', function () {
        return colorThief.getPalette(img, 3);
      });
    }
  }

  configTheme(img: HTMLElement) {

    let imgColors = this.getPalette(img)
    // console.log(imgColors)
    this.setTheme({
      primary: Color.rgb(imgColors[0]).hex(),
      secondary: Color.rgb(imgColors[1]).hex(),
      tertiary: Color.rgb(imgColors[2]).hex(),
    })
  }

  public setTheme(theme) {
    //const cssText = this.CSSTextGenerator(theme);
    // this.setGlobalCSS(cssText);
    // this.storage.set('theme', cssText);
  }

  setVariable(name, value) {
    // this.document.documentElement.style.setProperty(name, value);
  }

  private setGlobalCSS(css: string) {
    // this.document.documentElement.style.cssText = css;
  }


  public contrast(color, ratio = 2) {
    color = Color(color);
    return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
  }

  public CSSTextGenerator(colors) {

    const defaults = {
      // primary: '#3880ff',
      // secondary: '#0cd1e8',
      // tertiary: '#7044ff',
      // success: '#10dc60',
      // warning: '#ffce00',
      // danger: '#f04141',
      // dark: '#222428',
      // medium: '#989aa2',
      // light: '#f4f5f8'
    };


    colors = { ...defaults, ...colors };

    const {
      primary,
      secondary,
      tertiary,
    } = colors;

    const shadeRatio = 0.1;
    const tintRatio = 0.1;
    // --ion-color-base: ${primary};
    // --ion-color-contrast: ${secondary};

    return `

      --ion-color-primary: ${primary};
      --ion-color-primary-rgb: 56,128,255;
      --ion-color-primary-contrast: ${this.contrast(primary)};
      --ion-color-primary-contrast-rgb: 255,255,255;
      --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
      --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};
      
      --ion-color-secondary: ${secondary};
      --ion-color-secondary-rgb: 56,128,255;
      --ion-color-secondary-contrast: ${this.contrast(secondary)};
      --ion-color-secondary-contrast-rgb: 255,255,255;
      --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
      --ion-color-secondary-tint:  ${Color(secondary).lighten(tintRatio)};
     
      --ion-color-tertiary: ${tertiary};
      --ion-color-tertiary-rgb: 56,128,255;
      --ion-color-tertiary-contrast: ${this.contrast(tertiary)};
      --ion-color-tertiary-contrast-rgb: 255,255,255;
      --ion-color-tertiary-shade:  ${Color(tertiary).darken(shadeRatio)};
      --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};
            
      `;
  }

  clearTheme() {
    this.storage.remove("id_empresa")
    this.storage.remove("theme")
    // this.document.documentElement.style.cssText = `

    // --ion-color-primary: #00ccff;
    // --ion-color-primary-rgb: 0, 204, 255;
    // --ion-color-primary-contrast: #000000;
    // --ion-color-primary-contrast-rgb: 0, 0, 0;
    // --ion-color-primary-shade: #00b4e0;
    // --ion-color-primary-tint: #1ad1ff;

    // --ion-color-secondary: #007593;
    // --ion-color-secondary-rgb: 0, 117, 147;
    // --ion-color-secondary-contrast: #ffffff;
    // --ion-color-secondary-contrast-rgb: 255, 255, 255;
    // --ion-color-secondary-shade: #006781;
    // --ion-color-secondary-tint: #1a839e;

    // --ion-color-tertiary: #e23d24;
    // --ion-color-tertiary-rgb: 226, 61, 36;
    // --ion-color-tertiary-contrast: #ffffff;
    // --ion-color-tertiary-contrast-rgb: 255, 255, 255;
    // --ion-color-tertiary-shade: #c73620;
    // --ion-color-tertiary-tint: #e5503a;`
  }

  storeLogo(logo) {
    return this.storage.set('logo', logo);
  }
  getLogo() {
    return this.storage.get('logo')
  }
  clearLogo() {
    this.storage.remove('logo');
  }
}



