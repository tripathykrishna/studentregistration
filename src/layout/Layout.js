import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuLeft from "../MenuLeft/MenuLeft";


const Layout = ({ children }) => {
  const navigate=useNavigate()
  return (
    <div style={{
      display:'flex',
      padding:"10px"
    }}>
      <div className="menu_container">
     <MenuLeft/>
        
      </div>
      <div className="menu_children">

      {children}
      </div>
    </div>
  );
};

export default Layout;
