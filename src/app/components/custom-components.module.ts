import { AgendamentoPage } from './agendamento/agendamento.page';
import { ImageViewerPage } from './image-viewer/image-viewer.page';
import { SecureImagePipe } from './../pipes/secure-image.pipe';
import { ComunicadoPage } from './comunicado/comunicado.page';
import { SettingsPage } from './settings/settings.page';
import { PasswordPage } from './password/password.page';
import { ImgJwtPipe } from './../pipes/img-jwt.pipe';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu/menu.page';
import { LgpdPage } from './lgpd/lgpd.page';
import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { AdicionarVistoriaPage } from './adicionar-vistoria/adicionar-vistoria.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BrMaskerModule,
        PinchZoomModule
    ],
    exports: [
        BrMaskerModule,
        ImageViewerPage,
        MenuPage,
        PasswordPage,
        AgendamentoPage,
        AdicionarVistoriaPage,
        SettingsPage,
        LgpdPage,
        ComunicadoPage,
        SecureImagePipe,
        ImgJwtPipe,
    ],
    declarations: [
        ImageViewerPage,
        MenuPage,
        PasswordPage,
        AgendamentoPage,
        AdicionarVistoriaPage,
        SettingsPage,
        LgpdPage,
        ComunicadoPage,
        SecureImagePipe,
        ImgJwtPipe,
    ],
    providers: [
        SecureImagePipe,
        ImgJwtPipe,
    ],
    entryComponents: [
    ],
})

export class CustomComponentModule { }
