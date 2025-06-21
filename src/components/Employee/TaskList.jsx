import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markTaskCompleted } from '../../redux/taskSlice';

const TaskList = ({ employeeId }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.task);

  const empTasks = tasks.filter(task => task.employeeId === employeeId);

  return (
    <div>
      <h5 className="mb-3">Your Tasks</h5>
      {empTasks.length === 0 ? (
        <p className="text-muted">No tasks assigned.</p>
      ) : (
        <ul className="list-group">
          {empTasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.title}</strong><br />
                <small>{task.description}</small><br />
                <small>Due: {task.dueDate}</small>
              </div>
              {task.status === 'completed' ? (
                <span className="badge bg-success">Completed</span>
              ) : (
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => dispatch(markTaskCompleted(task.id))}
                >
                  Mark Done
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
