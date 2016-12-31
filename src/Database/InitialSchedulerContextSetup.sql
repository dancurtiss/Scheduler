IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Organizations] (
    [OrganizationId] int NOT NULL IDENTITY,
    [ContactName] nvarchar(max),
    [ContactPhone] nvarchar(max),
    [Message] nvarchar(max),
    [Name] nvarchar(max),
    CONSTRAINT [PK_Organizations] PRIMARY KEY ([OrganizationId])
);

GO

CREATE TABLE [Positions] (
    [PositionId] int NOT NULL IDENTITY,
    [Category] nvarchar(max),
    [Name] nvarchar(max),
    CONSTRAINT [PK_Positions] PRIMARY KEY ([PositionId])
);

GO

CREATE TABLE [Employees] (
    [EmployeeId] int NOT NULL IDENTITY,
    [EmployeeNumber] nvarchar(max),
    [FirstName] nvarchar(max),
    [LastName] nvarchar(max),
    [OrganizationId] int,
    [PhoneNumber] nvarchar(max),
    CONSTRAINT [PK_Employees] PRIMARY KEY ([EmployeeId]),
    CONSTRAINT [FK_Employees_Organizations_OrganizationId] FOREIGN KEY ([OrganizationId]) REFERENCES [Organizations] ([OrganizationId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Schedules] (
    [ScheduleId] int NOT NULL IDENTITY,
    [Name] nvarchar(max),
    [OrganizationId] int,
    CONSTRAINT [PK_Schedules] PRIMARY KEY ([ScheduleId]),
    CONSTRAINT [FK_Schedules_Organizations_OrganizationId] FOREIGN KEY ([OrganizationId]) REFERENCES [Organizations] ([OrganizationId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [EmployeeConficts] (
    [EmployeeConflictId] int NOT NULL IDENTITY,
    [ConflictEnd] datetime2 NOT NULL,
    [ConflictStart] datetime2 NOT NULL,
    [EmployeeId] int,
    [Reason] nvarchar(max),
    CONSTRAINT [PK_EmployeeConficts] PRIMARY KEY ([EmployeeConflictId]),
    CONSTRAINT [FK_EmployeeConficts_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [EmployeePositions] (
    [EmployeePositionId] int NOT NULL IDENTITY,
    [EmployeeId] int,
    [PositionId] int,
    CONSTRAINT [PK_EmployeePositions] PRIMARY KEY ([EmployeePositionId]),
    CONSTRAINT [FK_EmployeePositions_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_EmployeePositions_Positions_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Positions] ([PositionId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Shifts] (
    [ShiftId] int NOT NULL IDENTITY,
    [EndTime] nvarchar(max),
    [PositionId] int,
    [ScheduleId] int,
    [StartTime] nvarchar(max),
    CONSTRAINT [PK_Shifts] PRIMARY KEY ([ShiftId]),
    CONSTRAINT [FK_Shifts_Positions_PositionId] FOREIGN KEY ([PositionId]) REFERENCES [Positions] ([PositionId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Shifts_Schedules_ScheduleId] FOREIGN KEY ([ScheduleId]) REFERENCES [Schedules] ([ScheduleId]) ON DELETE NO ACTION
);

GO

CREATE TABLE [EmployeeShifts] (
    [EmployeeShiftId] int NOT NULL IDENTITY,
    [AdjustedEndTime] datetime2 NOT NULL,
    [AdjustedStartTime] datetime2 NOT NULL,
    [ConfirmationNumber] int NOT NULL,
    [EmployeeId] int,
    [ShiftEndTime] datetime2 NOT NULL,
    [ShiftId] int,
    [ShiftStartTime] datetime2 NOT NULL,
    CONSTRAINT [PK_EmployeeShifts] PRIMARY KEY ([EmployeeShiftId]),
    CONSTRAINT [FK_EmployeeShifts_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE NO ACTION,
    CONSTRAINT [FK_EmployeeShifts_Shifts_ShiftId] FOREIGN KEY ([ShiftId]) REFERENCES [Shifts] ([ShiftId]) ON DELETE NO ACTION
);

GO

CREATE INDEX [IX_Employees_OrganizationId] ON [Employees] ([OrganizationId]);

GO

CREATE INDEX [IX_EmployeeConficts_EmployeeId] ON [EmployeeConficts] ([EmployeeId]);

GO

CREATE INDEX [IX_EmployeePositions_EmployeeId] ON [EmployeePositions] ([EmployeeId]);

GO

CREATE INDEX [IX_EmployeePositions_PositionId] ON [EmployeePositions] ([PositionId]);

GO

CREATE INDEX [IX_EmployeeShifts_EmployeeId] ON [EmployeeShifts] ([EmployeeId]);

GO

CREATE INDEX [IX_EmployeeShifts_ShiftId] ON [EmployeeShifts] ([ShiftId]);

GO

CREATE INDEX [IX_Schedules_OrganizationId] ON [Schedules] ([OrganizationId]);

GO

CREATE INDEX [IX_Shifts_PositionId] ON [Shifts] ([PositionId]);

GO

CREATE INDEX [IX_Shifts_ScheduleId] ON [Shifts] ([ScheduleId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161008230136_InitialMigration', N'1.0.1');

GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Shifts') AND [c].[name] = N'StartTime');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Shifts] DROP CONSTRAINT [' + @var0 + ']');
ALTER TABLE [Shifts] ALTER COLUMN [StartTime] nvarchar(10) NOT NULL;

GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Shifts') AND [c].[name] = N'EndTime');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Shifts] DROP CONSTRAINT [' + @var1 + ']');
ALTER TABLE [Shifts] ALTER COLUMN [EndTime] nvarchar(10) NOT NULL;

GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Schedules') AND [c].[name] = N'Name');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Schedules] DROP CONSTRAINT [' + @var2 + ']');
ALTER TABLE [Schedules] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

GO

DECLARE @var3 sysname;
SELECT @var3 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Positions') AND [c].[name] = N'Name');
IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var3 + ']');
ALTER TABLE [Positions] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

GO

DECLARE @var4 sysname;
SELECT @var4 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Positions') AND [c].[name] = N'Category');
IF @var4 IS NOT NULL EXEC(N'ALTER TABLE [Positions] DROP CONSTRAINT [' + @var4 + ']');
ALTER TABLE [Positions] ALTER COLUMN [Category] nvarchar(50);

GO

DECLARE @var5 sysname;
SELECT @var5 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Organizations') AND [c].[name] = N'Name');
IF @var5 IS NOT NULL EXEC(N'ALTER TABLE [Organizations] DROP CONSTRAINT [' + @var5 + ']');
ALTER TABLE [Organizations] ALTER COLUMN [Name] nvarchar(50) NOT NULL;

GO

DECLARE @var6 sysname;
SELECT @var6 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Organizations') AND [c].[name] = N'Message');
IF @var6 IS NOT NULL EXEC(N'ALTER TABLE [Organizations] DROP CONSTRAINT [' + @var6 + ']');
ALTER TABLE [Organizations] ALTER COLUMN [Message] nvarchar(2000);

GO

DECLARE @var7 sysname;
SELECT @var7 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Organizations') AND [c].[name] = N'ContactPhone');
IF @var7 IS NOT NULL EXEC(N'ALTER TABLE [Organizations] DROP CONSTRAINT [' + @var7 + ']');
ALTER TABLE [Organizations] ALTER COLUMN [ContactPhone] nvarchar(10);

GO

DECLARE @var8 sysname;
SELECT @var8 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Organizations') AND [c].[name] = N'ContactName');
IF @var8 IS NOT NULL EXEC(N'ALTER TABLE [Organizations] DROP CONSTRAINT [' + @var8 + ']');
ALTER TABLE [Organizations] ALTER COLUMN [ContactName] nvarchar(100);

GO

DECLARE @var9 sysname;
SELECT @var9 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeeConficts') AND [c].[name] = N'Reason');
IF @var9 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeConficts] DROP CONSTRAINT [' + @var9 + ']');
ALTER TABLE [EmployeeConficts] ALTER COLUMN [Reason] nvarchar(100);

GO

DECLARE @var10 sysname;
SELECT @var10 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Employees') AND [c].[name] = N'PhoneNumber');
IF @var10 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var10 + ']');
ALTER TABLE [Employees] ALTER COLUMN [PhoneNumber] nvarchar(10) NOT NULL;

GO

DECLARE @var11 sysname;
SELECT @var11 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Employees') AND [c].[name] = N'LastName');
IF @var11 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var11 + ']');
ALTER TABLE [Employees] ALTER COLUMN [LastName] nvarchar(50) NOT NULL;

GO

DECLARE @var12 sysname;
SELECT @var12 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Employees') AND [c].[name] = N'FirstName');
IF @var12 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var12 + ']');
ALTER TABLE [Employees] ALTER COLUMN [FirstName] nvarchar(50) NOT NULL;

GO

DECLARE @var13 sysname;
SELECT @var13 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Employees') AND [c].[name] = N'EmployeeNumber');
IF @var13 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var13 + ']');
ALTER TABLE [Employees] ALTER COLUMN [EmployeeNumber] nvarchar(10) NOT NULL;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161008233242_LengthsMigration', N'1.0.1');

GO

ALTER TABLE [Schedules] DROP CONSTRAINT [FK_Schedules_Organizations_OrganizationId];

GO

ALTER TABLE [Positions] ADD [OrganizationId] int NOT NULL DEFAULT 0;

GO

DROP INDEX [IX_Schedules_OrganizationId] ON [Schedules];

GO

DECLARE @var14 sysname;
SELECT @var14 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Schedules') AND [c].[name] = N'OrganizationId');
IF @var14 IS NOT NULL EXEC(N'ALTER TABLE [Schedules] DROP CONSTRAINT [' + @var14 + ']');
ALTER TABLE [Schedules] ALTER COLUMN [OrganizationId] int NOT NULL;

GO

CREATE INDEX [IX_Schedules_OrganizationId] ON [Schedules] ([OrganizationId]);

GO

CREATE INDEX [IX_Positions_OrganizationId] ON [Positions] ([OrganizationId]);

GO

ALTER TABLE [Positions] ADD CONSTRAINT [FK_Positions_Organizations_OrganizationId] FOREIGN KEY ([OrganizationId]) REFERENCES [Organizations] ([OrganizationId]) ON DELETE CASCADE;

GO

ALTER TABLE [Schedules] ADD CONSTRAINT [FK_Schedules_Organizations_OrganizationId] FOREIGN KEY ([OrganizationId]) REFERENCES [Organizations] ([OrganizationId]) ON DELETE CASCADE;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161023020130_OrganizationForeignKeys', N'1.0.1');

GO

ALTER TABLE [EmployeeConficts] DROP CONSTRAINT [FK_EmployeeConficts_Employees_EmployeeId];

GO

ALTER TABLE [Positions] DROP CONSTRAINT [FK_Positions_Organizations_OrganizationId];

GO

ALTER TABLE [Schedules] DROP CONSTRAINT [FK_Schedules_Organizations_OrganizationId];

GO

ALTER TABLE [EmployeeConficts] DROP CONSTRAINT [PK_EmployeeConficts];

GO

ALTER TABLE [EmployeeShifts] ADD [CancelReason] nvarchar(max);

GO

ALTER TABLE [EmployeeShifts] ADD [Canceled] bit NOT NULL DEFAULT 0;

GO

ALTER TABLE [Employees] ADD [IsActive] bit NOT NULL DEFAULT 0;

GO

DROP INDEX [IX_Shifts_ScheduleId] ON [Shifts];

GO

DECLARE @var15 sysname;
SELECT @var15 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Shifts') AND [c].[name] = N'ScheduleId');
IF @var15 IS NOT NULL EXEC(N'ALTER TABLE [Shifts] DROP CONSTRAINT [' + @var15 + ']');
ALTER TABLE [Shifts] ALTER COLUMN [ScheduleId] int NOT NULL;

GO

CREATE INDEX [IX_Shifts_ScheduleId] ON [Shifts] ([ScheduleId]);

GO

DROP INDEX [IX_Shifts_PositionId] ON [Shifts];

GO

DECLARE @var16 sysname;
SELECT @var16 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Shifts') AND [c].[name] = N'PositionId');
IF @var16 IS NOT NULL EXEC(N'ALTER TABLE [Shifts] DROP CONSTRAINT [' + @var16 + ']');
ALTER TABLE [Shifts] ALTER COLUMN [PositionId] int NOT NULL;

GO

CREATE INDEX [IX_Shifts_PositionId] ON [Shifts] ([PositionId]);

GO

DROP INDEX [IX_EmployeeShifts_ShiftId] ON [EmployeeShifts];

GO

DECLARE @var17 sysname;
SELECT @var17 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeeShifts') AND [c].[name] = N'ShiftId');
IF @var17 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeShifts] DROP CONSTRAINT [' + @var17 + ']');
ALTER TABLE [EmployeeShifts] ALTER COLUMN [ShiftId] int NOT NULL;

GO

CREATE INDEX [IX_EmployeeShifts_ShiftId] ON [EmployeeShifts] ([ShiftId]);

GO

DROP INDEX [IX_EmployeeShifts_EmployeeId] ON [EmployeeShifts];

GO

DECLARE @var18 sysname;
SELECT @var18 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeeShifts') AND [c].[name] = N'EmployeeId');
IF @var18 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeShifts] DROP CONSTRAINT [' + @var18 + ']');
ALTER TABLE [EmployeeShifts] ALTER COLUMN [EmployeeId] int NOT NULL;

GO

CREATE INDEX [IX_EmployeeShifts_EmployeeId] ON [EmployeeShifts] ([EmployeeId]);

GO

DROP INDEX [IX_EmployeePositions_PositionId] ON [EmployeePositions];

GO

DECLARE @var19 sysname;
SELECT @var19 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeePositions') AND [c].[name] = N'PositionId');
IF @var19 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var19 + ']');
ALTER TABLE [EmployeePositions] ALTER COLUMN [PositionId] int NOT NULL;

GO

CREATE INDEX [IX_EmployeePositions_PositionId] ON [EmployeePositions] ([PositionId]);

GO

DROP INDEX [IX_EmployeePositions_EmployeeId] ON [EmployeePositions];

GO

DECLARE @var20 sysname;
SELECT @var20 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeePositions') AND [c].[name] = N'EmployeeId');
IF @var20 IS NOT NULL EXEC(N'ALTER TABLE [EmployeePositions] DROP CONSTRAINT [' + @var20 + ']');
ALTER TABLE [EmployeePositions] ALTER COLUMN [EmployeeId] int NOT NULL;

GO

CREATE INDEX [IX_EmployeePositions_EmployeeId] ON [EmployeePositions] ([EmployeeId]);

GO

DROP INDEX [IX_EmployeeConficts_EmployeeId] ON [EmployeeConficts];

GO

DECLARE @var21 sysname;
SELECT @var21 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeeConficts') AND [c].[name] = N'EmployeeId');
IF @var21 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeConficts] DROP CONSTRAINT [' + @var21 + ']');
ALTER TABLE [EmployeeConficts] ALTER COLUMN [EmployeeId] int NOT NULL;

GO

CREATE INDEX [IX_EmployeeConficts_EmployeeId] ON [EmployeeConficts] ([EmployeeId]);

GO

DROP INDEX [IX_Employees_OrganizationId] ON [Employees];

GO

DECLARE @var22 sysname;
SELECT @var22 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'Employees') AND [c].[name] = N'OrganizationId');
IF @var22 IS NOT NULL EXEC(N'ALTER TABLE [Employees] DROP CONSTRAINT [' + @var22 + ']');
ALTER TABLE [Employees] ALTER COLUMN [OrganizationId] int NOT NULL;

GO

CREATE INDEX [IX_Employees_OrganizationId] ON [Employees] ([OrganizationId]);

GO

ALTER TABLE [EmployeeConficts] ADD CONSTRAINT [PK_EmployeeConflicts] PRIMARY KEY ([EmployeeConflictId]);

GO

ALTER TABLE [EmployeeConficts] ADD CONSTRAINT [FK_EmployeeConflicts_Employees_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees] ([EmployeeId]) ON DELETE NO ACTION;

GO

ALTER TABLE [Positions] ADD CONSTRAINT [FK_Positions_Organizations_OrganizationId] FOREIGN KEY ([OrganizationId]) REFERENCES [Organizations] ([OrganizationId]) ON DELETE NO ACTION;

GO

ALTER TABLE [Schedules] ADD CONSTRAINT [FK_Schedules_Organizations_OrganizationId] FOREIGN KEY ([OrganizationId]) REFERENCES [Organizations] ([OrganizationId]) ON DELETE NO ACTION;

GO

EXEC sp_rename N'EmployeeConficts.IX_EmployeeConficts_EmployeeId', N'IX_EmployeeConflicts_EmployeeId', N'INDEX';

GO

EXEC sp_rename N'EmployeeConficts', N'EmployeeConflicts';

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161023190108_RequireForeignKeys', N'1.0.1');

GO

ALTER TABLE [Shifts] ADD [Day] nvarchar(10) NOT NULL DEFAULT N'';

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161029140627_AddShiftDay', N'1.0.1');

GO

ALTER TABLE [Schedules] ADD [EndDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.000';

GO

ALTER TABLE [Schedules] ADD [IsActive] bit NOT NULL DEFAULT 0;

GO

ALTER TABLE [Schedules] ADD [StartDate] datetime2 NOT NULL DEFAULT '0001-01-01T00:00:00.000';

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161029192042_AddScheduleTimeSpan', N'1.0.1');

GO

ALTER TABLE [EmployeeShifts] ADD [CancelDate] datetime2;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20161029232653_AddCancelDate', N'1.0.1');

GO

