import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Proyectos } from './Components/Proyectos';
import { Tareas } from './Components/Tareas';
import React from 'react';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Proyectos />} />
          <Route path="/tareas/:codigoProyecto" element={<Tareas/>}/>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
