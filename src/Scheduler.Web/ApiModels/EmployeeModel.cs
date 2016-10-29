using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Web.ApiModels
{
    public class EmployeeListModel
    {
        public List<EmployeeModel> Employees { get; set; }
        public List<PositionModel> AvailablePositions { get; set; }
    }

    public class EmployeeModel
    {
        public EmployeeModel()
        {

        }

        public EmployeeModel(Employee employee)
        {
            EmployeeId = employee.EmployeeId;
            FirstName = employee.FirstName;
            LastName = employee.LastName;
            EmployeeNumber = employee.EmployeeNumber;
            PhoneNumber = employee.PhoneNumber;
            IsActive = employee.IsActive;

            EmployeePositionIds = employee.Positions.Select(ep => ep.Position.PositionId).ToList();
        }

        public int EmployeeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(10)]
        public string EmployeeNumber { get; set; }

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; }

        public bool IsActive { get; set; }

        public List<int> EmployeePositionIds { get; set; }

        public Employee Export()
        {
            return Export(new Employee());
        }

        public Employee Export(Employee employee)
        {
            employee.FirstName = this.FirstName;
            employee.LastName = this.LastName;
            employee.EmployeeNumber = this.EmployeeNumber;
            employee.PhoneNumber = this.PhoneNumber;
            employee.IsActive = this.IsActive;

            return employee;
        }

    }
}
