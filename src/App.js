import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React from 'react'
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Office from "./components/Office";
function App() {
  const [mode,setMode] = useState('light');
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled","success");
      document.title = 'TextUtil - Dark Mode';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled","success");
      document.title = 'TextUtil - Light Mode';
    }
  }
  return (
    <>
      <Router>

      <Navbar title='TextUtil' about='About Us' mode= {mode} toggleMode = {toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-4">
        <h1 style={{color: mode==='dark'?'white':'black'
        }}>Welcome to TextUtil</h1>
        <Routes>
        <Route exact path="/" element={<TextForm heading="Enter the text to analyze below" mode={mode} showAlert= {showAlert}/>}/>
          <Route exact path="/home" element={<TextForm heading="Enter the text to analyze below" mode={mode} showAlert= {showAlert}/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/office" element={<Office pageSize={6}/>}/>
        </Routes>
     
      </div>
      </Router>

    </>
  );
}

export default App;
