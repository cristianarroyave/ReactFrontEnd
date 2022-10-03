import React from "react";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

var targetNavigation;

const Table = ({data, column, target}) => {
    const navigate = useNavigate();

    const [filter, setFilter] = useState("");
    
    targetNavigation = target;

    return (
        <div className="table-responsive rounded mt-3">
            <input type="text" placeholder="Buscar..." className="from-control mb-2" onChange={e => setFilter(e.target.value)}/>
            <table className="table table-striped table-dark table-hover">
                <thead>
                    <tr key="0">
                        {column.map((item, index) => <TableHeadItem item={item} index={index}/>)}
                    </tr>
                </thead>
                <tbody>
                    {data.filter((item) => item.nombre.toLowerCase().includes(filter)).map((item, index) => <TableRow item={item} column={column} index={index} navigate={navigate}/>)}
                </tbody>
            </table>
        </div>
    )
}

export const TableHeadItem = ({ item, index }) => <th key={index} className="text-center">{item.heading}</th>

export const TableRow = ({ item, column, index, navigate}) => (
    <tr key={index}>
        {column.map((columnItem, index) => {
            return <td key={index} className="text-center" onClick={() => navigate(targetNavigation + item.codigo)}>{item[`${columnItem.value}`]}</td>
        })}
    </tr>
)


export default Table;
