import React, { useState } from 'react';
import Sidebar from '../Shared/SideBar';
import Header from '../Shared/Header';
import EmployeeTable from '../components/Manager/EmployeeTable';
import TaskTable from '../components/Manager/TaskTable';
import TaskList from '../components/Employee/TaskList';
import ChatBox from '../components/Employee/ChatBox';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeePage = () => {
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.auth);
  const [filterMonth, setFilterMonth] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const currentEmployee = employees.find(emp => emp.id === user?.id);

  const handleExportPDF = (slip, empName) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Salary Slip', 14, 20);
    doc.setFontSize(12);
    doc.text(`Employee: ${empName}`, 14, 30);
    doc.text(`Month: ${slip.month}`, 14, 40);
    doc.autoTable({
      startY: 50,
      head: [['Field', 'Amount']],
      body: [
        ['Gross Salary', `₹${slip.gross}`],
        ['Deductions', `₹${slip.deductions}`],
        ['Net Pay', `₹${slip.net}`],
      ],
    });
    doc.save(`${empName}_SalarySlip_${slip.month}.pdf`);
  };

  return (
    <div className="d-flex vh-100">
      <div className={`sidebar bg-primary text-white ${sidebarVisible ? '' : 'd-none d-md-block'}`}>
        <Sidebar />
      </div>
      <div className="main-pannel flex-grow-1">
        <Header />
        <div className="container-fluid p-4">

          {/* 👨‍💼 Employee Table */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Employee List</h3>
          </div>
          <div className="card p-3 shadow-sm mb-4">
            <EmployeeTable />
          </div>

          {/* 📋 Assigned Tasks */}
          <div className="card p-3 shadow-sm mb-4">
            <h5 className="mb-3">Assigned Tasks</h5>
            <TaskTable isManager={false} />
          </div>

          {/* ✅ Task List per Employee */}
          <div className="card p-3 shadow-sm mb-4">
            <h5 className="mb-4">All Employee Task Lists</h5>
            {employees.length === 0 ? (
              <p className="text-muted">No employees found.</p>
            ) : (
              employees.map((emp) => (
                <div key={emp.id} className="mb-4">
                  <h6 className="text-primary">{emp.name} ({emp.email})</h6>
                  <TaskList employeeId={emp.id} />
                  <hr />
                </div>
              ))
            )}
          </div>

          {/* 🧾 Salary Slips */}
          <div className="card p-3 shadow-sm mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Employee Salary Slips</h5>
              <select
                className="form-select w-auto"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="">All Months</option>
                {[...new Set(
                  employees.flatMap((emp) =>
                    Array.isArray(emp.slips) ? emp.slips.map((s) => s.month) : []
                  )
                )].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Employee</th>
                    <th>Month</th>
                    <th>Gross</th>
                    <th>Deductions</th>
                    <th>Net</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.flatMap((emp) =>
                    (Array.isArray(emp.slips) ? emp.slips : [])
                      .filter((s) => !filterMonth || s.month === filterMonth)
                      .map((slip, idx) => (
                        <tr key={`${emp.id}-${idx}`}>
                          <td>{emp.name}</td>
                          <td>{slip.month}</td>
                          <td>₹{slip.gross}</td>
                          <td>₹{slip.deductions}</td>
                          <td>₹{slip.net}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger me-2"
                              onClick={() => handleExportPDF(slip, emp.name)}
                            >
                              View PDF
                            </button>
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => {
                                const blob = new Blob(
                                  [`Name: ${emp.name}\nMonth: ${slip.month}\nGross: ₹${slip.gross}\nDeductions: ₹${slip.deductions}\nNet: ₹${slip.net}`],
                                  { type: 'text/plain' }
                                );
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${emp.name}_Slip_${slip.month}.txt`;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 💬 Chat Section */}
          <div className="card p-3 shadow-sm mb-4">
            <h5 className="mb-3">💬 Chat with Manager</h5>
            <ChatBox employeeId={user.id} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
