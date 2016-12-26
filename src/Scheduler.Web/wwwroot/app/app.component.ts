import { Component } from '@angular/core';
import { HandleErrorService } from './services/handle-error.service'
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/Observable/TimerObservable';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: []
})
export class AppComponent {

    timerSubscription: Subscription;
    subscription: Subscription;
    applicationError: string;

    constructor(
        private handleErrorService: HandleErrorService
    ) { }

    ngOnInit() {
        this.subscription = this.handleErrorService.applicationError$
            .subscribe(applicationError => {
                this.applicationError = applicationError;

                if (this.timerSubscription) {
                    this.timerSubscription.unsubscribe();
                }
                let timer = TimerObservable.create(10000);
                this.timerSubscription = timer.subscribe(t => {
                    this.applicationError = '';
                });
            })
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
}