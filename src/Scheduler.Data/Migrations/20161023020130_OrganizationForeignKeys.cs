using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Data.Migrations
{
    public partial class OrganizationForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules");

            migrationBuilder.AddColumn<int>(
                name: "OrganizationId",
                table: "Positions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.DropIndex(
                name: "IX_Schedules_OrganizationId",
                table: "Schedules");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationId",
                table: "Schedules",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_OrganizationId",
                table: "Schedules",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_OrganizationId",
                table: "Positions",
                column: "OrganizationId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Organizations_OrganizationId",
                table: "Positions");

            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Positions_OrganizationId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Positions");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationId",
                table: "Schedules",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Organizations_OrganizationId",
                table: "Schedules",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "OrganizationId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
