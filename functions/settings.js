const ipc = require('electron').ipcRenderer
const os = require('os')
const path = require('path')

function test () {
  let x = os.totalmem / 1024 / 1024 / 1024

  x = Math.ceil(x)
  x = x * 1024 / 2
  const c = x / 2

  const z = (x + c) / 2

  document.getElementById('myRange').max = x
  document.getElementById('myRange').min = c
  document.getElementById('myRange').value = z
}

/*
JRE FINDER THING
FOR MORE INFO DM Conutik#5777
*/

const input = document.getElementById('jrePathChange')
input.style.opacity = 0

function jrePathChanger () {
  let jr = localStorage.getItem('jrePath')
  if (!jr) jr = process.env.JAVA_HOME
  document.getElementById('jrePath').value = 'Java Path: ' + jr

  test()
}

function jrePathChange () {
  if (!document.getElementById('jrePathChange').files[0]) return
  const file = path.dirname(document.getElementById('jrePathChange').files[0].path)

  document.getElementById('jrePath').value = 'Java Path: ' + file

  localStorage.setItem('jrePath', file)
}
window.addEventListener('load', jrePathChanger())

document.getElementById('jrePath').onclick = function () { input.click() }

input.addEventListener('change', jrePathChange)

/* MINECRAFT FILE FINDER THING
FOR MORE INFO DM Conutik#5777 */

function mcPathChanger () {
  let jrs = localStorage.getItem('mcPath')
  if (!jrs) jrs = process.env.APPDATA + '/.minecraft'
  document.getElementById('mcPath').value = 'Minecraft Path: ' + jrs
}

function mcPathChange () {
  if (!document.getElementById('mcPathChange').files) return
  const file = path.dirname(document.getElementById('mcPathChange').files[0].path)

  document.getElementById('mcPath').value = 'Minecraft Path: ' + file

  localStorage.setItem('mcPath', file)
}
window.addEventListener('load', mcPathChanger())

const inputs = document.getElementById('mcPathChange')

document.getElementById('mcPath').onclick = () => inputs.click()

inputs.style.opacity = 0
inputs.addEventListener('change', mcPathChange)

/* END OF MINECRAFT PATH */

function icpsend (msg) {
  ipc.send(msg)
  window.close()
}

document.getElementById('submit').onclick = () => icpsend('open-main-menu')
