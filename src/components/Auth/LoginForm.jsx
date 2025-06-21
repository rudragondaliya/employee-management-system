import React, { useState } from "react";
import './LoginForm.css';
import loginImage from '../../assets/admin-login.png';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const LoginForm = () => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const managerCreds = { email: 'manager@gmail.com', password: 'admin123' };
  const employeeCreds = { email: 'employee@gmail.com', password: 'emp123' };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const isManager = role === 'Manager' && email.toLowerCase() === managerCreds.email && password === managerCreds.password;
      const isEmployee = role === 'Employee' && email.toLowerCase() === employeeCreds.email && password === employeeCreds.password;

      if (isManager || isEmployee) {
        const userData = {
        id: isManager ? 'manager1' : 'emp1',
        name: isManager ? 'Admin' : 'Rudra',
        role: role.toLowerCase(), 
        email,
      };
      localStorage.setItem('user', JSON.stringify(userData));


        dispatch(login(userData));
        localStorage.setItem('user', JSON.stringify(userData));

        toast.success(`${role} login successful!`);
        setTimeout(() => {
          navigate(role === 'Manager' ? '/dashboard' : '/employee');
        }, 1500);
      } else {
        toast.error('Invalid credentials!');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <ToastContainer />
      <div className="row shadow rounded-4 overflow-hidden bg-white" style={{ width: '900px' }}>
        <div className="col-md-6 p-4 d-flex align-items-center justify-content-center bg-white">
          <img src={loginImage} alt="Login Visual" className="img-fluid" />
        </div>

        <div className="col-md-6 p-5">
          {!role ? (
            <>
              <h5 className="mb-4 fw-bold text-primary text-center">Login as</h5>
              <div className="d-flex flex-column align-items-center gap-3">
                <button className="btn btn-outline-primary rounded-pill px-5 py-2 w-75" onClick={() => handleRoleSelect('Manager')}>
                  👔 Manager
                </button>
                <button className="btn btn-outline-success rounded-pill px-5 py-2 w-75" onClick={() => handleRoleSelect('Employee')}>
                  👨‍💼 Employee
                </button>
              </div>
            </>
          ) : (
            <>
              <h5 className="mb-4 fw-bold text-primary">Login as {role}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control rounded-pill px-4 py-2"
                    placeholder={`${role.toLowerCase()}@xyz.com`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control rounded-pill px-4 py-2"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2" disabled={loading}>
                  {loading ? 'Logging in...' : 'LOGIN'}
                </button>
                <div className="text-center mt-3">
                  <small className="text-muted">Forgot your password?</small><br />
                  <span className="text-decoration-none fw-semibold text-primary" style={{ cursor: 'pointer' }}>
                    Get help signing in
                  </span>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-link text-danger fw-semibold" onClick={() => setRole(null)} type="button">
                    ⬅ Back to Role Selection
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
