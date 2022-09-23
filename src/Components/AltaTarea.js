import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class AltaTarea extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            nombre: '',
            horasEstimadas: '',
            fechaInicio: new Date(),
            fechaFin: new Date(),
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

    leerFechaInicio = (ev) => {
        this.setState(
            {
                fechaInicio : ev
            }
        )
    }

    leerFechaFin = (ev) => {
        this.setState(
            {
                fechaFin : ev
            }
        )
    }

    darAlta()
    {
        console.log(this.state)
    }

    render()
    {
        return (
            <div className="form-group mt-2">
                <h1 className="text-center">Alta tarea</h1>
                <label htmlFor="nombre">Nombre tarea</label>
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
                <label htmlFor="fechaFin">Fecha de inicio</label>
                    <DatePicker className="form-control" id="fechaInicio" selected={this.state.fechaInicio} onChange={this.leerFechaInicio}/>
                <label htmlFor="fechaFin">Fecha de fin</label>
                    <DatePicker className="form-control" id="fechaFin" selected={this.state.fechaFin} onChange={this.leerFechaFin}/>
                <button onClick={ () => this.darAlta() } className="btn btn-secondary btn-md mt-2">Crear</button>
            </div>
        )
    }
}