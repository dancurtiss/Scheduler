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
require("rxjs/add/operator/toPromise");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var handle_error_service_1 = require("../services/handle-error.service");
var EmployeeAccessService = (function () {
    function EmployeeAccessService(http, handleErrorService) {
        this.http = http;
        this.handleErrorService = handleErrorService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.employeesAccessUrl = 'api/employeeaccess'; // URL to web api
    }
    EmployeeAccessService.prototype.getEmployeeAccess = function (employeeId) {
        var _this = this;
        var url = this.employeesAccessUrl + "/" + employeeId;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeAccessService.prototype.delete = function (phone) {
        var _this = this;
        var url = this.employeesAccessUrl + "/" + phone;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeAccessService.prototype.setPassword = function (username, password) {
        var _this = this;
        var url = this.employeesAccessUrl + "/resetpassword/" + username;
        return this.http
            .post(url, JSON.stringify({ password: password }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    EmployeeAccessService.prototype.create = function (organizationId, createEmployeeAccess) {
        var _this = this;
        var url = this.employeesAccessUrl + "/" + organizationId;
        return this.http
            .post(url, JSON.stringify(createEmployeeAccess), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    return EmployeeAccessService;
}());
EmployeeAccessService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, handle_error_service_1.HandleErrorService])
], EmployeeAccessService);
exports.EmployeeAccessService = EmployeeAccessService;
//# sourceMappingURL=employee-access.service.js.map