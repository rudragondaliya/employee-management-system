import React, { useState } from "react";
import SideBar from "../Shared/SideBar";
import Header from "../Shared/Header";
import AssignTaskForm from "../components/Manager/AssignTaskForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../redux/employeeSlice";
import TaskTable from "../components/Manager/TaskTable";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { employees } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleExportCSV = () => {
    if (!employees.length) return;

    const allKeys = Object.keys(employees[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [allKeys.join(","), ...employees.map(emp =>
        allKeys.map(key => JSON.stringify(emp[key] ?? "")).join(",")
      )].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "all_employees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className={`sidebar bg-primary text-white ${sidebarVisible ? '' : 'd-none d-md-block'}`}>
        <SideBar />
      </div>

      <div className="main-panel flex-grow-1 overflow-auto">
        <Header onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />

        <div className="container-fluid py-3 px-3">
          {/* Add New Employee Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-primary" onClick={() => navigate("/employee/add")}>
              + Add New Employee
            </button>
          </div>

          {/* Welcome Card */}
          <div className="card shadow-sm mb-4" style={{ backgroundColor: "#6C63FF", color: "#fff" }}>
            <div className="card-body">
              <h5>Hello Mr Rudra!</h5>
              <p>
                Today you have 9 new applications.<br />
                Also you need to hire ROR Developer, React .JS Developer.
              </p>
              <button className="btn btn-warning">Read more</button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row g-3">
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h6>Total Employees</h6>
                  <h3>{employees.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <h6>Salary Slips</h6>
                  <h3>12</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h6>Active Tasks</h6>
                  <h3>10</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white bg-danger">
                <div className="card-body">
                  <h6>Pending Requests</h6>
                  <h3>1</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Assign Task Section */}
          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Manager Actions</h5>
              <button className="btn btn-success" onClick={() => setShowTaskForm(!showTaskForm)}>
                {showTaskForm ? "Hide Task Form" : "Assign Task"}
              </button>
            </div>

            {showTaskForm && (
              <div className="card mt-3 shadow-sm p-3">
                <AssignTaskForm selectedTask={selectedTask} setSelectedTask={setSelectedTask} />
                <TaskTable setSelectedTask={setSelectedTask} isManager={true} />
              </div>
            )}
          </div>

          {/* Employee Table */}
          <div className="card shadow-sm mt-4 p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Employee Records</h5>
              <button className="btn btn-success btn-sm" onClick={handleExportCSV}>
                Export CSV
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No employees found</td>
                    </tr>
                  ) : (
                    employees.map((emp) => (
                      <tr key={emp.id}>
                        <td>{emp.name}</td>
                        <td>{emp.department}</td>
                        <td>{emp.salary}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/employee/edit/${emp.id}`)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger me-2" onClick={() => dispatch(deleteEmployee(emp.id))}>
                            Delete
                          </button>
                          <button className="btn btn-sm btn-info" onClick={() => handleView(emp)}>
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal for Employee Details */}
            {selectedEmployee && (
              <EmployeeDetailsModal
                employee={selectedEmployee}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
