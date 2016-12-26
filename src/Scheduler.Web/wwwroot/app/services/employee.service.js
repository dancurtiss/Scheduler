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
var EmployeeService = (function () {
    function EmployeeService(http, handleErrorService) {
        this.http = http;
        this.handleErrorService = handleErrorService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.employeesUrl = 'api/employee'; // URL to web api
    }
    EmployeeService.prototype.getEmployees = function (organizationId) {
        var _this = this;
        var url = this.employeesUrl + "/" + organizationId;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeService.prototype.delete = function (id) {
        var _this = this;
        var url = this.employeesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeService.prototype.create = function (organizationId, employee) {
        var _this = this;
        var url = this.employeesUrl + "/" + organizationId;
        return this.http
            .post(url, JSON.stringify(employee), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeService.prototype.update = function (employee) {
        var _this = this;
        var url = this.employeesUrl + "/" + employee.employeeId;
        return this.http
            .put(url, JSON.stringify(employee), { headers: this.headers })
            .toPromise()
            .then(function () { return employee; })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, handle_error_service_1.HandleErrorService])
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map