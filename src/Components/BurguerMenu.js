import $ from 'jquery'

export function BurguerMenu()
{
    const jQueryCode = () => {
        $('#burguer').toggleClass('abierto');
        $('.menu').toggleClass('abierto');
    }

    return (
    <div>
        <div className="menu">
            <nav style={{"fontFamily" :  "var(--bs-body-font-family)"}}>
                <a href="#">Inicio</a>

                <a href="#">Venta</a>

                <a href="#">Alquiler</a>

                <a href="#">Contacto</a>
            </nav>
            <p className="copyright" style={{"fontFamily" :  "var(--bs-body-font-family)"}}>&copy; Namokid</p>
        </div>
        <div id="burguer" onClick={jQueryCode}>
            <div className="barra superior"></div>
            <div className="barra media"></div>
            <div className="barra inferior"></div>
        </div>
    </div>
    )
}