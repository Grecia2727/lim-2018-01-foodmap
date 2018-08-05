const divMapa = document.getElementById('mapa');
const yourposition = document.getElementById('your-position');
const input = document.getElementById('pac-input');

const fn_error = () => divMapa.innerHTML = 'Sucedió un problema al solicitar su ubicación';

// Imprime lat y long, y muestra mapa
const fn_ok = (respuesta) => {
  const lat = respuesta.coords.latitude;
  const lon = respuesta.coords.longitude;
  yourposition.innerHTML = '<p>Estas son tus coordenadas: <br> Latitude is ' + lat + '° <br>Longitude is ' + lon + '°</p>';
  divMapa.innerHTML = '<p>Latitude is ' + lat + '° <br>Longitude is ' + lon + '°</p>';
  const gLatLon = new google.maps.LatLng(lat, lon);
  const objConfig = {
    zoom: 15,
    center: gLatLon,
  }
  const gMapa = new google.maps.Map(divMapa, objConfig);
  const objConfigMarker = {
    position: gLatLon,
    map: gMapa,
    title: "Usted está aca",
  }
  const gMarker = new google.maps.Marker(objConfigMarker);
}


const mostrar_objeto = (obj) => {
  for (const prop in obj) {
    document.write(prop + ': ' + obj[prop] + '<br />');
  }
}
navigator.geolocation.getCurrentPosition(fn_ok, fn_error);




// Inicializando Modal de Materialize:
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
