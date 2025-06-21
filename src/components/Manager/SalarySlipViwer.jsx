import React from 'react';
import { exportSalarySlipAsCSV, exportSalarySlipAsPDF } from '../../Utils/SalarySlipExport';

const SalarySlipViewer = ({ slip }) => {
  if (!slip) return <p className="text-muted">No salary slip found for the selected employee and month.</p>;

  const { name, department, month, employeeId, breakdown, gross, deductions, net } = slip;

  return (
    <div className="card shadow-sm p-4 mb-4 border-primary">
      <h4 className="text-center mb-3">📜 Monthly Salary Slip</h4>

      <div className="row">
        <div className="col-md-6">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Department:</strong> {department}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <p><strong>Month:</strong> {month}</p>
          <p><strong>Employee ID:</strong> {employeeId}</p>
        </div>
      </div>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Earnings</th>
            <th>Amount (₹)</th>
            <th>Deductions</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Basic Salary</td><td>{breakdown.salary}</td><td>PF</td><td>{breakdown.pf}</td></tr>
          <tr><td>Bonus</td><td>{breakdown.bonus}</td><td>PT</td><td>{breakdown.pt}</td></tr>
          <tr><td>HRA</td><td>{breakdown.hra}</td><td>Tax</td><td>{breakdown.tax}</td></tr>
          <tr><td>DA</td><td>{breakdown.da}</td><td></td><td></td></tr>
          <tr><td>TA</td><td>{breakdown.ta}</td><td></td><td></td></tr>
          <tr className="fw-bold table-info">
            <td>Total Gross</td><td>{gross}</td><td>Total Deductions</td><td>{deductions}</td>
          </tr>
          <tr className="fw-bold table-success">
            <td colSpan="2">Net Pay</td><td colSpan="2">₹{net}</td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-end gap-3 mt-3">
        <button className="btn btn-outline-success" onClick={() => exportSalarySlipAsCSV(slip)}>
          ⬇️ Export CSV
        </button>
        <button className="btn btn-outline-danger" onClick={() => exportSalarySlipAsPDF(slip)}>
          ⬇️ Export PDF
        </button>
      </div>
    </div>
  );
};

export default SalarySlipViewer;
