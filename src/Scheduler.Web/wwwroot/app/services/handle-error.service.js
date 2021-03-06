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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var HandleErrorService = (function () {
    function HandleErrorService() {
        // Observable navItem source
        this._applicationError = new BehaviorSubject_1.BehaviorSubject('');
        // Observable navItem stream
        this.applicationError$ = this._applicationError.asObservable();
    }
    HandleErrorService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        var errorbody = error._body ? JSON.parse(error._body) : error;
        var errorString = errorbody.message || error;
        this._applicationError.next(errorString);
        return Promise.reject(errorString);
    };
    return HandleErrorService;
}());
HandleErrorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], HandleErrorService);
exports.HandleErrorService = HandleErrorService;
//# sourceMappingURL=handle-error.service.js.map