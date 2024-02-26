const API = 'https://avwx.rest/api/metar/';


async function traerMetar(funcion) {
    let icaoInput = document.getElementById("buscador")
    let icaoCode = icaoInput.value;

    const response = await fetch(`${API}/${icaoCode}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "Authorization": "teTvrLx_-0c9XaWNWpr2qzJEia4gxlft5kRekDBp8Pg",
        }
    })
        const data = await response.json()
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
    var html = `
    <div>
    <p>${info.raw}</p>
    <br>
    <p>${icaoCode.toUpperCase()}&nbsp${info.time.repr}&nbsp${info.wind_direction.repr}${info.wind_speed.repr}KT&nbsp${info.visibility.repr}&nbsp
    `
    info.clouds.forEach(function (nube) {
        html += `
        ${nube.repr}&nbsp
        `
    });
    html += `
    ${info.temperature.repr}/${info.dewpoint.repr}&nbsp${info.altimeter.repr}</p>
    </div>
    `
    //                                                                       ${info.}&nbsp                                                                                               ${info.}&nbsp                                      ${info.}&nbsp 
    contenedor.innerHTML = html
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