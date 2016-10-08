using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Scheduler.Data;

namespace Scheduler.Data.Migrations
{
    [DbContext(typeof(SchedulerContext))]
    partial class SchedulerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Scheduler.Data.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EmployeeNumber");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<int?>("OrganizationId");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("EmployeeId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeeConflict", b =>
                {
                    b.Property<int>("EmployeeConflictId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ConflictEnd");

                    b.Property<DateTime>("ConflictStart");

                    b.Property<int?>("EmployeeId");

                    b.Property<string>("Reason");

                    b.HasKey("EmployeeConflictId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeConficts");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeePosition", b =>
                {
                    b.Property<int>("EmployeePositionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeId");

                    b.Property<int?>("PositionId");

                    b.HasKey("EmployeePositionId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PositionId");

                    b.ToTable("EmployeePositions");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeeShift", b =>
                {
                    b.Property<int>("EmployeeShiftId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("AdjustedEndTime");

                    b.Property<DateTime>("AdjustedStartTime");

                    b.Property<int>("ConfirmationNumber");

                    b.Property<int?>("EmployeeId");

                    b.Property<DateTime>("ShiftEndTime");

                    b.Property<int?>("ShiftId");

                    b.Property<DateTime>("ShiftStartTime");

                    b.HasKey("EmployeeShiftId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ShiftId");

                    b.ToTable("EmployeeShifts");
                });

            modelBuilder.Entity("Scheduler.Data.Organization", b =>
                {
                    b.Property<int>("OrganizationId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContactName");

                    b.Property<string>("ContactPhone");

                    b.Property<string>("Message");

                    b.Property<string>("Name");

                    b.HasKey("OrganizationId");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("Scheduler.Data.Position", b =>
                {
                    b.Property<int>("PositionId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("Name");

                    b.HasKey("PositionId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("Scheduler.Data.Schedule", b =>
                {
                    b.Property<int>("ScheduleId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int?>("OrganizationId");

                    b.HasKey("ScheduleId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Schedules");
                });

            modelBuilder.Entity("Scheduler.Data.Shift", b =>
                {
                    b.Property<int>("ShiftId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EndTime");

                    b.Property<int?>("PositionId");

                    b.Property<int?>("ScheduleId");

                    b.Property<string>("StartTime");

                    b.HasKey("ShiftId");

                    b.HasIndex("PositionId");

                    b.HasIndex("ScheduleId");

                    b.ToTable("Shifts");
                });

            modelBuilder.Entity("Scheduler.Data.Employee", b =>
                {
                    b.HasOne("Scheduler.Data.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeeConflict", b =>
                {
                    b.HasOne("Scheduler.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeePosition", b =>
                {
                    b.HasOne("Scheduler.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");

                    b.HasOne("Scheduler.Data.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeeShift", b =>
                {
                    b.HasOne("Scheduler.Data.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");

                    b.HasOne("Scheduler.Data.Shift", "Shift")
                        .WithMany()
                        .HasForeignKey("ShiftId");
                });

            modelBuilder.Entity("Scheduler.Data.Schedule", b =>
                {
                    b.HasOne("Scheduler.Data.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("Scheduler.Data.Shift", b =>
                {
                    b.HasOne("Scheduler.Data.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId");

                    b.HasOne("Scheduler.Data.Schedule", "Schedule")
                        .WithMany()
                        .HasForeignKey("ScheduleId");
                });
        }
    }
}
