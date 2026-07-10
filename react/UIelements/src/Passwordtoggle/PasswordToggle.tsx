import  { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import "./styles.css";

export default function PasswordToggle() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  function togglePassword() {
    setIsVisible((prev)=> !prev)
  }

  return (
    <div className="container">
      <h1 className="title">Toggle Password</h1>
      <div className="password-wrapper">
        <input
          type={isVisible ? 'password' : 'text'}
          id="password"
          placeholder="Enter password"
          className="password-input"
          data-testid="password-input"
        />
        <span
          className="icon"
          data-testid="toggle-icon"
          onClick={togglePassword}
        > 
          {
            isVisible ?
              <EyeOff size={18} /> :
              <Eye size={18} />
           
          }        
        </span>
      </div>
      <span className="visibility-label" data-testid="visibility-label">
       
        {isVisible ? 'Password Hidden' : 'Password Visible'}
        
      </span>
    </div>
  );
}


