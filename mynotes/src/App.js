import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./Context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./app.css";

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  return (
    <>
      <GoogleOAuthProvider clientId="631712025128-p8t6b0qdf5fpr3t8jnsp7mqn8q4svjau.apps.googleusercontent.com">
        <div className="full mx-0">
          <NoteState>
            <Router>
              <Navbar />
              <Alert alert={alert}/>
              <div className="container my-0  ">
                <Routes>
                  <Route path="/" element={<Home showalert={showalert}/>} />
                  <Route path="/about" element={<About showalert={showalert}/>} />
                  <Route path="/login" element={<Login showalert={showalert}/>} />
                  <Route path="/signup" element={<Signup showalert={showalert}/>} />
                </Routes>
              </div>
            </Router>
          </NoteState>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
