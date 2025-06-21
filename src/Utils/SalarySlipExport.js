import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Export as CSV
export const exportSalarySlipAsCSV = (slip) => {
  const data = [{
    Name: slip.name,
    Department: slip.department,
    Month: slip.month,
    ...slip.breakdown,
    Gross: slip.gross,
    Deductions: slip.deductions,
    NetPay: slip.net
  }];

  const headers = Object.keys(data[0]).join(',');
  const values = Object.values(data[0]).join(',');

  const csv = `${headers}\n${values}`;
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${slip.name}_SalarySlip_${slip.month}.csv`;
  link.click();
};

// Export as PDF
export const exportSalarySlipAsPDF = (slip) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Salary Slip - ${slip.month}`, 20, 20);
  doc.setFontSize(12);
  doc.text(`Employee: ${slip.name}`, 20, 30);
  doc.text(`Department: ${slip.department}`, 20, 37);
  doc.text(`Employee ID: ${slip.employeeId}`, 20, 44);

  const rows = [
    ['Basic Salary', slip.breakdown.salary, 'PF', slip.breakdown.pf],
    ['Bonus', slip.breakdown.bonus, 'PT', slip.breakdown.pt],
    ['HRA', slip.breakdown.hra, 'Tax', slip.breakdown.tax],
    ['DA', slip.breakdown.da, '', ''],
    ['TA', slip.breakdown.ta, '', ''],
    ['Total Gross', slip.gross, 'Total Deductions', slip.deductions],
    ['Net Pay', slip.net, '', '']
  ];

  doc.autoTable({
    startY: 50,
    head: [['Earnings', 'Amount (₹)', 'Deductions', 'Amount (₹)']],
    body: rows,
  });

  doc.save(`${slip.name}_SalarySlip_${slip.month}.pdf`);
};
