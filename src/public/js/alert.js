if(!!window.EventSource){
    
    var es = new EventSource('http://localhost:3000/subscribe/alert');
    es.onmessage = function(ev){
        if(ev.data == "true"){
            alert(ev.data);
        }
    }
    
    /*
    const listener = function(event){
        const type = event.type;
        console.log(event.data+"f");
        if (type === 'message') {
            es.close();
        } 
    };

    es.addEventListener('open',listener);
    es.addEventListener('message', listener);
    es.addEventListener('error',listener);
    es.addEventListener('result',listener);*/
    /*source.addEventListener('message',function (e){
        console.log(e.data);
        if(e.data){
            document.getElementById('mensaje').innerHTML 
            = "<span class=\"badge badge-danger\" id=\"data\">OK</span>";
        }else{
            document.getElementById('mensaje').innerHTML 
            = "<span class=\"badge badge-success\" id=\"data\">Not good</span>";
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
    */
} else{
    console.log('Your browser does not support SSE');
}