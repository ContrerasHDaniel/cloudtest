if(!!window.EventSource){
    
    var es = new EventSource('http://localhost:3000/subscribe/alert');
    
    var tmr = setInterval(myTimer(), 5000);

    function myTimer() {
        es.onmessage = function (ev) {
            console.log(ev.data);
        }
    }
} else{
    console.log('Your browser does not support SSE');
}