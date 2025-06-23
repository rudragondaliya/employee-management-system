import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import profile from '../assets/profile.jpg';

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserRole(storedUser.role); 
      setUserName(storedUser.name); 
    }
  }, []);

  const handleToggle = () => setShowOffcanvas(!showOffcanvas);
  const handleClose = () => setShowOffcanvas(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const getRoleLabel = () => {
    return userRole === 'manager' ? 'Sr. HR Manager' : 'Sr. Employee';
  };

  return (
    <>
    
      <Navbar bg="white" expand="md" className="d-md-none px-3 shadow-sm">
        <Container fluid>
          <div className="d-flex align-items-center">
            <button className="btn me-2" onClick={handleToggle}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <Navbar.Brand as={Link} to="/">TwitHR</Navbar.Brand>
          </div>
        </Container>
      </Navbar>


      <Offcanvas show={showOffcanvas} onHide={handleClose} className="w-75">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TwitHR Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/employee" onClick={handleClose}>Employees</Nav.Link>
            <Nav.Link as={Link} to="/tools" onClick={handleClose}>Manager Tools</Nav.Link>
            <Nav.Link as={Link} to="/salary-slip" onClick={handleClose}>Salary Slip</Nav.Link>
            <Nav.Link as={Link} to="/chat" onClick={handleClose}>Chat</Nav.Link>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-danger mt-1">
              Logout
            </button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-none d-md-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white shadow-sm">
        <h4 className="mb-0 fw-bold">Dashboard</h4>
        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-search fs-5 cursor-pointer"></i>
          <i className="bi bi-envelope fs-5 cursor-pointer"></i>
          <i className="bi bi-bell fs-5 cursor-pointer"></i>
          <div className="d-flex align-items-center">
            <img
              src={profile}
              height={40}
              width={40}
              alt="Profile"
              className="rounded-circle me-2 object-fit-cover"
            />
            <div>
              <div className="fw-bold">{userName || 'User'}</div>
              <div className="text-muted small">{getRoleLabel()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
