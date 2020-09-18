import { Component } from '@angular/core';
import Form from '../../definitions/Form';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
@Injectable()
export class HomePage {

    constructor(private http: HttpClient) { }
    allForms = null;
    route = 'http://6f9297dc42e5.ngrok.io';

    public onClickGet() {
        this.http.get(this.route + '/api/Sync/GetForms').subscribe((data: Form[]) =>
            this.allForms = data
        );
    }

    public onClickClear() {
        this.http.post(this.route + '/api/Sync/ClearForms', null).subscribe();
    }

    public onClickSave(name: string, message: string) {
        if (!this.isEmpty(name) && !this.isEmpty(message)) {
            const form = this.createFormJson(name, message);
            localStorage.setItem("form", JSON.stringify(form));
        }
    }

    public onClickSync() {
        const form = JSON.parse(localStorage.getItem("form"));
        if (!this.isEmpty(form)) {
            this.http.post(this.route + '/api/Sync/SaveForm', form).subscribe();
        }
    }

    private createFormJson(name: string, message: string): Form {
        return {
            "Name": name,
            "Message": message
        };
    }

    private isEmpty(str): boolean {
        return (!str || 0 === str.length);
    }
}
