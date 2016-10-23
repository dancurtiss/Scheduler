using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Data.Migrations
{
    public partial class RequireForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeConficts_Employees_EmployeeId",
                table: "EmployeeConficts");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Organizations_OrganizationId",
                table: "Positions");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeConficts",
                table: "EmployeeConficts");

            migrationBuilder.AddColumn<string>(
                name: "CancelReason",
                table: "EmployeeShifts",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Canceled",
                table: "EmployeeShifts",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Employees",
                nullable: false,
                defaultValue: false);

            //

            migrationBuilder.DropIndex(
                name: "IX_Shifts_ScheduleId",
                table: "Shifts");

            migrationBuilder.AlterColumn<int>(
                name: "ScheduleId",
                table: "Shifts",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_ScheduleId",
                table: "Shifts",
                column: "ScheduleId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_Shifts_PositionId",
                table: "Shifts");

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "Shifts",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Shifts_PositionId",
                table: "Shifts",
                column: "PositionId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_EmployeeShifts_ShiftId",
                table: "EmployeeShifts");

            migrationBuilder.AlterColumn<int>(
                name: "ShiftId",
                table: "EmployeeShifts",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeShifts_ShiftId",
                table: "EmployeeShifts",
                column: "ShiftId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_EmployeeShifts_EmployeeId",
                table: "EmployeeShifts");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeShifts",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeShifts_EmployeeId",
                table: "EmployeeShifts",
                column: "EmployeeId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_EmployeePositions_PositionId",
                table: "EmployeePositions");

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "EmployeePositions",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePositions_PositionId",
                table: "EmployeePositions",
                column: "PositionId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_EmployeePositions_EmployeeId",
                table: "EmployeePositions");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeePositions",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePositions_EmployeeId",
                table: "EmployeePositions",
                column: "EmployeeId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_EmployeeConficts_EmployeeId",
                table: "EmployeeConficts");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeConficts",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeConficts_EmployeeId",
                table: "EmployeeConficts",
                column: "EmployeeId");

            //
            //

            migrationBuilder.DropIndex(
                name: "IX_Employees_OrganizationId",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationId",
                table: "Employees",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_OrganizationId",
                table: "Employees",
                column: "OrganizationId");

            //

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeConflicts",
                table: "EmployeeConficts",
                column: "EmployeeConflictId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeConflicts_Employees_EmployeeId",
                table: "EmployeeConficts",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Organizations_OrganizationId",
                table: "Positions",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.RenameIndex(
                name: "IX_EmployeeConficts_EmployeeId",
                table: "EmployeeConficts",
                newName: "IX_EmployeeConflicts_EmployeeId");

            migrationBuilder.RenameTable(
                name: "EmployeeConficts",
                newName: "EmployeeConflicts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeConflicts_Employees_EmployeeId",
                table: "EmployeeConflicts");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Organizations_OrganizationId",
                table: "Positions");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeConflicts",
                table: "EmployeeConflicts");

            migrationBuilder.DropColumn(
                name: "CancelReason",
                table: "EmployeeShifts");

            migrationBuilder.DropColumn(
                name: "Canceled",
                table: "EmployeeShifts");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "ScheduleId",
                table: "Shifts",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "Shifts",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ShiftId",
                table: "EmployeeShifts",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeShifts",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "EmployeePositions",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeePositions",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "EmployeeConflicts",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeConficts",
                table: "EmployeeConflicts",
                column: "EmployeeConflictId");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationId",
                table: "Employees",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeConficts_Employees_EmployeeId",
                table: "EmployeeConflicts",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Organizations_OrganizationId",
                table: "Positions",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.RenameIndex(
                name: "IX_EmployeeConflicts_EmployeeId",
                table: "EmployeeConflicts",
                newName: "IX_EmployeeConficts_EmployeeId");

            migrationBuilder.RenameTable(
                name: "EmployeeConflicts",
                newName: "EmployeeConficts");
        }
    }
}
