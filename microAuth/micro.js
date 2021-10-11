const ipc = require('electron').ipcRenderer;
const auth = require('../functions/auth.ts')


// window.location.href = "https://login.live.com/oauth20_authorize.srf?client_id=3f4d7aa8-1ef6-4842-aa65-cad1278ad729&response_type=code&redirect_uri=https://melon.conutikmc.repl.co/redirect&scope=XboxLive.signin%20offline_access"


ipc.on('data', function(evt, message) {
    console.log(message)

    message.mic = true;
    
    localStorage.setItem("current", JSON.stringify(message))

    
    ipc.send('open-main-menu')
    ipc.send('close-login-menu')
    window.close()
    
})