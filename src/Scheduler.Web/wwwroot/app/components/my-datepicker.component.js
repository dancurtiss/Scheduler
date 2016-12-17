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
var moment = require('moment');
var IsdDatepickerComponent = (function () {
    function IsdDatepickerComponent() {
        this.dateModelChange = new core_1.EventEmitter();
        this.showDatepicker = false;
        this.dateString = null;
    }
    IsdDatepickerComponent.prototype.ngOnInit = function () {
        this.dateString = this.dateModel ? moment(this.dateModel).format('MM/DD/YYYY') : null;
    };
    IsdDatepickerComponent.prototype.showPopup = function () {
        this.showDatepicker = true;
    };
    IsdDatepickerComponent.prototype.toggleCalendar = function () {
        this.showDatepicker = !this.showDatepicker;
    };
    IsdDatepickerComponent.prototype.dateStringChange = function ($event) {
        var setDate = moment($event, 'MM/DD/YYYY');
        if (setDate.isValid()) {
            this.dateString = $event;
            this.dateModel = setDate.toDate();
            this.dateModelChange.emit(this.dateModel);
            this.showDatepicker = false;
        }
    };
    IsdDatepickerComponent.prototype.dateModelChanged = function ($event) {
        this.dateString = this.dateModel ? moment(this.dateModel).format('MM/DD/YYYY') : null;
    };
    IsdDatepickerComponent.prototype.hidePopup = function (event) {
        this.showDatepicker = false;
        this.dateModel = event;
        this.dateModelChange.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], IsdDatepickerComponent.prototype, "dateModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], IsdDatepickerComponent.prototype, "label", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], IsdDatepickerComponent.prototype, "dateModelChange", void 0);
    IsdDatepickerComponent = __decorate([
        core_1.Component({
            selector: 'my-datepicker',
            template: "\n        <div class=\"form-group\">\n            <label>{{label}}</label>\n            <div class=\"input-group col-md-6\">\n                <input type=\"text\" [(ngModel)]=\"dateString\" (ngModelChange)=\"dateStringChange($event)\" class=\"form-control\" (focus)=\"showPopup()\" />\n                <div class=\"input-group-addon\" (click)=\"toggleCalendar()\"><i class=\"fa fa-calendar\"></i></div>\n            </div>\n        </div>\n        <datepicker class=\"popup\" *ngIf=\"showDatepicker\" [(ngModel)]=\"dateModel\" [showWeeks]=\"true\" (ngModelChange)=\"dateModelChanged($event)\" (selectionDone)=\"hidePopup($event)\" ></datepicker>\n  ",
            styles: ["\n    .popup {\n      position: absolute;\n      background-color: #fff;\n      border-radius: 3px;\n      border: 1px solid #ddd;\n      height: 251px;\n      z-index: 99;\n    }\n  "],
        }), 
        __metadata('design:paramtypes', [])
    ], IsdDatepickerComponent);
    return IsdDatepickerComponent;
}());
exports.IsdDatepickerComponent = IsdDatepickerComponent;
//# sourceMappingURL=my-datepicker.component.js.map