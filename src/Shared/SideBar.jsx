import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoMenuOutline } from "react-icons/io5";
import {
  FaUserTie,
  FaUsers,
  FaFileInvoice,
  FaComments,
  FaUserAltSlash
} from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div
      className="text-white p-3 sidebar"
      style={{
        minHeight: "100vh",
        width: "280px",
        backgroundColor: "#6C63FF",
      }}
    >
    
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="m-0">TwitHR</h4>
        <IoMenuOutline size={28} />
      </div>

     
      <ul className="nav flex-column">
        {role === 'manager' && (
          <>
            <li className="nav-item mb-3">
              <Link to="/dashboard" className="btn btn-outline-light w-100 text-start">
                <FaUserTie className="me-2" /> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/employee" className="btn btn-outline-light w-100 text-start">
                <FaUsers className="me-2" /> Employees
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/tools" className="btn btn-outline-light w-100 text-start">
                <GrUserManager className="me-2" /> Manager Tools
              </Link>
            </li>
          </>
        )}

        {role === 'employee' && (
          <li className="nav-item mb-3">
            <Link to="/employee" className="btn btn-outline-light w-100 text-start">
              <FaUserTie className="me-2" /> My Portal
            </Link>
          </li>
        )}

        <li className="nav-item mb-3">
          <Link to="/salary-slip" className="btn btn-outline-light w-100 text-start">
            <FaFileInvoice className="me-2" /> Salary Slip
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/chat" className="btn btn-outline-light w-100 text-start">
            <FaComments className="me-2" /> Chat
          </Link>
        </li>

    
        <li className="nav-item mb-3">
          <button
            className="btn btn-light text-primary w-100 text-start"
            onClick={handleLogout}
          >
            <FaUserAltSlash className="me-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
