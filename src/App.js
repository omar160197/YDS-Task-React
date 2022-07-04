import React from "react";
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import "./App.css";

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
  );
};


export default App;
