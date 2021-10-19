const os = require('os')

window.onload = () => {
  const replaceText = () => {
    const element = document.getElementById('jrePath')
    element.innerHTML = 'T'
  }
  replaceText('s', 's')

  function jrePathChanger () {
    let jr = localStorage.getItem('jrePath')
    if (!jr) jr = process.env.JAVA_HOME
    document.getElementById('jrePath').value = 'Java Path: ' + jr
  }

  function mcPathChanger () {
    let jrs = localStorage.getItem('mcPath')
    if (!jrs) jrs = process.env.APPDATA + '/.minecraft'
    document.getElementById('mcPath').value = 'Minecraft Path: ' + jrs
  }

  function closePref() {
    let data = localStorage.getItem("windowClosePref")
    if(!data) {
      localStorage.setItem('windowClosePref', true)
      document.getElementById('closePref1').checked = true
    } else {
      document.getElementById('closePref1').checked = JSON.parse(data)
    }
  }

  function memorySlider() {
    let x = os.totalmem / 1024 / 1024 / 1024
  
    x = Math.ceil(x)
    x = x * 1024 / 2
    const c = x / 2
  
    const z = (x + c) / 2

    let mem = localStorage.getItem('memory')
    if(!mem) mem = z
  
    document.getElementById('myRange').max = x
    document.getElementById('maxMem').innerHTML = x
    document.getElementById('myRange').min = c
    document.getElementById('smallMem').innerHTML = c
    document.getElementById('myRange').value = mem
    document.getElementById('setMem').innerHTML = mem
  }

  jrePathChanger()
  mcPathChanger()
  closePref()
  memorySlider()
}
