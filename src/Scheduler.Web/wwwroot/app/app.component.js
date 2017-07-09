"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var handle_error_service_1 = require("./services/handle-error.service");
var TimerObservable_1 = require("rxjs/Observable/TimerObservable");
var AppComponent = (function () {
    function AppComponent(handleErrorService) {
        this.handleErrorService = handleErrorService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.handleErrorService.applicationError$
            .subscribe(function (applicationError) {
            _this.applicationError = applicationError;
            if (_this.timerSubscription) {
                _this.timerSubscription.unsubscribe();
            }
            var timer = TimerObservable_1.TimerObservable.create(10000);
            _this.timerSubscription = timer.subscribe(function (t) {
                _this.applicationError = '';
            });
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: 'app.component.html',
        styleUrls: []
    }),
    __metadata("design:paramtypes", [handle_error_service_1.HandleErrorService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map