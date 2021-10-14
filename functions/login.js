const auth = require('../functions/auth.ts')
const form = document.getElementById('form')
const { ipcRenderer, remote } = require('electron')

auth.msPopup()

function logSubmit (event) {
  event.preventDefault()
  if (!window.navigator.onLine) {
    document.getElementById('erro').innerHTML = 'You must have an internet connection'
    return
  }

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  auth.authenticate(email, password).then(x => {
    const xs = JSON.stringify(x)

    let profiles = localStorage.getItem('profiles')
    if (!profiles) {
      localStorage.setItem('profiles', xs)
      localStorage.setItem('current', xs)
    } else {
      localStorage.setItem('current', xs)
      profiles = profiles.split(',,==')

      let sa = []

      if (Array.isArray(profiles)) {
        profiles.push(xs)

        profiles = profiles.join(',,==')
        localStorage.setItem('profiles', profiles)
      } else {
        sa.push(profiles)
        sa.push(xs)

        sa = sa.join(',,==')
        localStorage.setItem('profiles', sa)
      }
    }

    ipcRenderer.send('open-main-menu')
    window.close()
  }).catch(() => {
    document.getElementById('erro').innerHTML = 'Incorrect email or password'
  })
}

ipcRenderer.on('end', (event, arg) => {
  window.close()
})

document.getElementById('closeButton').onclick = () => window.close()

document.getElementById('minimizeButton').onclick = () => remote.BrowserWindow.getFocusedWindow().minimize()

form.addEventListener('submit', logSubmit)
