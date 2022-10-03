import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Table from "./Tabla";
import { NavBar } from "./NavBar";

const column = [
    { heading: 'Empleado', value: 'nombre'},
    { heading: 'Fecha', value: 'fecha'},
    { heading: 'Numero de horas', value: 'numeroHoras'},
    { heading: 'Descripción', value: 'descripcion'}
]

export function Imputaciones()
{
    const target = "";

    const {codigoTarea}  = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        getProyectos();
    }, [])

    async function getProyectos()
    {
        const response = await fetch(
            "http://localhost:8080/imputaciones/" + codigoTarea,
            {
                method : "GET",
            }
        )

        const data = await response.json();

        data.forEach(item => {
                item.nombre = item.empleado;
                delete item.empleado;
            }
        );

        setData(data);

    }

    return (
        <div className="container">
            <NavBar top="Imputaciones" bottom=""/>
            <div className="flex-container">
            <h1 className="text-center pt-xl-5 mt-5 mb-3">Imputaciones de la tarea</h1>
            <Table data={data} column={column} target={target}/>
        </div>
    </div>
    )
}