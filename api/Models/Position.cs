using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Position
    {
        
  public  int PositionID {get ;set;}

  public int EmployeeId {get; set;}

  public string JobLevel {get;set;}

  public int AnnualLeaveDays {get;set;}

  public int SickLeaveDays {get;set;}

public Employee Employee {get ; set ;}

    }
}