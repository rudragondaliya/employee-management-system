import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../../redux/employeeSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const employeeToEdit = useSelector(state =>
    state.employee.employees.find(emp => emp.id === id)
  );

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    salary: '',
    bonus: '',
    hra: '',
    da: '',
    ta: '',
    pf: '',
    pt: '',
    tax: '',
    tasks: [''],
    chat: [''],
    slips: {}
  });

  useEffect(() => {
    if (isEdit && employeeToEdit) {
      setFormData({
        ...employeeToEdit,
        chat: employeeToEdit.chat.map(msg => msg.message)
      });
    }
  }, [isEdit, employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...formData.tasks];
    updatedTasks[index] = value;
    setFormData(prev => ({ ...prev, tasks: updatedTasks }));
  };

  const handleChatChange = (index, value) => {
    const updatedChats = [...formData.chat];
    updatedChats[index] = value;
    setFormData(prev => ({ ...prev, chat: updatedChats }));
  };

  const addTask = () => setFormData(prev => ({ ...prev, tasks: [...prev.tasks, ''] }));
  const addChat = () => setFormData(prev => ({ ...prev, chat: [...prev.chat, ''] }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = {
      ...formData,
      id: isEdit ? id : uuid(),
      salary: Number(formData.salary),
      bonus: Number(formData.bonus),
      hra: Number(formData.hra),
      da: Number(formData.da),
      ta: Number(formData.ta),
      pf: Number(formData.pf),
      pt: Number(formData.pt),
      tax: Number(formData.tax),
      tasks: formData.tasks.filter(task => task.trim() !== ''),
      chat: formData.chat.filter(msg => msg.trim() !== '').map(msg => ({ message: msg })),
    };

    isEdit
      ? dispatch(updateEmployee(employee))
      : dispatch(addEmployee(employee));

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <div className="row">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Department', name: 'department' },
          { label: 'Salary', name: 'salary' },
          { label: 'Bonus', name: 'bonus' },
          { label: 'HRA', name: 'hra' },
          { label: 'DA', name: 'da' },
          { label: 'TA', name: 'ta' },
          { label: 'PF', name: 'pf' },
          { label: 'PT', name: 'pt' },
          { label: 'Tax', name: 'tax' },
        ].map(({ label, name }) => (
          <div key={name} className="col-md-6 mb-3">
            <label>{label}</label>
            <input
              type={['name', 'department'].includes(name) ? 'text' : 'number'}
              name={name}
              className="form-control"
              value={formData[name]}
              onChange={handleChange}
              required={['name', 'department', 'salary'].includes(name)}
            />
          </div>
        ))}

        <div className="col-12 mb-3">
          <label>Tasks</label>
          {formData.tasks.map((task, i) => (
            <input
              key={i}
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(i, e.target.value)}
              className="form-control mb-2"
              placeholder={`Task ${i + 1}`}
            />
          ))}
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={addTask}>
            + Add Task
          </button>
        </div>

        <div className="col-12 mb-3">
          <label>Chat Messages</label>
          {formData.chat.map((msg, i) => (
            <input
              key={i}
              type="text"
              value={msg}
              onChange={(e) => handleChatChange(i, e.target.value)}
              className="form-control mb-2"
              placeholder={`Message ${i + 1}`}
            />
          ))}
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addChat}>
            + Add Message
          </button>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            {isEdit ? 'Update Employee' : 'Save Employee'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
