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
require('rxjs/add/operator/toPromise');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var handle_error_service_1 = require('../services/handle-error.service');
var ShiftService = (function () {
    function ShiftService(http, handleErrorService) {
        this.http = http;
        this.handleErrorService = handleErrorService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.shiftsUrl = 'api/shift'; // URL to web api
    }
    ShiftService.prototype.getShifts = function (scheduleId) {
        var url = this.shiftsUrl + "/" + scheduleId;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleErrorService.handleError);
    };
    ShiftService.prototype.delete = function (id) {
        var url = this.shiftsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleErrorService.handleError);
    };
    ShiftService.prototype.create = function (scheduleId, shift) {
        var url = this.shiftsUrl + "/" + scheduleId;
        return this.http
            .post(url, JSON.stringify(shift), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleErrorService.handleError);
    };
    ShiftService.prototype.update = function (shift) {
        var url = this.shiftsUrl + "/" + shift.shiftId;
        return this.http
            .put(url, JSON.stringify(shift), { headers: this.headers })
            .toPromise()
            .then(function () { return shift; })
            .catch(this.handleErrorService.handleError);
    };
    ShiftService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, handle_error_service_1.HandleErrorService])
    ], ShiftService);
    return ShiftService;
}());
exports.ShiftService = ShiftService;
//# sourceMappingURL=shift.service.js.map