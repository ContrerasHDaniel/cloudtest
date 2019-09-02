var map;
var lat;
var lng;
var markers = [];
function initMap(){
    lat = parseFloat(document.getElementById('lat').value);
    lng  = parseFloat(document.getElementById('lng').value);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},        
        zoom: 13
    });
}// end function

function updateMap(positions){
  deleteMarkers();
  positions.forEach(position => {
    position.forEach(coords => {      
      drawMarker(coords.lat, coords.lng, coords.id_ganado);
    })
  });

  showMarkers();
}

function drawMarker(lat, lng, id_ganado){
  var myLatlng = new google.maps.LatLng(lat,lng);
  var markerOptions = new google.maps.Marker({
    position: myLatlng,
    title: id_ganado,
    map: map,
    label: {
      color: 'black',
      fontWeight: 'bold',
      text: id_ganado,
    },
  });
  markers.push(markerOptions);
}

function setMapOnAll(map){
  for (let index = 0; index < markers.length; index++) {
    markers[index].setMap(map);
  }
}

function clearMarkers(){
  setMapOnAll(null);
}

function showMarkers(){
  setMapOnAll(map);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}