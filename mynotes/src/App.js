import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./Context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./app.css"

function App() {
  return (
    <>
    <div className="">
    <NoteState>
      <Router>
        <Navbar />
        <Alert message= "I am not spying"/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/Signup" element={<Signup/>} />
          </Routes>
        </div>
      </Router>
      </NoteState>
      </div>
    </>
  );
}

export default App;
