import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AltaTarea } from './AltaTarea';
import { createContext } from 'react';
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
    const target = "/imputaciones/"

    const {codigoProyecto}  = useParams();

    const [data, setData] = useState([]);
   
    var updateTareas = () => {
        getTareas();
    }

    useEffect(() => {
            getTareas();
    },[])

    async function getTareas() 
    {
        const response = await fetch(
            "http://localhost:8080/tareas/" + codigoProyecto,
            {
                method : "GET",
            }
        )

        const data = await response.json();

        setData(data);
    }

    return (
        <div className="container">
            <h1 className="text-center mt-3 mb-3">Tareas asignadas al proyecto</h1>
            <Table data={data} column={column} target={target}/>
            <ContextoTareas.Provider value={updateTareas}>
                <AltaTarea proyecto={codigoProyecto}/>
            </ContextoTareas.Provider>
        </div>
    )
}

export const ContextoTareas = createContext();