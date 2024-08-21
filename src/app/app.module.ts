
import { AuthenticationService } from './services/authentication/authentication.service';
import { PreviousRouteService } from './services/previous-route/previous-route.service';
import { CustomLoaderService } from './services/custom-loader/custom-loader.service';
import { CustomAlertService } from './services/custom-alert/custom-alert.service';
import { TokenInterceptor } from './interceptors/token-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentosService } from './services/documentos/documentos.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { EnquetesService } from './services/enquetes/enquetes.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import localeExtraPT from '@angular/common/locales/extra/pt';
import { UtilService } from './services/util/util.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MenuService } from './services/menu/menu.service';
import { environment } from 'src/environments/environment';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppRoutingModule } from './app-routing.module';
import { CodePush } from '@ionic-native/code-push/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { Keyboard } from '@ionic-native/keyboard/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import localePT from '@angular/common/locales/pt';
import { Device } from '@ionic-native/device/ngx';
import { AppComponent } from './app.component';
import { File } from '@ionic-native/file/ngx';
import ptbr from '@angular/common/locales/pt';
import { FCM } from '@ionic-native/fcm/ngx';
import { LOCALE_ID } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrMaskerModule } from 'br-mask';

registerLocaleData(localePT, ptbr, localeExtraPT);

// const config: SocketIoConfig = {
//   url: environment.getUrl(), options: { 'path': '/v3/socket.io' }
//   // url: 'https://woserviceapi.brazilsouth.cloudapp.azure.com/', options: {'path':'/v3/socket.io'}
//   // url: 'ws://woserviceapi.brazilsouth.cloudapp.azure.com/', options: {}
//   // url: 'ws://192.168.0.30:3030/', options: {}
// }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    // SocketIoModule.forRoot(config),
    IonicModule.forRoot({
      mode: 'ios',
    }),
    IonicStorageModule.forRoot({
      name: 'construtora-app-storage',
      storeName: 'construtora-app-storage'
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrMaskerModule,
  ],
  providers: [
    AppVersion,
    Device,
    AuthenticationService,
    PreviousRouteService,
    CustomLoaderService,
    CustomAlertService,
    DocumentosService,
    // ScreenOrientation,
    HttpClientModule,
    EnquetesService,
    FingerprintAIO,
    InAppBrowser,
    SplashScreen,
    MenuService,
    FileChooser,
    UtilService,
    FileOpener,
    Diagnostic,
    Clipboard,
    StatusBar,
    CodePush,
    // Keyboard,
    AppRate,
    Camera,
    File,
    FCM,
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
