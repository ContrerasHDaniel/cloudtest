var map;
var lat;
var lng;
function initMap(){
    zonaStr = document.getElementById('zonas').value;
    console.log(zonas);
    zonas = zonaStr.split(',');
    for (var i in zonas){
      console.log(i);
    }
    lat = parseFloat(document.getElementById('lat').value);
    lng  = parseFloat(document.getElementById('lng').value);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: lng},        
        zoom: 13
    });

    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng}, // lat/long of marker
      map: map,
      animation: google.maps.Animation.DROP, // drops marker in from top
      title: 'Vaca 1', // title on hover over marker
    });
}// end function