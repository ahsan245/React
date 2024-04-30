import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React from 'react'
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Office from "./components/Office";
function App() {
  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_NEWS_API

  console.log(apiKey);


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
      <LoadingBar color='#f11946' progress={progress} height={3}
      onLoaderFinished={() =>setProgress(progress)}
      />

      
      <Alert alert={alert}/>
      <div className="container my-4">
        <h1 style={{color: mode==='dark'?'white':'black', marginTop:'70px'
        }}>Welcome to TextUtil</h1>
        <Routes>
        <Route exact path="/" element={<TextForm heading="Enter the text to analyze below" mode={mode} showAlert= {showAlert}/>}/>
          <Route exact path="/home" element={<TextForm heading="Enter the text to analyze below" mode={mode} showAlert= {showAlert}/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/sports" element={<Office mode={mode} setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} category='sports'/>}/>
          <Route exact path="/business" element={<Office mode={mode} setProgress={setProgress}  apiKey={apiKey}  key="business" pageSize={6} category='business'/>}/>
          <Route exact path="/science" element={<Office  mode={mode}setProgress={setProgress}  apiKey={apiKey}   key="science" pageSize={6} category='science'/>}/>
          <Route exact path="/office" element={<Office  mode={mode}setProgress={setProgress}   apiKey={apiKey} key="general" pageSize={6} category='general'/>}/>
          <Route exact path="/general" element={<Office mode={mode}  setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={6} category='general'/>}/>
          <Route exact path="/health" element={<Office mode={mode} setProgress={setProgress}  apiKey={apiKey}  key="health" pageSize={6} category='health'/>}/>
        </Routes>
     
      </div>
      </Router>

    </>
  );
}

export default App;
