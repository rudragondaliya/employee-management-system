// import React from 'react';
// import Login from './pages/Login';
// import { Route, Routes } from 'react-router-dom';
// import PrivateRoute from './components/Auth/PrivateRoute';
// import Dashboard from './pages/Dashboard';
// import EmployeePage from './pages/EmployeePage';
// import AddEmployee from './pages/AddEmployee';
// import EmployeeForm from './components/Manager/EmployeeForm';
// import ManagerToolsPage from './pages/ManagerTool';
// import SalarySlipPage from './pages/SalarySlipPage';
// import ChatPage from './pages/Chatpage';
// import Logout from './pages/Logout';
// // import AttendanceOverview from './components/Manager/AttendenceOverview';

// const App = () => {
//   return (
//     <>
//     <Routes>
//       <Route path='/' element={<Login/>}></Route>
//       <Route path='/dashboard' element={
//         <PrivateRoute>
//         <Dashboard/>
//       </PrivateRoute>}>
//       </Route>
//       <Route path='/employee' element={
//         <PrivateRoute>
//           <EmployeePage/>
//         </PrivateRoute>
//       }></Route>
//       <Route path='/employee/add' element={<PrivateRoute>
//         <AddEmployee/>
//       </PrivateRoute>}></Route>
//       <Route path="/employee/edit/:id" element={<EmployeeForm />} />
//       <Route path="/tools" element={<PrivateRoute><ManagerToolsPage /></PrivateRoute>} />
//       <Route path="/salary-slip" element={<PrivateRoute><SalarySlipPage /></PrivateRoute>} />
//           <Route path="/chat" element={<ChatPage />} />
//           <Route path="/logout" element={<Logout
//            />} />
//     </Routes>
      
//     </>
//   );
// }

// export default App;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeePage from './pages/EmployeePage';
import AddEmployee from './pages/AddEmployee';
import EmployeeForm from './components/Manager/EmployeeForm';
import ManagerToolsPage from './pages/ManagerTool';
import SalarySlipPage from './pages/SalarySlipPage';
import ChatPage from './pages/Chatpage';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import PrivateRoute from '../src/components/Auth/PrivateRoute'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* 👔 Manager-only Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/add"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <AddEmployee />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee/edit/:id"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <EmployeeForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/tools"
        element={
          <PrivateRoute allowedRoles={['manager']}>
            <ManagerToolsPage />
          </PrivateRoute>
        }
      />

      {/* 👨‍💼 Employee-only Routes */}
      <Route
        path="/employee"
        element={
          <PrivateRoute allowedRoles={['employee']}>
            <EmployeePage />
          </PrivateRoute>
        }
      />

      {/* Shared Routes */}
      <Route
        path="/salary-slip"
        element={
          <PrivateRoute allowedRoles={['employee', 'manager']}>
            <SalarySlipPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute allowedRoles={['employee', 'manager']}>
            <ChatPage />
          </PrivateRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
