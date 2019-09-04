var map;
var lat;
var lng;
var markers = [];
var latlngFocused;
function initMap(){
    lat = parseFloat(document.getElementById('lat').value);
    lng  = parseFloat(document.getElementById('lng').value);
    var myLatlng = new google.maps.LatLng(lat,lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatlng,        
        zoom: 13
    });
    latlngFocused = myLatlng;

}// end function

function updateMap(devices){
  deleteMarkers();
  devices.forEach((device,idx,devices) => {
    drawMarker(device.position.lat, device.position.lng, device.id_ganado);
    if(idx === (devices.length -1)){
      latlngFocused = new google.maps.LatLng(device.position.lat, device.position.lng);
    }
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
  
  //this.
  //this.map.setZoom(14);
}

function clearMarkers(){
  setMapOnAll(null);
}

function showMarkers(){
  setMapOnAll(map);
  map.panTo(latlngFocused);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}