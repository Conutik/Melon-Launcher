const auth = require('../functions/auth.ts')
const { ipcRenderer, shell } = require('electron')
const { Client } = require('minecraft-launcher-core')
const os = require('os')

// localStorage.removeItem("current")
function logSubmit () {
  if (document.getElementById('submit').innerHTML === 'LAUNCHING') return

  const current = JSON.parse(localStorage.getItem('current'))

  if (!current) {
    localStorage.removeItem('current')
    localStorage.removeItem('profiles')

    // eslint-disable-next-line no-undef
    ipc.send('open-login-menu')

    window.close()
    return
  }

  let jre = localStorage.getItem('jrePath')
  let mcPath = localStorage.getItem('mcPath')

  if (jre) jre = process.env.JAVA_HOME

  if (!mcPath) mcPath = process.env.APPDATA + '/.minecraft'

  let x = os.totalmem / 1024 / 1024 / 1024

  x = Math.ceil(x)
  x = x * 1024 / 2
  const c = x / 2

  const z = (x + c) / 2

  let mem = localStorage.getItem('memory')
  if (!mem) mem = z

  mem = mem + 'M'

  if (current.mic) {
    const launcher = new Client()

    if (!current.Roles) current.Roles = []

    const acc = {
      username: current.userName,
      uuid: current.userUUID,
      access_token: current.accessToken
    }

    const opts = {
      clientPackage: null,
      authorization: acc,
      root: mcPath,
      javaPath: jre,
      version: {
        number: '1.8.9',
        type: 'release'
      },
      memory: {
        max: mem,
        min: mem
      },
      // window: {
      // fullscreen: true
      // width: window.screen.availWidth,
      // height: window.screen.availHeight
      // },
      forge: 'C:/Users/ziadk/Documents/coding/Melon Client/forge.jar'
    }

    launcher.launch(opts)

    // launcher.on('debug', (e) => {});
    launcher.on('data', () => {
      document.getElementById('submit').innerHTML = 'LAUNCHING'

      setTimeout(() => {
        let ch = localStorage.getItem('windowClosePref')
        if (!ch) {
          localStorage.setItem('windowClosePref', true)
          window.close()
        } else {
          ch = JSON.parse(ch)
          if (ch) return window.close()
        }
      }, 10000)
    })
  } else {
    auth.validate().then(x => {
      if (x === true) {
        const launcher = new Client()

        const opts = {
          clientPackage: null,
          authorization: current,
          root: mcPath,
          javaPath: jre,
          version: {
            number: '1.8.9',
            type: 'release'
          },
          memory: {
            max: mem,
            min: mem
          },
          // window: {
          // fullscreen: true
          // width: window.screen.availWidth,
          // height: window.screen.availHeight
          // },
          forge: 'C:/Users/ziadk/Documents/coding/Melon Client/forge.jar'
        }
        launcher.launch(opts)

        // launcher.on('debug', () => {});
        launcher.on('data', () => {
          document.getElementById('submit').innerHTML = 'LAUNCHING'
          setTimeout(() => {
            let ch = localStorage.getItem('windowClosePref')
            if (!ch) {
              localStorage.setItem('windowClosePref', true)
              window.close()
            } else {
              ch = JSON.parse(ch)
              if (ch) return window.close()
            }
          }, 15000)
        })
      }
    }).catch(() => {
      localStorage.removeItem('current')
      localStorage.removeItem('profiles')

      ipcRenderer.send('open-login-menu')
      window.close()
    })
  }
}

function appMinimize () {
  // icpsend('minimize')
}

function openTab (url) {
  shell.openExternal(url)
}

function icpsend (msg) {
  ipcRenderer.send(msg)
  window.close()
}

document.getElementById('submit').onclick = () => logSubmit()

document.getElementById('settingsButton').onclick = () => icpsend('open-settings-menu')

document.getElementById('closeButton').onclick = () => window.close()

document.getElementById('minimizeButton').onclick = () => appMinimize()

document.getElementById('youtubeButton').onclick = () => openTab('https://www.youtube.com/c/melonclient')

document.getElementById('twitterButton').onclick = () => openTab('https://twitter.com/ClientMelon')

document.getElementById('discordButton').onclick = () => openTab('https://discord.gg/melonclient')

window.onload = () => {
  const pfp = JSON.parse(localStorage.getItem('current'))
  document.getElementById('head').data = 'https://crafatar.com/avatars/' + pfp.userUUID + '?size=15'
}

document.getElementById('micro').onclick = () => {
  const rotatingArrow = document.getElementById('rotatingArrow')
  console.log(document.getElementById('head').style.marginTop)

  if (rotatingArrow.style.transform === 'rotate(180deg)') {
    rotatingArrow.style.transform = 'rotate(360deg)'
    document.getElementById('micro').style.height = '35px'
    document.getElementById('micro').style.width = '80px'
    rotatingArrow.style.marginTop = '0px'
    document.getElementById('head').style.marginTop = '0px'
  } else {
    rotatingArrow.style.transform = 'rotate(180deg)'

    let prof = JSON.parse(localStorage.getItem('current'))
    prof = prof.userName

    const wi = getTextWidth(prof, '15px arial')

    document.getElementById('micro').style.height = '100px'
    document.getElementById('micro').style.width = (wi + 80) + 'px'

    rotatingArrow.style.marginTop = '-75px'
    // head.style.marginBottom = "100px"

    // document.getElementById('currAccName').innerHTML = prof
  }
}

function getTextWidth (text, font) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}
