import React from "react";
import logo from "../Images/egate_logo.jpg";
import '../styles/Header.css'
const Header = () => {
  return (
    <div className="admin_header">
      <div className="header_contents">
        <img src={logo} alt="logo" width={300} />
        <div className="header_text">
          {/* <p>PROFILE</p> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
