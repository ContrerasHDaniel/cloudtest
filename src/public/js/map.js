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
        zoom: 13
    });
    // Se actualiza la posición central a la de las coordenadas iniciales
    latlngFocused = myLatlng;
}

/**
 * Actualiza los marcadores de una zona dadas las posiciones de los dispositivos
 * @param {Array.prototype} devices 
 */
function updateMap(devices){
  // Borra todos los marcadores ya dibujados.
  deleteMarkers();
  // Se recorre el arreglo de dispositivos para obtener las coordenadas y el identificador de ganado.
  devices.forEach((device,idx,devices) => {
    // Se agrega un nuevo marcador por cada dispositivo en el arreglo.
    drawMarker(device.position.lat, device.position.lng, device.id_ganado);
    // Se verifica que esté en la última iteración. de ser así, se actualiza la posicion central del mapa
    // a donde se encuentre el dispositivo último del arreglo
    if(idx === (devices.length -1)){
      latlngFocused = new google.maps.LatLng(device.position.lat, device.position.lng);
    }
  });
  // Se muestran los marcadores en el mapa
  showMarkers();
}

/**
 * Dibuja los marcadores dada su latitud (lat), longitud (lng) y establece la etiqueta que tendrán (tag)
 * @param {String} lat 
 * @param {String} lng 
 * @param {String} tag 
 */
function drawMarker(lat, lng, tag){
  // Se establecen las coordenadas del marcador
  var myLatlng = new google.maps.LatLng(lat,lng);
  // Se crea el nuevo marcador con las opciones definidas
  var marker = new google.maps.Marker({
    position: myLatlng,
    title: tag,
    map: map,
    label: {
      color: 'black',
      fontWeight: 'bold',
      text: tag,
    },
  });
  // Se agrega al arreglo de marcadores
  markers.push(marker);
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

/**
 * Muestra todos los marcadores y establece el nuevo punto central y el zoom.
 */
function showMarkers(){
  setMapOnAll(map);
  map.panTo(latlngFocused);
  map.setZoom(16);
}

/**
 * Limpia el arreglo de marcadores
 */
function deleteMarkers() {
  clearMarkers();
  markers = [];
}