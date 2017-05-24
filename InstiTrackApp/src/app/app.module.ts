import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { __platform_browser_private__, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CamerasPage, Safe } from '../pages/cameras/cameras';
import { LoginService } from '../providers/login-service';
import { CameraService } from '../providers/camera-service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CamerasPage,
    Safe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    CamerasPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
   LoginService,
   CameraService, 
   __platform_browser_private__.BROWSER_SANITIZATION_PROVIDERS
  ]
})
export class AppModule {}
