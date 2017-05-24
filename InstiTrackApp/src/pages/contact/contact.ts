import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {
    
  }

    logout(){
        this.navCtrl.parent.parent.setRoot(LoginPage);
    }
    
    ionViewDidEnter(){
        this.logout();    
    }
}
