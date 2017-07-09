using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Data.Migrations
{
    public partial class NullableAdjustedTimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "AdjustedStartTime",
                table: "EmployeeShifts",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "AdjustedEndTime",
                table: "EmployeeShifts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "AdjustedStartTime",
                table: "EmployeeShifts",
                nullable: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "AdjustedEndTime",
                table: "EmployeeShifts",
                nullable: false);
        }
    }
}
