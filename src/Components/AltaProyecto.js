import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var reg = /^\d+$/;

export class AltaProyecto extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            nombre: '',
            horasEstimadas: '',
            fechaEstimadaCierre: new Date()
        }
    }

    leerCampo = (ev) => {
        if(ev.target.id == 'horasEstimadas' && !/^[0-9]+$|^$/.test(ev.target.value)) 
        {
            return
        }
        this.setState(
            {
                ...this.state,
                [ev.target.id] : ev.target.value,
            }
        )
    }

    leerFecha = (ev) => {
        this.setState(
            {
                fechaEstimadaCierre : ev
            }
        )
    }

    darAlta()
    {
        var year = this.state.fechaEstimadaCierre.getFullYear();
        var month = this.state.fechaEstimadaCierre.getMonth() + 1;
        var day = this.state.fechaEstimadaCierre.getDate();

        if(month <= 9) month = '0' + month;
        if(day <= 9) day = '0' + day;

        var proyecto = {
            nombre : this.state.nombre,
            horasEstimadas : this.state.horasEstimadas,
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
                this.props.update()
            }
        )
        .catch(            
            (error) => {
                console.log(error)
                alert("No se ha podido crear el proyecto")
            }
        )

    }

    render()
    {
        return (
            <div className="form-group mt-2">
                <h1 className="text-center">Cargar proyecto</h1>
                <label htmlFor="nombre">Nombre proyecto</label>
                    <input type="text" 
                    className="form-control" 
                    id="nombre" 
                    value={this.state.nombre}
                    onChange = {this.leerCampo}
                    />
                <label htmlFor="horasEstimadas">Horas estimadas</label>
                    <input type="text" 
                    className="form-control" 
                    id="horasEstimadas" 
                    value={this.state.horasEstimadas}
                    onChange = {this.leerCampo}
                    />
                <label htmlFor="fechaEstimadaCierre">Fecha estimada de cierre</label>
                    <DatePicker className="form-control" id="fechaEstimadaCierre" selected={this.state.fechaEstimadaCierre} onChange={this.leerFecha}/>
                    <button onClick={ () => this.darAlta() } className="btn btn-secondary btn-md mt-2">Crear</button>
            </div>
        )
    }
}