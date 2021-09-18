const auth = require('../functions/auth.ts')

function logSubmit(event) {

  event.preventDefault();

  if(!window.navigator.onLine) return document.getElementById('erro').innerHTML = "You must have an internet connection"

  let email = document.getElementById('email').value
  let password = document.getElementById('password').value

  auth.authenticate(email, password).then(x => {

    let xs = JSON.stringify(x)

    

    let profiles = localStorage.getItem("profiles")
    if(!profiles) {
      localStorage.setItem("profiles", xs)
      localStorage.setItem("current", xs)
    } else {

      localStorage.setItem("current", xs)

      profiles = profiles.split(`,,==`)

      let sa = []

      if(Array.isArray(profiles)) {

        profiles.push(xs)

        profiles = profiles.join(`,,==`)
      localStorage.setItem("profiles", profiles)

      } else {

        sa.push(profiles)
        sa.push(xs)

        sa = sa.join(`,,==`)
        localStorage.setItem("profiles", sa)
      }

      
    }

    const ipc = require('electron').ipcRenderer;
    ipc.send('open-main-menu')
    window.close()
    



  }).catch(err => {
    // do something with err

    document.getElementById('erro').innerHTML = "Incorrect email or password";

  })
  
}

function appQuit() {
  window.close()
}

function appMinimize() {
  const { remote } = require('electron')
  remote.BrowserWindow.getFocusedWindow().minimize();
}


document.getElementById('closeButton').onclick = function() { appQuit() }

document.getElementById('minimizeButton').onclick = function() { appMinimize() }




const form = document.getElementById('form');
// const log = document.getElementById('log');
form.addEventListener('submit', logSubmit);