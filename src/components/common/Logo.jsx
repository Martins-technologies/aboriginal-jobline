import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
const Logo = ({ light = false }) => {
  return (
   <>  
   <Link to="/">
      <img 
        src={logo} 
        alt="Aboriginal Jobline Logo" 
        className="h-20 w-25 "
      />
    </Link>
     </>
  );
};



export default Logo;