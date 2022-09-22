import { Component } from "react";
import { AltaProyecto } from "./AltaProyecto";
import Table from "./Tabla";

const column = [
    { heading: 'Nombre de proyecto', value: 'nombre'},
    { heading: 'Horas estimadas', value: 'horasEstimadas'},
    { heading: 'Horas consumidas', value: 'horasConsumidas'},
    { heading: 'Fecha estimada de cierre', value: 'fechaEstimadaCierre'},
    { heading: 'Fecha cierre', value: 'fechaCierre'},
    { heading: 'Fecha alta', value: 'fechaAlta'}
]

export class Proyectos extends Component
{

    constructor(props)
    {
        super(props)

        this.state = {
            proyectos : []
        }

        this.handler = this.handler.bind(this);
    }

    componentDidMount()
    {
        this.cargarProyectos();
    }

    handler()
    {
        this.cargarProyectos();
    }

    cargarProyectos()
    {
        fetch(
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
        )
    }
    
    render()
    {
        return (
            <div className="container">
                <Table data={this.state.proyectos} column={column} />
                <AltaProyecto handler={this.handler}/>
            </div>
        )
    }
}
