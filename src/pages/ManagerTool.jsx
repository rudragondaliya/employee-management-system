import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../Shared/SideBar';
import Header from '../Shared/Header';
import SalarySlipGenerator from '../components/Manager/SlipGenerator';
import CSVManager from '../components/Manager/CsvManager';

const ManagerToolsPage = () => {
  const { employees } = useSelector(state => state.employee);
  const [selectedId, setSelectedId] = useState('');
  const [month, setMonth] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false); 

  const selectedEmployee = employees.find(emp => emp.id === selectedId);
  const slip = selectedEmployee?.slips?.[month];

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>

      <div className={`sidebar bg-primary text-white ${sidebarVisible ? '' : 'd-none d-md-block'}`}>
        <Sidebar />
      </div>

   
      <div className="flex-grow-1" style={{ overflowY: 'auto', height: '100vh' }}>
        <Header />

        <div className="p-4">
          <h2 className="mb-4">🛠 Manager Tools</h2>

          <div className="card p-4 mb-4 shadow-sm">
            <h4 className="mb-3">📑 View Salary Slip</h4>

            <div className="row mb-3">
              <div className="col-md-6">
                <label><strong>Select Employee</strong></label>
                <select
                  className="form-control"
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  <option value="">-- Select Employee --</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label><strong>Select Month</strong></label>
                <input
                  type="month"
                  className="form-control"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>
            </div>

            {selectedEmployee && month ? (
              <SalarySlipGenerator employee={selectedEmployee} month={month} />
            ) : (
              <p className="text-muted">Please select both an employee and a month to view the slip.</p>
            )}
          </div>

          {/* CSV Manager */}
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">📦 CSV Import/Export</h4>
            <CSVManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerToolsPage;
