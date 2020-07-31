import {Component, OnInit} from '@angular/core';
import smartlookClient from 'smartlook-client'
import {FormControl} from '@angular/forms';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    template: `
        <h1>Performance Showcase Smartlook</h1>
        <label style="display: block">
            Enable Smartlook
            <input type="checkbox" [formControl]="enableFormControl">
        </label>

        <button (click)="rows = []; duration = null">Clear</button>
        <button (click)="generateRows()">Generate</button>
        <div>Duration: {{duration}}ms</div>

        <div>
            <h2>Rows</h2>
            <div *ngFor="let row of rows">
                <app-dummy *ngIf="even(row)">{{row}} (even2)</app-dummy>
                <app-dummy *ngIf="!even(row)">{{row}} (odd)</app-dummy>
            </div>
        </div>
    `,
    styles: []
})
export class AppComponent implements OnInit {

    rows = [];
    duration: number | null = null;

    readonly enableFormControl = new FormControl(false);

    ngOnInit() {
        this.generateRows();
        smartlookClient.init('f6da96c5947b7de535697e0a8dfa0d1759f18bca');
        smartlookClient.consentAPI('Akzeptiert gemäss DSE und Einstellungen im Benutzerprofil');
        smartlookClient.consentForms('Akzeptiert gemäss DSE und Einstellungen im Benutzerprofil');

        this.enableFormControl.valueChanges.pipe(distinctUntilChanged()).subscribe((enabled: boolean) => {
            if (enabled) {
                smartlookClient.resume();
            } else {
                smartlookClient.pause();
            }
        })
    }

    generateRows() {
        const start = Date.now();
        for (let i = 0; i < 1000; i++) {
            this.rows.push(i)
        }
        //measure time after paint:
        setTimeout(() => this.duration = Date.now() - start);
    }

    even(row: number) {
        return (row % 2) === 0;
    }
}
