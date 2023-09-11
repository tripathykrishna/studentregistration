import React, { useEffect } from "react";
import Student from "./pages/student";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Teacher from "./pages/Teacher";
import Course from "./pages/Course";
import Layout from "./layout/Layout";
import Logi from "./pages/Logi";
import Topics from "./pages/Topics";
import Registration from "./pages/Registration";
{/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"></link> */}


// import Coursestudentteacher from "./pages/coursestudentteacher";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
         path="/"
         element={
           <Layout>
             
           </Layout>
         }
        />
        <Route
          path="/student"
          element={
            <Layout>
              <Student />
            </Layout>
          }
        />
        <Route
          path="/teacher"
          element={
            <Layout>
              <Teacher />
            </Layout>
          }
        />
        <Route
          path="/course"
          element={
            <Layout>
              <Course />
            </Layout>
          }
        />
        <Route
          path="/topic"
          element={
            <Layout>
              <Topics/>
            </Layout>
          }
        />
        {/* <Route
          path="/Coursestudentteacher"
          element={
            <Layout>
              <Coursestudentteacher/>
            </Layout>
          }
        /> */}
         <Route
          path="/Logi"
          element={
              <Logi />
          }
          />
          
          <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
