import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/taskSlice';
import DataTable from 'react-data-table-component';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TaskTable = ({ setSelectedTask = () => {}, isManager = false }) => {
  const { tasks } = useSelector(state => state.task);
  const { employees } = useSelector(state => state.employee);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState('');

  // Utility to get employee name by ID
  const getEmployeeName = (id) => {
    const employee = employees.find(e => e.id === id);
    return employee ? employee.name : 'Unknown';
  };

  // Filter tasks by title or employee name
  const filteredTasks = tasks.filter(task => {
    const employeeName = getEmployeeName(task.employeeId).toLowerCase();
    const title = task.title.toLowerCase();
    const query = filterText.toLowerCase();

    return title.includes(query) || employeeName.includes(query);
  });

  // Define columns
  const columns = [
    {
      name: 'Employee',
      selector: row => getEmployeeName(row.employeeId),
      sortable: true,
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      wrap: true,
    },
    {
      name: 'Due Date',
      selector: row => row.dueDate,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge ${row.status === 'completed' ? 'bg-success' : 'bg-secondary'}`}>
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  // Conditionally add Actions column for managers
  if (isManager) {
    columns.push({
      name: 'Actions',
      cell: row => (
        <div className="btn-group">
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => setSelectedTask(row)}
          >
           <FaEdit  size={20}/>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => dispatch(deleteTask(row.id))}
          >
            <MdDelete />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">🗂 Assigned Tasks</h5>
        <input
          type="text"
          className="form-control w-25"
          placeholder="🔍 Search by task or employee"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredTasks}
        pagination
        striped
        responsive
        highlightOnHover
        noDataComponent="🚫 No tasks found."
        dense
      />
    </div>
  );
};

export default TaskTable;
