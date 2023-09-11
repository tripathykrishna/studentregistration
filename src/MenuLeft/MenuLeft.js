import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import useSelection from "antd/es/table/hooks/useSelection";
import { Button } from "antd";

const menuItem = [
  {
    name: "Student",
    url: "/",
  },

  { name: "Contract", url: "/contract" },
  {
    name: "Estimate",
    url: "/estimate",
  },
];
const MenuLeft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState(true);
  const handleClickMenuItem = (e) => {
    console.log(e);
    setSelected(e);
  };
  const handleClickMenuIcon = () => {
    setOpenMenu(!openMenu);
    toggleMenuLeft();
  };
  const toggleMenuLeft = () => {
    // dispatch({
    //   type: "SET_SETTING_STATE",
    //   payload: {
    //     openMenuLeft: !isMenuClosed,
    //   },
    // });
  };
  return (
    <>
      <div
        style={{
          background: "#026f6b",
          width: "100%",
        }}
        className={openMenu ? "menuleft_container" : "closedmenu_container"}
      >
        <div className="menu_header_container">
          <div
            onClick={handleClickMenuIcon}
            className={`menuicon rotate ${openMenu && "rotate_down"}`}
          ></div>
          <span className="menu_header" style={{marginLeft:"35px"}}>SCHOOL DETAILS</span>
        </div>
        <div className="menuitem_container">
        <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/")}
          >
            HOME
          </Button>
          <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/student")}
          >
            STUDENTS
          </Button>
          <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/teacher")}
          >
            TEACHERS
          </Button>
          <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/course")}
          >
            COURSES
          </Button>
          <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/topic")}
          >
            TOPIC
          </Button>
          <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/Logi")}
          >
            LOGIN
          </Button>
          <Button
            className="menuButton"
            type="primary"
            onClick={() => navigate("/Coursestudentteacher")}
          >
            selected data
          </Button>
        </div>
      </div>
      {/* </PerfectScrollbar> */}
    </>
  );
};

export default MenuLeft;
