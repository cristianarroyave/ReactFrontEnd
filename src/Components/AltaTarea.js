import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { ContextoTareas } from "./Tareas";
import { useContext } from "react";

export function AltaTarea(proyecto)
{
    const tareas = useContext(ContextoTareas);
    const [nombre, setNombre] = useState(); 
    const [horasEstimadas, setHoras] = useState();
    const [fechaInicio, setFechaInicio]  = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    
    function darAlta()
    {
        const data = {
            nombre: nombre,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            horasEstimadas: horasEstimadas
        }

        fetch(
            "http://127.0.0.1:8080/tareas/" + proyecto.proyecto,
            {
                method : "POST",
                body : JSON.stringify(data),
                headers : {
                    "Content-Type" : "application/json",
                    "Access-Control-Allow-Origin": "http://127.0.0.1:8080"
                },
            }
        ).then(
            (respuesta) => {
                if(respuesta.ok)
                {
                    return respuesta.json();
                }
                else
                {
                    return respuesta.text().then(text => alert(JSON.parse(text).mensaje))
                }
            }
        ).then(
            (() => {
                tareas();
            })
        )
        .catch(            
            (error) => {
                alert("No se ha podido crear la tarea")
            }
        )
    }


    return (
        <div className="form-group mt-2 w-75 mx-auto flex-container center-container">
            <h1 className="text-center">Alta tarea</h1>
            <label htmlFor="nombre">Nombre tarea</label>
                <input type="text" 
                className="form-control" 
                id="nombre" 
                value={nombre}
                onChange = {e => setNombre(e.target.value)}
                />
            <label htmlFor="horasEstimadas">Horas estimadas</label>
                <input type="number" 
                pattern="[0-9]*"
                className="form-control" 
                id="horasEstimadas" 
                value={horasEstimadas}
                onChange = {e => setHoras(e.target.value)}
                />
            <label htmlFor="fechaFin">Fecha de inicio</label>
                <DatePicker className="form-control" id="fechaInicio" selected={fechaInicio} onChange={e => setFechaInicio(e)}/>
            <label htmlFor="fechaFin">Fecha de fin</label>
                <DatePicker className="form-control" id="fechaFin" selected={fechaFin} onChange={e => setFechaFin(e)}/>
            <button onClick={ darAlta } className="btn btn-secondary btn-md mt-2">Crear</button>
        </div>
    )
}