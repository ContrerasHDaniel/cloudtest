if(!!window.EventSource){
    var source = new EventSource('http://localhost:3000/subscribe/alert');

    source.addEventListener('message',function (e){
        console.log(e.alerta);
        if(e.alerta){
            document.getElementById('data').innerHTML = "Not ok";
            console.log('true');
        }else{
            document.getElementById('data').innerHTML = "Ok";
            console.log('false');
        }
        
    }, false);

    source.addEventListener('open', function(e){
        document.getElementById('state').innerHTML = "Connected";
        
    }, false);

    source.addEventListener('error', function(e){
        const id_state = document.getElementById('state');
        if(e.eventPhase == EventSource.CLOSED){
            source.close;
        }
        if (e.target.readyState == EventSource.CLOSED) {
            id_state.innerHTML == 'Disconnected';
        }
        else if (e.target.readyState == EventSource.CONNECTING) {
            id_state.innerHTML = 'Connecting...';
        }
    },false)
} else{
    console.log('Your browser does not support SSE');
}