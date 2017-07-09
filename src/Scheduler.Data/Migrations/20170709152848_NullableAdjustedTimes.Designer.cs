using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Scheduler.Data;

namespace Scheduler.Data.Migrations
{
    [DbContext(typeof(SchedulerContext))]
    [Migration("20170709152848_NullableAdjustedTimes")]
    partial class NullableAdjustedTimes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Scheduler.Data.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("EmployeeNumber")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<bool>("IsActive");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<int>("OrganizationId");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

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

                    b.Property<int?>("EmployeeId")
                        .IsRequired();

                    b.Property<string>("Reason")
                        .HasAnnotation("MaxLength", 100);

                    b.HasKey("EmployeeConflictId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeConflicts");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeePosition", b =>
                {
                    b.Property<int>("EmployeePositionId")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeId")
                        .IsRequired();

                    b.Property<int>("PositionId");

                    b.HasKey("EmployeePositionId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PositionId");

                    b.ToTable("EmployeePositions");
                });

            modelBuilder.Entity("Scheduler.Data.EmployeeShift", b =>
                {
                    b.Property<int>("EmployeeShiftId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("AdjustedEndTime");

                    b.Property<DateTime?>("AdjustedStartTime");

                    b.Property<DateTime?>("CancelDate");

                    b.Property<string>("CancelReason");

                    b.Property<bool>("Canceled");

                    b.Property<int>("ConfirmationNumber");

                    b.Property<int?>("EmployeeId")
                        .IsRequired();

                    b.Property<DateTime>("ShiftEndTime");

                    b.Property<int?>("ShiftId")
                        .IsRequired();

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

                    b.Property<string>("ContactName")
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("ContactPhone")
                        .HasAnnotation("MaxLength", 10);

                    b.Property<string>("Message")
                        .HasAnnotation("MaxLength", 2000);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("OrganizationId");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("Scheduler.Data.Position", b =>
                {
                    b.Property<int>("PositionId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category")
                        .HasAnnotation("MaxLength", 50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<int?>("OrganizationId")
                        .IsRequired();

                    b.HasKey("PositionId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("Scheduler.Data.Schedule", b =>
                {
                    b.Property<int>("ScheduleId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<bool>("IsActive");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<int?>("OrganizationId")
                        .IsRequired();

                    b.Property<DateTime>("StartDate");

                    b.HasKey("ScheduleId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Schedules");
                });

            modelBuilder.Entity("Scheduler.Data.Shift", b =>
                {
                    b.Property<int>("ShiftId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Day")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.Property<string>("EndTime")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

                    b.Property<int?>("PositionId")
                        .IsRequired();

                    b.Property<int>("ScheduleId");

                    b.Property<string>("StartTime")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 10);

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
                        .WithMany("Positions")
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

            modelBuilder.Entity("Scheduler.Data.Position", b =>
                {
                    b.HasOne("Scheduler.Data.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId");
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
