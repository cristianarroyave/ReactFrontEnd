import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Proyectos } from './Components/Proyectos';
import { Tareas } from './Components/Tareas';
import { Imputaciones } from './Components/Imputaciones';
import React from 'react';
import { BurguerMenu } from './Components/BurguerMenu';
import { NavBar } from './Components/NavBar';

function App() {
  return (
    <Router>
      <BurguerMenu/>
      <Routes>
        <Route path="/" element={<Proyectos />} />
        <Route path="/tareas/:codigoProyecto" element={<Tareas/>}/>
        <Route path="/imputaciones/:codigoTarea" element={<Imputaciones/>}/>
      </Routes>
    </Router>
  );
}

export default App;
