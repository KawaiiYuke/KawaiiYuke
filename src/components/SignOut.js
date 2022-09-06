import React from "react";
import "./css/SignOut.css";
import { Link } from "react-router-dom";

const SignOut = () => {
  return (
  <div className='SignOut'>
    <div className="title">You have signed out succeffully. See you soon!</div>
    <Link to="/signin">
      <buttom className="ReLogin">Re login</buttom>
    </Link>
    
  </div>
  );
};

export default SignOut;
