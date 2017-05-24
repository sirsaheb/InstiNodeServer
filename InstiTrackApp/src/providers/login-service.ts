import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app/app.config';


@Injectable()
export class LoginService {

    constructor(public http: Http) {}
   
    login(authdata){
        var json = JSON.stringify(authdata);
        var params = json;
        var headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        
        return this.http.post(AppConfig.loginURL,
        params, {
            headers: headers
        })
        .map(res => res.json());
    }

}
