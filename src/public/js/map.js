var map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 22.7685646667, lng: -102.563796667},
        zoom: 15
    });
}// end function