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
// SI FUNCIONAAAA mostrando tu ubicacion*****************



// Inicializando Modal de Materialize:
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});


function initMap() {
  var divMapa = new google.maps.Map(document.getElementById('mapa'), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    // mapTypeId: 'roadmap',
  });

  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', divMapa);
  divMapa.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    divMapa: divMapa
  });
  marker.addListener('click', function () {
    infowindow.open(divMapa, marker);
  });

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      divMapa.fitBounds(place.geometry.viewport);
    } else {
      divMapa.setCenter(place.geometry.location);
      divMapa.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });
    marker.setVisible(true);

    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-id'].textContent = place.place_id;
    infowindowContent.children['place-address'].textContent =
      place.formatted_address;
    infowindow.open(divMapa, marker);
  });
}
