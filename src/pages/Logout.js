import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userDetails');
    navigate('/');
  }, []);
  return <div></div>;
}

export default Logout;
