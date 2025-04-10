import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router> 
      <ToastContainer position="top-right" autoClose={3000} />
    <App />
    </Router> 
  </StrictMode>,
)
