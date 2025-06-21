import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SalarySlipViewer from '../components/Employee/SlipViwer';
import Header from '../Shared/Header';

const SalarySlipList = () => {
  const { employees } = useSelector((state) => state.employee);
  const [activeSlip, setActiveSlip] = useState(null);

  return (

    <>

    <Header/>

    <div className="container mt-4">
      <h3>📋 All Generated Salary Slips</h3>

      {employees.map((emp) => (
        <div key={emp.id} className="card mb-3 shadow-sm">
          <div className="card-header fw-bold">
            {emp.name} ({emp.department})
          </div>

          <div className="card-body">
            {emp.slips ? (
              Object.entries(emp.slips).map(([month, slip]) => (
                <div
                  key={month}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <div>
                    <strong>Month:</strong> {month} | <strong>Net Pay:</strong> ₹{slip.net}
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setActiveSlip(slip)}
                  >
                    View Slip
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted">No slips generated yet.</p>
            )}
          </div>
        </div>
      ))}

      {activeSlip && (
        <div className="mt-4">
          <h4 className="mb-3">👁️ Viewing Slip: {activeSlip.name} - {activeSlip.month}</h4>
          <SalarySlipViewer slip={activeSlip} />
        </div>
      )}
    </div>
    </>
  );
};


export default SalarySlipList;
