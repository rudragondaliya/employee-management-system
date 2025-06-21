// src/Shared/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import profile from '../assets/profile.jpg';

const Header = ({ onToggleSidebar }) => {
  return (
    <>
      {/* Mobile Header */}
      <Navbar bg="white" expand="md" className="d-md-none px-3 shadow-sm">
        <Container fluid>
          <div className="d-flex align-items-center">
            <button className="btn me-2" onClick={onToggleSidebar}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <Navbar.Brand as={Link} to="/">TwitHR</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="mobile-nav" />
          <Navbar.Collapse id="mobile-nav">
            <Nav className="ms-auto text-center">
              <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/employee">Employees</Nav.Link>
              <Nav.Link as={Link} to="/manager-tools">Manager Tools</Nav.Link>
              <Nav.Link as={Link} to="/salary-slip">Salary Slip</Nav.Link>
              <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Desktop Header */}
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
              <div className="fw-bold">Mr Rudra</div>
              <div className="text-muted small">Sr. HR Manager</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
