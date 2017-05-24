import { Component, Pipe, PipeTransform  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { __platform_browser_private__, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { CameraService } from '../../providers/camera-service';


@Pipe({name: 'safe'})
export class Safe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }    
}

@Component({
  selector: 'page-cameras',
  templateUrl: 'cameras.html'
})
export class CamerasPage {
    camList: any[];
    public loader: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public camService: CameraService) {       
        this.camList = this.camService.data;
    }
    
    
    getLink = function(cameraIP){
        return 'http://'+cameraIP+':8080/jsfs.html';
    }
     
}
