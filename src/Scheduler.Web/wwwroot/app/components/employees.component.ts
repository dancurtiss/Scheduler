import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { ApplicationUser } from '../models/organization';
import { Employee, EmployeeList, CreateEmployeeAccess } from '../models/employee';
import { Position, SelectedPosition }             from '../models/schedule';
import { EmployeeService } from '../services/employee.service';
import { EmployeeAccessService } from '../services/employee-access.service';

@Component({
    moduleId: module.id,
    selector: 'my-employees',
    templateUrl: 'employees.component.html',
    styleUrls: ['employees.component.css']
})
export class EmployeesComponent implements OnInit {

    organizationId: number;
    employees: Employee[];
    selectedEmployee: Employee;
    selectedEmployeePositions: SelectedPosition[];
    selectedEmployeeAccess: ApplicationUser;
    showAdd: boolean = false;
    availablePositions: Position[];

    errors: string[];
    accessErrors: string[];
    
    constructor(
        private employeeService: EmployeeService,
        private employeeAccessService: EmployeeAccessService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    getEmployees(): void {
        this.employeeService.getEmployees(this.organizationId).then((model) => {
            this.employees = model.employees;
            this.availablePositions = model.availablePositions;

            this.employees.forEach((e) => {
                var concatPositions = '';
                this.availablePositions.filter((p) => {
                    return e.employeePositionIds.indexOf(p.positionId) > -1;
                }).forEach((p, i) => {
                    if (i > 0) {
                        concatPositions = concatPositions + ', ';
                    }
                    concatPositions = concatPositions + p.name;
                });
                e.positionsDisplay = concatPositions;
            });
        });
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.organizationId = id;
        });

        this.getEmployees();
    }

    onAddEmployee(): void {
        this.selectedEmployee = { employeeId: 0, firstName: null, lastName: null, employeeNumber: null, phoneNumber: null, isActive: true, employeePositionIds: [] };

        this.selectedEmployeePositions = [];

        this.availablePositions.forEach((p) => {
            this.selectedEmployeePositions.push({ positionId: p.positionId, category: p.category, name: p.name, checked: false });
        });

        this.selectedEmployeeAccess = null;
    }

    selectPosition(position: SelectedPosition) {
        position.checked = position.checked ? false : true;
    }

    onSaveEmployee(employeeId: number, name: string, contactName: string, contactPhone: string, message: string): void {
        this.selectedEmployee.employeePositionIds = this.selectedEmployeePositions.filter((sp) => { return sp.checked; }).map((sp) => { return sp.positionId });

        this.errors = [];
        if (!this.selectedEmployee.firstName) {
            this.errors.push('First Name is required.');
        }
        if (!this.selectedEmployee.lastName) {
            this.errors.push('Last Name is required.');
        }
        if (!this.selectedEmployee.phoneNumber) {
            this.errors.push('Phone Number is required.');
        }
        if (!!this.selectedEmployee.phoneNumber && !/^\d{10}$/.test(this.selectedEmployee.phoneNumber)) {
            this.errors.push('Phone Number is invalid (10 digits).');
        }
        if (!this.selectedEmployee.employeePositionIds.length) {
            this.errors.push('Positions are required.');
        }

        if (this.errors.length > 0) {
            return;
        }


        if (this.selectedEmployee.employeeId) {
            this.employeeService.update(this.selectedEmployee).then((employee) => {
                this.selectedEmployee = null;
                this.getEmployees();
            });
        } else {
            this.employeeService.create(this.organizationId, this.selectedEmployee).then((employee) => {
                this.selectedEmployee = null;
                this.getEmployees();
            });
        }
    }

    onDeleteEmployee(employeeId: number) {
        this.employeeService.delete(employeeId).then(() => {
            this.selectedEmployee = null;
            this.getEmployees();
        });
    }

    getEmployeeAccess() {
        this.employeeAccessService.getEmployeeAccess(this.selectedEmployee.employeeId).then((access) => { this.selectedEmployeeAccess = access;});
    }

    onAddEmployeeAccess(password: string): void {
        this.accessErrors = [];
        if (!password) {
            this.accessErrors.push('Password is required.');
        }
        if (this.accessErrors.length > 0) {
            return;
        }

        if (this.selectedEmployee.employeeId && this.selectedEmployee.phoneNumber) {
            this.employeeAccessService.create(this.organizationId,
            {
                employeeId: this.selectedEmployee.employeeId,
                password: password,
                phoneNumber: this.selectedEmployee.phoneNumber
            }).then((manager) => {
                this.getEmployeeAccess();
            });
        }
    }

    onResetEmployeePassword(password: string): void {
        this.accessErrors = [];
        if (!password) {
            this.accessErrors.push('Password is required.');
        }
        if (this.accessErrors.length > 0) {
            return;
        }

        this.employeeAccessService.setPassword(this.selectedEmployee.phoneNumber, password)
            .then((done) => {
                // password updated
            });
    }

    onRemoveEmployeeAccess() {
        this.employeeAccessService.delete(this.selectedEmployee.phoneNumber).then(() => {
            this.selectedEmployeeAccess = null;
        });
    }


    onSelect(employee: Employee): void {
        this.selectedEmployee = employee;

        this.selectedEmployeePositions = [];

        this.availablePositions.forEach((p) => {
            var selected = this.selectedEmployee.employeePositionIds.indexOf(p.positionId) > -1;
            this.selectedEmployeePositions.push({ positionId: p.positionId, category: p.category, name: p.name, checked: selected });
        });

        this.getEmployeeAccess();
    }

    goToDetail(id: number): void {
        this.router.navigate(['employee/detail/', id]);
    }
}
