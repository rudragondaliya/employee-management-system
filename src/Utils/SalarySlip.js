export const generateSalarySlip = (employee, month) => {
  const gross = 
    employee.salary + 
    employee.bonus + 
    employee.hra + 
    employee.da + 
    employee.ta;

  const deductions = 
    employee.pf + 
    employee.pt + 
    employee.tax;

  const net = gross - deductions;

  return {
    month,
    employeeId: employee.id,
    name: employee.name,
    department: employee.department,
    gross,
    deductions,
    net,
    breakdown: {
      salary: employee.salary,
      bonus: employee.bonus,
      hra: employee.hra,
      da: employee.da,
      ta: employee.ta,
      pf: employee.pf,
      pt: employee.pt,
      tax: employee.tax,
    },
  };
};
