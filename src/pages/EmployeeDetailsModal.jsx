import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EmployeeDetailsModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Employee Details: {employee.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row g-3">
          <div className="col-md-6">
            <strong>Name:</strong> <span>{employee.name}</span>
          </div>
          <div className="col-md-6">
            <strong>Department:</strong> <span>{employee.department}</span>
          </div>
          <div className="col-md-4">
            <strong>Salary:</strong> ₹{employee.salary}
          </div>
          <div className="col-md-4">
            <strong>Bonus:</strong> ₹{employee.bonus}
          </div>
          <div className="col-md-4">
            <strong>HRA:</strong> ₹{employee.hra}
          </div>
          <div className="col-md-4">
            <strong>DA:</strong> ₹{employee.da}
          </div>
          <div className="col-md-4">
            <strong>TA:</strong> ₹{employee.ta}
          </div>
          <div className="col-md-4">
            <strong>PF:</strong> ₹{employee.pf}
          </div>
          <div className="col-md-6">
            <strong>PT:</strong> ₹{employee.pt}
          </div>
          <div className="col-md-6">
            <strong>Tax:</strong> ₹{employee.tax}
          </div>

          <div className="col-12 mt-3">
            <strong>Tasks:</strong>
            <ul className="list-group mt-1">
              {employee.tasks && employee.tasks.length > 0 ? (
                employee.tasks.map((task, idx) => (
                  <li key={idx} className="list-group-item">{task}</li>
                ))
              ) : (
                <li className="text-muted">No tasks assigned</li>
              )}
            </ul>
          </div>

          <div className="col-12 mt-3">
            <strong>Chat Messages:</strong>
            <ul className="list-group mt-1">
              {employee.chat && employee.chat.length > 0 ? (
                employee.chat.map((msg, idx) => (
                  <li key={idx} className="list-group-item">{msg.message}</li>
                ))
              ) : (
                <li className="text-muted">No chat messages</li>
              )}
            </ul>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeDetailsModal;
