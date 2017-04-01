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
var ScheduleService = (function () {
    function ScheduleService(http, handleErrorService) {
        this.http = http;
        this.handleErrorService = handleErrorService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.schedulesUrl = 'api/schedule'; // URL to web api
    }
    ScheduleService.prototype.getSchedules = function (organizationId) {
        var _this = this;
        var url = this.schedulesUrl + "/" + organizationId;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    ScheduleService.prototype.delete = function (id) {
        var _this = this;
        var url = this.schedulesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    ScheduleService.prototype.copyScheduleDay = function (scheduleId, sourceDay, targetDay) {
        var _this = this;
        var url = this.schedulesUrl + "/copyscheduleday/" + scheduleId;
        return this.http
            .post(url, JSON.stringify({ sourceDay: sourceDay, targetDay: targetDay }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    ScheduleService.prototype.copySchedule = function (scheduleId, name, startDate, endDate) {
        var _this = this;
        var url = this.schedulesUrl + "/copyschedule/" + scheduleId;
        return this.http
            .post(url, JSON.stringify({ name: name, startDate: startDate, endDate: endDate }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    ScheduleService.prototype.create = function (organizationId, schedule) {
        var _this = this;
        var url = this.schedulesUrl + "/" + organizationId;
        return this.http
            .post(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    ScheduleService.prototype.update = function (schedule) {
        var _this = this;
        var url = this.schedulesUrl + "/" + schedule.scheduleId;
        return this.http
            .put(url, JSON.stringify(schedule), { headers: this.headers })
            .toPromise()
            .then(function () { return schedule; })
            .catch(function (err) { _this.handleErrorService.handleError(err); });
    };
    return ScheduleService;
}());
ScheduleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, handle_error_service_1.HandleErrorService])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map