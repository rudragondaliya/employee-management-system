import React from 'react';
import { exportToCSV } from '../../Utils/csvHelper';
import jsPDF from 'jspdf';

const SalarySlipViewer = ({ slip }) => {
  if (!slip) return <p>No slip available</p>;

  const handleExportCSV = () => {
    exportToCSV(
      [{
        Name: slip.name,
        Month: slip.month,
        ...slip.breakdown,
        Gross: slip.gross,
        Deductions: slip.deductions,
        NetPay: slip.net
      }],
      `${slip.name}_SalarySlip_${slip.month}.csv`
    );
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Salary Slip - ${slip.month}`, 20, 20);
    doc.text(`Employee: ${slip.name}`, 20, 30);

    let y = 40;
    for (const [key, val] of Object.entries(slip.breakdown)) {
      doc.text(`${key.toUpperCase()}: ₹${val}`, 20, y);
      y += 10;
    }

    doc.text(`Gross: ₹${slip.gross}`, 20, y);
    doc.text(`Deductions: ₹${slip.deductions}`, 20, y + 10);
    doc.text(`Net Pay: ₹${slip.net}`, 20, y + 20);

    doc.save(`${slip.name}_SalarySlip_${slip.month}.pdf`);
  };

  return (
    <div className="card p-3 mb-3">
      <h5>{slip.name} - {slip.month}</h5>
      <ul className="list-group mb-2">
        {Object.entries(slip.breakdown).map(([key, val]) => (
          <li key={key} className="list-group-item d-flex justify-content-between">
            <span>{key.toUpperCase()}</span>
            <span>₹{val}</span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between mb-2">
        <strong>Gross: ₹{slip.gross}</strong>
        <strong>Deductions: ₹{slip.deductions}</strong>
        <strong>Net Pay: ₹{slip.net}</strong>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-success" onClick={handleExportCSV}>⬇️ CSV</button>
        <button className="btn btn-outline-danger" onClick={handleExportPDF}>⬇️ PDF</button>
      </div>
    </div>
  );
};

export default SalarySlipViewer;
