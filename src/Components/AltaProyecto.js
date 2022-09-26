import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContextoProyectos } from "./Proyectos";
import { useContext } from "react";

export function AltaProyecto()
{
    const proyectos = useContext(ContextoProyectos)
    const [nombre, setNombre] = useState();
    const [horasEstimadas, setHoras] = useState();
    const [fechaEstimadaCierre, setFechaEstimadaCierre] = useState(new Date());

    function darAlta()
    {
        var year = fechaEstimadaCierre.getFullYear();
        var month = fechaEstimadaCierre.getMonth() + 1;
        var day = fechaEstimadaCierre.getDate();

        if(month <= 9) month = '0' + month;
        if(day <= 9) day = '0' + day;

        var proyecto = {
            nombre : nombre,
            horasEstimadas : horasEstimadas,
            fechaEstimadaCierre : year + '-' + month + '-' + day
        }

        fetch(
            "http://localhost:8080/proyectos",
            {
                method : "POST",
                body : JSON.stringify(proyecto),
                headers : {
                    "Content-Type" : "application/json"
                }
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
            () => {
                proyectos();
            }
        )
        .catch(            
            (error) => {
                console.log(error)
                alert("No se ha podido crear el proyecto")
            }
        )
    }

    return (
        <div className="form-group mt-2">
            <h1 className="text-center">Cargar proyecto</h1>
            <label htmlFor="nombre">Nombre proyecto</label>
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
            <label htmlFor="fechaEstimadaCierre">Fecha estimada de cierre</label>
                <DatePicker className="form-control" id="fechaEstimadaCierre" selected={fechaEstimadaCierre} onChange={e => setFechaEstimadaCierre(e)}/>
                <button onClick={ darAlta } className="btn btn-secondary btn-md mt-2">Crear</button>
        </div>
    )
}