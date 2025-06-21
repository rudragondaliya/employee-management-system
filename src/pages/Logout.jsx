import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
    localStorage.clear();

    toast.success('Logged out successfully!');

  
    setTimeout(() => {
      navigate('/');
    }, 1000); 
  }, [navigate]);

  return null;
};

export default Logout;
