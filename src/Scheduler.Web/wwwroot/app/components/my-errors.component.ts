import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-errors',
    template: `
        <div class="row" *ngIf="errors && errors.length > 0">
            <div class="col-xs-12 errors">
                <ul>
                    <li *ngFor="let error of errors">{{error}}</li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .errors{
            color: darkred;
            background-color: #f2dede;
            border: 2px solid darkred;
            margin: 5px;
        }

        .errors ul {
            margin: 5px;
        }
`],
})
export class MyErrorsComponent {
    @Input()
    errors: string[];
}