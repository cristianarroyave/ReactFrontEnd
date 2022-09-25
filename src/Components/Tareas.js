import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { TableHeadItem } from './Tabla';
import { TableRow } from './Tabla';
import { AltaTarea } from './AltaTarea';
import { AltaTareaFunctional } from './AltaTareaFunctional';
import { createContext } from 'react';
import { Context } from 'react';

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

    const [data, setData] = useState();

    const navigate = useNavigate();
   
    var updateTareas = () => {
        getTareas();
    }

    useEffect(() => {
            getTareas();
    },[])

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


    return (
        <div className="container">
            <div className="table-responsive rounded mt-3">
            <table className="table table-striped table-dark table-hover">
                <thead>
                    <tr key="0">
                        {column.map((item, index) => <TableHeadItem item={item} index={index}/>)}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => <TableRow item={item} column={column} index={index}/>)}
                </tbody>
            </table>
            </div>
            <ContextoTareas.Provider value={updateTareas}>
                <AltaTareaFunctional proyecto={codigoProyecto}/>
            </ContextoTareas.Provider>
        </div>

    )
}

//             <AltaTarea proyecto={codigoProyecto} useUpdate={useUpdate}/>

export const ContextoTareas = createContext();