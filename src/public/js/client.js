const publicVapidKey = "BFwZBMBKTHq_h07CVqNCbVBw46_gXhi1crRWvzUM0sCoNtW-foSYnabc7S0PSzLaMY2zgGC6V0Ip7fdrYt2TDmY";

// Check for service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// Register serviceWorker, push and send
async function send(){
    // Register Service Worker
    console.log('Registering Service worker');
    const register = await navigator.serviceWorker.register('js/worker.js',{
        scope: '/'
    });
    console.log('Service worker registered...');

    // Register push
    console.log('Registering Push...');
    publicVapidKeyConv = urlBase64ToUint8Array(publicVapidKey);
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKeyConv

    });
    console.log('Push registered');
    //Push notification
    console.log('Sending push...');
    await fetch('http://localhost:3000/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log('Push sent');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}