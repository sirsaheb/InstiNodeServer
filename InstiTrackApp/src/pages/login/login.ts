import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { LoginService } from '../../providers/login-service';
import { CameraService } from '../../providers/camera-service';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    public loader: any;
    public authData = {
        usrName:'InstiTrack',
        pwd:'Password'
    }
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public loginService: LoginService, public camService: CameraService, 
    public loadingCtrl: LoadingController,public alertCtrl: AlertController) {}
    
    login(){
        if (this.authData.usrName==='' || this.authData.pwd===''){
            this.showPrompt();
            return;  
        }
        this.loader = this.loadingCtrl.create({
          content: "Authenticating..."
        });
        this.loader.present();
             
        this.loginService.login(this.authData)
        .subscribe(data => {
            if (data.length>0) {
                this.camService.load();
                this.navCtrl.setRoot(TabsPage);
            }
            else{
                //invalid credentials
                this.showPrompt();
            }
            this.loader.dismiss();
        }, error => {
            this.loader.dismiss();
            // do something with error
        });
    }
            
    showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Invalid credentials entered!",
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    prompt.present();
  }
            
}
