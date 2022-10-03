import $ from 'jquery'

export function NavBar(props)
{
    var prevLocation = "top";

    const navigateTo = (location) => {
        if(location == prevLocation){
            return;
        }

        if(location == 'bottom')
        {
            $('.navegacionBottom').toggleClass('activo');
            $('.navegacionTop').toggleClass('activo');
            window.scrollTo(0, document.querySelector("#root").scrollHeight);
            prevLocation = location;
        } 
        else if(location == 'top')
        {
            $('.navegacionBottom').toggleClass('activo');
            $('.navegacionTop').toggleClass('activo');
            window.scrollTo(0, 0);
            prevLocation = location;
        }
    }

    return (
    <header>
        <nav>
            <a onClick={() => navigateTo('top')} className="navegacionTop activo">{props.top}</a>
            <a onClick={() => navigateTo('bottom')} className="navegacionBottom">{props.bottom}</a>
        </nav>
    </header>
    )
}