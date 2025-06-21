import React, { useState } from 'react';
import ChatBox from '../components/Employee/ChatBox';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const [selectedEmp, setSelectedEmp] = useState('emp1');
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">💬 Manager Chat Panel</h4>
        <button className="btn btn-outline-secondary" onClick={() => navigate('/dashboard')}>
          🏠 Go to Dashboard
        </button>
      </div>

      {/* Dropdown to select which employee to chat with */}
      <select
        className="form-select mb-3 w-25"
        value={selectedEmp}
        onChange={(e) => setSelectedEmp(e.target.value)}
      >
        <option value="emp1">Employee 1</option>
        <option value="emp2">Employee 2</option>
      </select>

      {/* Chat UI for selected employee */}
      <ChatBox employeeId={selectedEmp} />
    </div>
  );
};

export default ChatPage;
