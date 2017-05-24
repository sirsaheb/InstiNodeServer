import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app/app.config';

@Injectable()
export class CameraService {
    public data: any[];
    
    constructor(public http: Http) {}
    
    load() {
        this.http.get(AppConfig.camerasURL)
        .map(res => res.json())
        .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            this.data = data;
        });
    }
    
    getCameras(){
        return this.data;    
    }
}
