const select = document.querySelector("#nombreCategoria");

const url = 'https://www.el-tiempo.net/api/json/v2/provincias/03/municipios';

let fecha = document.getElementById("Fecha")
let nombre = document.getElementById("Nombre")
let pronostico = document.getElementById("pronostico")
let temperaturaActual = document.getElementById("Temperatura-Actual")
let maxima = document.getElementById("Temperatura-Maxima")
let minima = document.getElementById("Temperatura-Minima")
let viento = document.getElementById("Velocidad-Viento")

let municipios = null
let numeros = null
let opciones = null
let resta = null

function iniciar() {

  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(lista => {

      codigo = lista.municipios
      municipios = lista.municipios
      numeros = Object.keys(municipios)

      for (let categoria of numeros) {
        let nuevaOpcion = document.createElement("option");
        nuevaOpcion.text = municipios[categoria].NOMBRE;
        nuevaOpcion.value = categoria;
        select.add(nuevaOpcion);
      }
    })
    .catch(function (error) {
      console.error("¡Error!", error);
    })
}

function seleccionar() {
  const opciones = document.getElementById("nombreCategoria").value;

  resta = codigo[opciones].CODIGOINE / 1000000

  const url2 = `https://www.el-tiempo.net/api/json/v2/provincias/03/municipios/0${resta}`;

  fetch(url2)
    .then(respuestaTextoPlano => { return respuestaTextoPlano.json() })
    .then(respuestaJson => {

      
      let dia = respuestaJson.fecha
      fecha.textContent = `Fecha: ${dia}`

      let metanombre = respuestaJson.metadescripcion
      nombre.textContent = `${metanombre}`

      let pronos = respuestaJson.stateSky.description
      pronostico.textContent = `Cielo: ${pronos}`

      let temperaturaAct = respuestaJson.temperatura_actual
      temperaturaActual.textContent = `La temperatura actual ${temperaturaAct} º C`

      let temperaturaMaxima = respuestaJson.temperaturas.max
      maxima.textContent = `La temperatura Maxima: ${temperaturaMaxima} º C`

      let temperaturaMinima = respuestaJson.temperaturas.min
      minima.textContent = `La temperatura Minima: ${temperaturaMinima} º C`

      let velocidad = respuestaJson.viento
      viento.textContent = `La velocidad del viento ${velocidad} (Km/H)`
    })
    .catch(error => {
      console.log(error)
    })
}

window.addEventListener("load", iniciar)