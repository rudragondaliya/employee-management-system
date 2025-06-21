import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importEmployees } from '../../redux/employeeSlice';

const CSVManager = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',');

      const newEmployees = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, key, index) => {
          obj[key.trim()] = values[index]?.trim();
          return obj;
        }, {});
      });

      dispatch(importEmployees(newEmployees));
      alert('✅ Employees imported successfully!');
    };

    reader.readAsText(file);
  };

  const exportToCSV = (data, filename = 'employees.csv') => {
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="card p-4 my-4 shadow">
      <h5>📦 Bulk Upload / Export</h5>

      <div className="mb-3">
        <label className="form-label">Upload Employees (CSV)</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="form-control"
        />
      </div>

      <button
        className="btn btn-success"
        onClick={() => exportToCSV(employees)}
      >
        📤 Export Employees to CSV
      </button>
    </div>
  );
};

export default CSVManager;
