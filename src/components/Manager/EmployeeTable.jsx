import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../../redux/employeeSlice';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeeTable = () => {
  const employees = useSelector(state => state.employee.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  // Filter logic
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Department', selector: row => row.department },
    { name: 'Salary', selector: row => row.salary },
    { name: 'Bonus', selector: row => row.bonus },
    { name: 'HRA', selector: row => row.hra },
    { name: 'DA', selector: row => row.da },
    { name: 'TA', selector: row => row.ta },
    { name: 'PF', selector: row => row.pf },
    { name: 'PT', selector: row => row.pt },
    { name: 'Tax', selector: row => row.tax },
    {
      name: 'Tasks',
      selector: row => row.tasks?.join(', '),
      wrap: true,
    },
    {
      name: 'Chat Messages',
      selector: row => row.chat?.map(c => c.message).join(', '),
      wrap: true,
    },
    {
      name: 'Salary Slips',
      selector: row => Object.keys(row.slips || {}).join(', '),
      wrap: true,
    },
    
  ];

  return (
    <div className="card shadow-sm p-3">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search by name or department..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        title="Employee Data"
        columns={columns}
        data={filteredEmployees}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No employee data available."
        dense
      />
    </div>
  );
};

export default EmployeeTable;
