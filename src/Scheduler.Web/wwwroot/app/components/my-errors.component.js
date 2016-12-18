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
var MyErrorsComponent = (function () {
    function MyErrorsComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MyErrorsComponent.prototype, "errors", void 0);
    MyErrorsComponent = __decorate([
        core_1.Component({
            selector: 'my-errors',
            template: "\n        <div class=\"row\" *ngIf=\"errors && errors.length > 0\">\n            <div class=\"col-xs-12 errors\">\n                <ul>\n                    <li *ngFor=\"let error of errors\">{{error}}</li>\n                </ul>\n            </div>\n        </div>\n    ",
            styles: ["\n        .errors{\n            color: darkred;\n            background-color: #f2dede;\n            border: 2px solid darkred;\n            margin: 5px;\n        }\n\n        .errors ul {\n            margin: 5px;\n        }\n"],
        }), 
        __metadata('design:paramtypes', [])
    ], MyErrorsComponent);
    return MyErrorsComponent;
}());
exports.MyErrorsComponent = MyErrorsComponent;
//# sourceMappingURL=my-errors.component.js.map