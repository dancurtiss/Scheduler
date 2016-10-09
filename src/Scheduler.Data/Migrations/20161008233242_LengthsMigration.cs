using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Data.Migrations
{
    public partial class LengthsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "Shifts",
                maxLength: 10,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "EndTime",
                table: "Shifts",
                maxLength: 10,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Schedules",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Positions",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Positions",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Organizations",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Organizations",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ContactPhone",
                table: "Organizations",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ContactName",
                table: "Organizations",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "EmployeeConficts",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                maxLength: 10,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Employees",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Employees",
                maxLength: 50,
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "EmployeeNumber",
                table: "Employees",
                maxLength: 10,
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "Shifts",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EndTime",
                table: "Shifts",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Schedules",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Positions",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Positions",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Organizations",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Organizations",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ContactPhone",
                table: "Organizations",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ContactName",
                table: "Organizations",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Reason",
                table: "EmployeeConficts",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Employees",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Employees",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Employees",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmployeeNumber",
                table: "Employees",
                nullable: true);
        }
    }
}
