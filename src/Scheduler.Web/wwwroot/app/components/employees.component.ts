import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute, Params }      from '@angular/router';
import { ApplicationUser } from '../models/organization';
import { Employee, EmployeeList, CreateEmployeeAccess } from '../models/employee';
import { Position }             from '../models/schedule';
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
    selectedEmployeeAccess
    showAdd: boolean = false;
    availablePositions: Position[];
    
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
    }

    onSaveEmployee(employeeId: number, name: string, contactName: string, contactPhone: string, message: string): void {
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
        if (this.selectedEmployee.employeeId && this.selectedEmployee.phoneNumber) {
            this.employeeAccessService.create(this.organizationId,
            {
                employeeId: this.selectedEmployee.employeeId,
                password: password,
                phoneNumber: this.selectedEmployee.phoneNumber
            }).then((manager) => {
                this.selectedEmployeeAccess = this.getEmployeeAccess();
            });
        }
    }

    onRemoveEmployeeAccess() {
        this.employeeAccessService.delete(this.selectedEmployee.phoneNumber).then(() => {
            this.selectedEmployeeAccess = null;
        });
    }


    onSelect(employee: Employee): void {
        this.selectedEmployee = employee;
        this.getEmployeeAccess();
    }

    goToDetail(id: number): void {
        this.router.navigate(['employee/detail/', id]);
    }
}
