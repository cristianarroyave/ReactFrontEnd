import { useParams } from "react-router-dom";

export function Imputaciones()
{
    const {codigoTarea}  = useParams();

    return (
        <p>hola mundo {codigoTarea}</p>
    )
}