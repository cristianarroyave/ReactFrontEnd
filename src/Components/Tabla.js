import React from "react";
import { useNavigate } from 'react-router-dom'

const Table = ({data, column}) => {
    const navigate = useNavigate();
    return (
        <div className="table-responsive rounded mt-3">
            <table className="table table-striped table-dark table-hover">
                <thead>
                    <tr key="0">
                        {column.map((item, index) => <TableHeadItem item={item} index={index}/>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => <TableRow item={item} column={column} index={index} navigate={navigate}/>)}
                </tbody>
            </table>
        </div>
    )
}

export const TableHeadItem = ({ item, index }) => <th key={index} className="text-center">{item.heading}</th>
export const TableRow = ({ item, column, index, navigate}) => (
    <tr key={index}>
        {column.map((columnItem, index) => {
            return <td key={index} className="text-center" onClick={() => navigate("/tareas/" + item.codigo)}>{item[`${columnItem.value}`]}</td>
        })}
    </tr>
)


export default Table;
