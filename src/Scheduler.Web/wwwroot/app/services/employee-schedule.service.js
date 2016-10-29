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
var EmployeeScheduleService = (function () {
    function EmployeeScheduleService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.employeesUrl = 'api/employeeshift'; // URL to web api
    }
    EmployeeScheduleService.prototype.getEmployeeShifts = function (organizationId, date) {
        var url = this.employeesUrl + "/" + organizationId + "?date=" + date;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    EmployeeScheduleService.prototype.delete = function (id) {
        var url = this.employeesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    EmployeeScheduleService.prototype.create = function (organizationId, addShift) {
        var url = this.employeesUrl + "/" + organizationId;
        return this.http
            .post(url, JSON.stringify(addShift), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeScheduleService.prototype.update = function (cancelShift) {
        var url = this.employeesUrl + "/" + cancelShift.employeeShiftId;
        return this.http
            .put(url, JSON.stringify(cancelShift), { headers: this.headers })
            .toPromise()
            .then(function () { return cancelShift; })
            .catch(this.handleError);
    };
    EmployeeScheduleService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    EmployeeScheduleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmployeeScheduleService);
    return EmployeeScheduleService;
}());
exports.EmployeeScheduleService = EmployeeScheduleService;
//# sourceMappingURL=employee-schedule.service.js.map