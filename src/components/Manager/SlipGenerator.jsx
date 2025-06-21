import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateSalarySlip } from '../../Utils/SalarySlip';
import { updateEmployee } from '../../redux/employeeSlice';

const SalarySlipGenerator = ({ month }) => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);

  const handleGenerate = (employee) => {
    const newSlip = generateSalarySlip(employee, month);
    const updatedSlips = Array.isArray(employee.slips) ? [...employee.slips] : [];

    // Prevent duplicate slips for the same month
    const alreadyExists = updatedSlips.some((slip) => slip.month === month);
    if (alreadyExists) return;

    dispatch(updateEmployee({
      ...employee,
      slips: [...updatedSlips, newSlip],
    }));
  };

  if (!month) {
    return <p className="text-muted">📅 Please select a month to generate slips.</p>;
  }

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5 className="mb-3">🧾 Generate Salary Slips for <span className="text-primary">{month}</span></h5>

      {employees.length === 0 ? (
        <p className="text-muted">No employees found.</p>
      ) : (
        employees.map((emp) => {
          const hasSlip = Array.isArray(emp.slips) && emp.slips.some((s) => s.month === month);

          return (
            <div
              key={emp.id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <span>{emp.name} ({emp.department})</span>

              {hasSlip ? (
                <span className="badge bg-success">Slip Generated</span>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleGenerate(emp)}
                >
                  Generate Slip
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SalarySlipGenerator;
