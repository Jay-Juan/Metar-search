const API = 'https://avwx.rest/api/metar/';


function traerMetar(funcion) {
    let icaoInput = document.getElementById("buscador")
    let icaoCode = icaoInput.value;

    fetch(`${API}/${icaoCode}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Authorization": "teTvrLx_-0c9XaWNWpr2qzJEia4gxlft5kRekDBp8Pg",
        }
    })
        .then(response => response.json())
        ///////////////////////////////////////////////////////////////////////////////////////////
        .then(data => { funcion(data); console.log(API + icaoCode + ".json"); });
    // para ver el metar en consola
    //.then(json => console.log(json))
    ///////////////////////////////////////////////////////////////////////////////////////////
}

function mostrarMetar(info) {
    const contenedor = document.getElementById("container")
    let icaoInput = document.getElementById("buscador")
    let icaoCode = icaoInput.value;
    Object.values(info).forEach(metar => {
        contenedor.innerHTML += `
        <div>
            <p>${metar.raw}</p>
            <br>
            <p>${icaoCode.toUpperCase()}&nbsp${metar.time.repr}&nbsp${metar.wind_direction.repr}${metar.wind_speed.repr}KT&nbsp${metar.visibility.repr}&nbsp${metar.temperature.repr}/${metar.dewpoint.repr}&nbsp${metar.altimeter.repr}</p>
        </div>
        ` 
    });
    
    //${info.}&nbsp                                                                          ${info.}&nbsp                                                                                               ${info.}&nbsp                                      ${info.}&nbsp 
}

document.addEventListener("DOMContentLoaded", () => {
    let botonRaw = document.getElementById("botonRaw")

    botonRaw.addEventListener("click", () => {
        traerMetar(mostrarMetar)
    })

    var input = document.getElementById("buscador");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            botonRaw.click();
            console.log()
        }
    });
})

// buscar los tipos de nubes que hayan disponibles y mostrarlos