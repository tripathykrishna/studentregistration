import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickLogin = async () => {
    const loginRes = await axios.post(
      "http://localhost:9000/api/login/login ",
      {
        email: email,
        password: password,
      }
    );
    console.log(loginRes.data);
    if (loginRes?.data?.status === true) {
      getAllUserList();
      navigate("/");
    } else {
      navigate("/registration");
    }
  };

  const getAllUserList = async () => {
    const topicRes = await axios.get("http://localhost:9000/api/login/getuser");
    console.log(topicRes.data);
  };
  useEffect(() => {
    getAllUserList();
  }, []);

  return (
    <div className="container">
      <div className="bg-container" style={{width:"50%" ,height:"60%"}}>
        <div className="pic"></div>

        <div
          className="logside"
          style={{
            position: "relative",
          }}
        >
          <div className="formName">
            {/* header */}
            <h1> LOGIN </h1>
          </div>

          <div className="form-container">

            {/* <div className="form-row">
              FULL NAME
              <div className="input-container">
                <input className="input" />
              </div>
            </div> */}

            <div className="form-row">
              EMAIL
              <div className="input-container">
                <input
                  className="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* <div className="form-row">
              PHONE NUMBER
              <div className="input-container" type="number">
                <input className="input" />
              </div>
            </div> */}

            <div className="form-row">
              PASSWORD
              <div className="input-container" type="password">
                <input
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

          </div>
          <div
            style={{
              position: "relative",
            }}
          >
            <button
              style={{
                border: "none",
                background: "#046ce7",
                color: "white",
                borderRadius: "5px",
                outline: "none",
                height: "30px",
                width: "120px",
                position: "absolute",
                right: "0",
                marginTop: "15px",
              }}
              onClick={handleClickLogin}
            >
              LOGIN
            </button>
          </div>
          <div style={{ position: "absolute", bottom: "15px" }}>
            <img
              src="/fab.png"
              alt="."
              style={{
                height: "20px",
              }}
            />{" "}
            <img
              src="/fab.png"
              alt="."
              style={{
                height: "20px",
              }}
            />{" "}
            <img
              src="/fab.png"
              alt="."
              style={{
                height: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logi;
