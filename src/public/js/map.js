var map;
var lat;
var lng;
var markers = [];
var latlngFocused;

/**
 * Inicializa el mapa
 */
function initMap(){
    // Se obtienen los parámetros de las coordenadas iniciales del mapa.
    lat = parseFloat(document.getElementById('lat').value);
    lng  = parseFloat(document.getElementById('lng').value);
    // Se configura el mapa con las coordenadas.
    var myLatlng = new google.maps.LatLng(lat,lng);
    // Crea el mapa y lo dibuja en el div 'map'
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatlng,        
        zoom: 17
    });
    // Se actualiza la posición central a la de las coordenadas iniciales
    latlngFocused = myLatlng;
}

/**
 * Actualiza los marcadores de una zona dadas las posiciones de los dispositivos
 * @param {boolean} isAlert 
 * @param {Array} ganado 
 */
function updateMap(isAlert, ganado){
  clearMarkers();
  if (isAlert) {    
    var lat = ganado.lat;
    var lng = ganado.lng;
    latlngFocused = new google.maps.LatLng(lat, lng);
    drawMarker(lat, lng, ganado.alias, ganado._id, "/public/img/vaca_1.png");
    map.panTo(latlngFocused);
  } else {
    // Borra todos los marcadores ya dibujados.
    deleteMarkers();
    // Se recorre el arreglo de dispositivos para obtener las coordenadas y el identificador de ganado.
    ganado.forEach((vaca,idx,ganado) => {
      // Se agrega un nuevo marcador por cada dispositivo en el arreglo.
      var customMarker = "";

      // Asigna el icono del marcador de acuerdo al sexo del animal
      if(vaca.sex == "M"){
        customMarker = "/public/img/toro_1.png";
      }else{
        customMarker = "/public/img/vaca_1.png";
        drawMarkers(vaca.position.lat, vaca.position.lng, vaca.alias, vaca._id, customMarker);
      }
      // Se verifica que esté en la última iteración. de ser así, se actualiza la posicion central del mapa
      // a donde se encuentre el dispositivo último del arreglo
      if(idx === (ganado.length -1)){
        latlngFocused = new google.maps.LatLng(vaca.position.lat, vaca.position.lng);
      }
    });
  }

  // Se muestran los marcadores en el mapa
  showMarkers();
}

/**
 * Dibuja los marcadores dada su latitud (lat), longitud (lng) y establece la etiqueta que tendrán (tag)
 * @param {String} lat 
 * @param {String} lng 
 * @param {String} tag 
 * @param {path} customMarker 
 */
function drawMarkers(lat, lng, tag, id, customMarker){
  // Se establecen las coordenadas del marcador
  var myLatlng = new google.maps.LatLng(lat,lng);
  // Se crea el nuevo marcador con las opciones definidas
  var iconMap = new google.maps.MarkerImage(
    customMarker,
    null,
    null,
    null,
    new google.maps.Size(25,25)
  );
  
  var marker = new google.maps.Marker({
    icon: iconMap,
    position: myLatlng,
    title: tag,
    map: map,
    opacity: 0.7,
    label: {
      color: '#800000',
      fontSize: '12px',
      fontWeight: 'bold',
      text: tag,
    }
  });
  marker.set("id",id);
  // Se agrega al arreglo de marcadores
  markers.push(marker);
}

/**
 * Dibuja un marcador dada su latitud (lat), longitud (lng) y establece la etiqueta que tendrá (tag)
 * @param {String} lat 
 * @param {String} lng 
 * @param {String} tag 
 * @param {path} customMarker 
 */
function drawMarker(lat, lng, tag, id, customMarker){
  // Se establecen las coordenadas del marcador
  var myLatlng = new google.maps.LatLng(lat,lng);
  // Se crea el nuevo marcador con las opciones definidas
  var iconMap = new google.maps.MarkerImage(
    customMarker,
    null,
    null,
    null,
    new google.maps.Size(35,35)
  );
  
  var marker = new google.maps.Marker({
    icon: iconMap,
    position: myLatlng,
    title: tag,
    map: map,
    opacity: 0.7,
    label: {
      color: '#800000',
      fontSize: '12px',
      fontWeight: 'bold',
      text: tag,
    }
  });
  // Se agrega al arreglo de marcadores
  replaceMarker(marker, id);
  
}

/**
 * Establece el mapa donde se dibujarán los marcadores y los presenta.
 * @param {google.maps.Map} map 
 */
function setMapOnAll(map){
  // Establece el mapa donde estarán dibujados los marcadores del arreglo y los presenta.
  for (let index = 0; index < markers.length; index++) { 
    markers[index].setMap(map);
  }
}

/**
 * Borra todos los marcadores en el mapa
 */
function clearMarkers(){
  setMapOnAll(null);
}

function replaceMarker(marker, id) {
  var markerToDelete = markers.find(marker => marker.id === id);
  var index = markers.indexOf(markerToDelete);

  if (~index) {
    markers[index] = marker;
  }
  
}

/**
 * Muestra todos los marcadores y establece el nuevo punto central y el zoom.
 */
function showMarkers(){
  setMapOnAll(map);
  map.panTo(latlngFocused);
  map.setZoom(18);
}

/**
 * Limpia el arreglo de marcadores
 */
function deleteMarkers() {
  clearMarkers();
  markers = [];
}