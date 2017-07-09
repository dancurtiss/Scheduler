﻿DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeeShifts') AND [c].[name] = N'AdjustedStartTime');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeShifts] DROP CONSTRAINT [' + @var0 + ']');
ALTER TABLE [EmployeeShifts] ALTER COLUMN [AdjustedStartTime] datetime2;

GO

DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'EmployeeShifts') AND [c].[name] = N'AdjustedEndTime');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [EmployeeShifts] DROP CONSTRAINT [' + @var1 + ']');
ALTER TABLE [EmployeeShifts] ALTER COLUMN [AdjustedEndTime] datetime2;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20170709152848_NullableAdjustedTimes', N'1.0.1');

GO

