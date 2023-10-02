const API = 'https://avwx.rest/api/metar/';




function traerMetar(funcion) {
    let icaoInput = document.getElementById("buscador")
    let icaoCode = icaoInput.value;

    fetch(`${API}/${icaoCode}`, {
    method: "GET",
    headers: {
        "Authorization": "teTvrLx_-0c9XaWNWpr2qzJEia4gxlft5kRekDBp8Pg",
    },
})
    .then(response => response.json())
    .then(data => {
        funcion(data)
        console.log(API + icaoCode + ".json");
    })
}

function mostrarMetar(info) {
    let contenedor = document.getElementById("container")

    contenedor.innerHTML = `
    <div>
        <p>${info.raw}</p>
    </div>
    `
}


document.addEventListener("click", () => {
    traerMetar(mostrarMetar);

})