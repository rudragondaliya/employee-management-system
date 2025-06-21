import React from 'react';
import EmployeeForm from '../components/Manager/EmployeeForm';
import Header from '../Shared/Header';

const AddEmployee = () => {
  return (
    <>
      <Header />
      <div className="container-fluid px-4 py-3">
        <div className="card p-4 shadow-sm">
          <h4 className="mb-3 text-primary">➕ Add New Employee</h4>
          <EmployeeForm />
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
