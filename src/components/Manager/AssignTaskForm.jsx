import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignTask, updateTask } from '../../redux/taskSlice';

const AssignTaskForm = ({ selectedTask, setSelectedTask }) => {
  const dispatch = useDispatch();
  const { employees } = useSelector(state => state.employee);

  const [formData, setFormData] = useState({
    employeeId: '',
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData(selectedTask);
    } else {
      setFormData({
        employeeId: '',
        title: '',
        description: '',
        dueDate: '',
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      dispatch(updateTask(formData));
    } else {
      dispatch(assignTask(formData));
    }
    setFormData({
      employeeId: '',
      title: '',
      description: '',
      dueDate: '',
    });
    setSelectedTask(null);
  };

  return (
    <form className="card p-3 mb-4" onSubmit={handleSubmit}>
      <h5>{selectedTask ? 'Edit Task' : 'Assign Task'}</h5>

      <div className="form-group mb-2">
        <label>Employee</label>
        <select
          name="employeeId"
          className="form-control"
          value={formData.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <input
        className="form-control mb-2"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        className="form-control mb-2"
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        className="form-control mb-2"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <button className="btn btn-primary my-2" type="submit">
        {selectedTask ? 'Update' : 'Assign'}
      </button>

      {selectedTask && (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => setSelectedTask(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default AssignTaskForm;
