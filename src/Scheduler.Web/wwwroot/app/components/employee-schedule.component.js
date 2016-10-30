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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
var employee_schedule_service_1 = require('../services/employee-schedule.service');
var moment = require('moment');
/**
 * Need to figure out the UI of picking a schedule for a day... need schema here..
 */
var EmployeeScheduleComponent = (function () {
    function EmployeeScheduleComponent(employeeScheduleService, router, route, dragulaService) {
        this.employeeScheduleService = employeeScheduleService;
        this.router = router;
        this.route = route;
        this.dragulaService = dragulaService;
        this.scheduleDate = new Date();
    }
    EmployeeScheduleComponent.prototype.getSchedule = function () {
        var _this = this;
        var dateString = moment(this.scheduleDate).format('MMDDYYYY');
        this.employeeScheduleService.getEmployeeShifts(this.organizationId, dateString).then(function (model) {
            _this.availableEmployees = model.employees;
            _this.availableShifts = model.shifts;
            _this.employeeShifts = model.employeeShifts;
            _this.setupShiftBags();
        });
    };
    EmployeeScheduleComponent.prototype.setupShiftBags = function () {
        var _this = this;
        this.shiftBags = {};
        this.availableShifts.forEach(function (s) {
            _this.shiftBags[s.shiftId] = [];
        });
    };
    EmployeeScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.organizationId = id;
        });
        this.dragulaSetup();
        this.scheduleDate = new Date();
        this.getSchedule();
    };
    EmployeeScheduleComponent.prototype.remove = function (employeeId, shiftId) {
        var removes = this.shiftBags[shiftId].filter(function (es) {
            return es.employeeId == employeeId;
        });
        var index = this.shiftBags[shiftId].indexOf(removes[0]);
        if (index > -1) {
            this.shiftBags[shiftId].splice(index, 1);
        }
    };
    EmployeeScheduleComponent.prototype.dragulaSetup = function () {
        var _this = this;
        this.dragulaService.setOptions('schedule-bag', {
            removeOnSpill: true,
            copy: true,
            moves: function (el, source, handle, sibling) {
                // only move favorite items, not the icon element
                return el.className.toLowerCase() === 'employee-item';
            },
            accepts: function (el, target, source, sibling) {
                return !el.contains(target); // elements can not be dropped within themselves
            },
            invalid: function (el, handle) {
                return false; // don't prevent any drags from initiating by default
            }
        });
        this.dragulaService.dropModel.subscribe(function (value) {
            console.log('ouch', value);
            _this.onDropModel(value.slice(1));
        });
        this.dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
        this.dragulaService.drag.subscribe(function (value) {
            _this.onDrag(value.slice(1));
        });
        //this.dragulaService.drop.subscribe((value) => {
        //    this.onDrop(value.slice(1));
        //});
        this.dragulaService.over.subscribe(function (value) {
            _this.onOver(value.slice(1));
        });
        this.dragulaService.out.subscribe(function (value) {
            _this.onOut(value.slice(1));
        });
    };
    EmployeeScheduleComponent.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        console.log("dropmodel: " + args);
    };
    EmployeeScheduleComponent.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        console.log("removemodel: " + args);
    };
    EmployeeScheduleComponent.prototype.onDrag = function (args) {
        var e = args[0], el = args[1];
        //console.log(`drag: ${args}`);
    };
    EmployeeScheduleComponent.prototype.onDrop = function (args) {
        var e = args[0], el = args[1];
        //console.log(`drop: ${args}`);
    };
    EmployeeScheduleComponent.prototype.onOver = function (args) {
        var e = args[0], el = args[1], container = args[2];
        //console.log(`over: ${args}`);
    };
    EmployeeScheduleComponent.prototype.onOut = function (args) {
        var e = args[0], el = args[1], container = args[2];
        //console.log(`out: ${args}`);
    };
    //onSaveEmployee(employeeId: number, name: string, contactName: string, contactPhone: string, message: string): void {
    //    if (this.selectedEmployee.employeeId) {
    //        this.employeeService.update(this.selectedEmployee).then((employee) => {
    //            this.selectedEmployee = null;
    //            this.getEmployees();
    //        });
    //    } else {
    //        this.employeeService.create(this.organizationId, this.selectedEmployee).then((employee) => {
    //            this.selectedEmployee = null;
    //            this.getEmployees();
    //        });
    //    }
    //}
    EmployeeScheduleComponent.prototype.onDeleteEmployeeShift = function (employeeShiftId) {
        var _this = this;
        this.employeeScheduleService.delete(employeeShiftId).then(function () {
            _this.getSchedule();
        });
    };
    EmployeeScheduleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-employee-schedules',
            templateUrl: 'employee-schedule.component.html',
            styleUrls: ['employee-schedule.component.css']
        }), 
        __metadata('design:paramtypes', [employee_schedule_service_1.EmployeeScheduleService, router_1.Router, router_1.ActivatedRoute, ng2_dragula_1.DragulaService])
    ], EmployeeScheduleComponent);
    return EmployeeScheduleComponent;
}());
exports.EmployeeScheduleComponent = EmployeeScheduleComponent;
//# sourceMappingURL=employee-schedule.component.js.map