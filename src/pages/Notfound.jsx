import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
      <h1 className="display-3 text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="mb-4 text-muted">
        The page you are looking for doesn’t exist or you don’t have permission to access it.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-4 py-2">Go to Login</Link>
    </div>
  );
};

export default NotFound;
