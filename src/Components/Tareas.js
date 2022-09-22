import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Table from './Tabla';

const column = [
    { heading: 'Nombre de tarea', value: 'nombre'},
    { heading: 'Fecha de inicio', value: 'fechaInicio'},
    { heading: 'Fecha de fin', value: 'fechaFin'},
    { heading: 'Horas estimadas', value: 'horasEstimadas'},
    { heading: 'Horas realizadas', value: 'horasRealizadas'},
    { heading: 'Fecha de alta', value: 'fechaAlta'}
]

export function Tareas()
{
    const {codigoProyecto}  = useParams();

    const [data, setData] = useState(null);
   
    useEffect(() => {
        console.log("use efect");

        async function getTareas() {
            const response = await fetch(
                "http://localhost:8080/tareas/" + codigoProyecto,
                {
                    method : "GET",
                }
            )

            const data = await response.json();

            setData(data);
        }

        getTareas();
        
        /*fetch(
        "http://localhost:8080/tareas/" + codigoProyecto,
        {
            method : "GET",
        }
    ).then(
        (respuesta) => {
            if(respuesta.ok)
            {
                return respuesta.json()
            }
            console.log("error");
        }
    ).then(            
        (datos) => {
                setData(datos);
            }
    ).catch(
        (error) => {                
            console.log(error);
        }
    )*/},[])
   

    return (
        <div>
            {data && data.map(tarea=> {
            return <div>{tarea.nombre}</div>
        })}{console.log(Array.isArray(data))}

        </div>

    )
}

/*fetch(
    "http://localhost:8080/proyectos",
    {
        method : "GET",
    }
).then(
    (respuesta) => {
        return respuesta.json();
    }
).then(
    (datos) => {
        this.setState(
            {
                proyectos : datos
            }
        )
    }
).catch(
    (error) => {
        console.log("Error al realizar fetch" + error);
    }
)*/