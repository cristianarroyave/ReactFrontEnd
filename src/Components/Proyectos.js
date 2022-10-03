import { useState, useEffect } from "react";
import { AltaProyecto } from "./AltaProyecto";
import Table from "./Tabla";
import { createContext } from 'react';
import './styles.css';
import { NavBar } from "./NavBar";

const column = [
    { heading: 'Nombre de proyecto', value: 'nombre'},
    { heading: 'Horas estimadas', value: 'horasEstimadas'},
    { heading: 'Horas consumidas', value: 'horasConsumidas'},
    { heading: 'Fecha estimada de cierre', value: 'fechaEstimadaCierre'},
    { heading: 'Fecha cierre', value: 'fechaCierre'},
    { heading: 'Fecha alta', value: 'fechaAlta'}
]

export function Proyectos()
{
    const target = "/tareas/"

    const [data, setData] = useState([]);

    var updateProyectos = () => {
        getProyectos();
    }

    useEffect(() => {
        getProyectos();
    }, [])

    async function getProyectos()
    {
        const response = await fetch(
            "http://localhost:8080/proyectos",
            {
                method : "GET",
            }
        )

        const data = await response.json();

        setData(data);
    }

    return (
        <div className="container">
            <NavBar top="Proyectos" bottom="Alta proyecto"/>
            <div className="flex-container">
                <h1 className="text-center pt-xl-5 mt-5 mb-3">Proyectos</h1>
                <Table data={data} column={column} target={target}/>
            </div>
            <div>
                <ContextoProyectos.Provider value={updateProyectos}>
                    <AltaProyecto/>
                </ContextoProyectos.Provider>
            </div>
        </div>
    )
}

export const ContextoProyectos = createContext();
