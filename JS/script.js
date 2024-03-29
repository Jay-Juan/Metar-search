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
    await response.json()
        .then(data => { funcion(data); console.log(data); });
}

function mostrarMetar(info) {
    const contenedor = document.getElementById("container")
    let icaoInput = document.getElementById("buscador")
    let icaoCode = icaoInput.value;
    let visibility = info.visibility.repr 
    var html = `
    <div>
    <p>${info.raw}</p>
    <br>
    <p>${icaoCode.toUpperCase()}&nbsp${info.time.repr}
    `

    if (info.wind_gust) {
        html += `
        ${info.wind_direction.repr}${info.wind_speed.repr}G${info.wind_gust.repr}KT
        `
    } else {
        html += `
        ${info.wind_direction.repr}${info.wind_speed.repr}KT
        `
    }


    if (visibility.length < 4) {
        html += `
        ${info.visibility.repr}SM
        `
    } else {
        html += `
        ${info.visibility.repr}
        `
    }

    info.wx_codes.forEach(function (weather) {
        html += `
        ${weather.repr}
        `
    });
    info.clouds.forEach(function (nube) {
        html += `
        ${nube.repr}
        `
    });
    html += `
    ${info.temperature.repr}/${info.dewpoint.repr}&nbsp${info.altimeter.repr}&nbsp${info.remarks}</p>
    </div>
    `
    // ${info.}&nbsp
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