const ipc = require('electron').ipcRenderer
const path = require('path')

// IPC FUNCTION

function icpsend (msg) {
  ipc.send(msg)
  window.close()
}

// END OF IPC FUNCTION

/*
JRE & MINECRAFT PATH CHANGER
FOR MORE INFO DM Conutik#5777
*/

function jrePathChange () {
  if (!document.getElementById('jrePathChange').files[0]) return
  const file = path.dirname(document.getElementById('jrePathChange').files[0].path)

  document.getElementById('jrePath').value = 'Java Path: ' + file

  localStorage.setItem('jrePath', file)
}

function mcPathChange () {
  // if (!document.getElementById('mcPathChange').files) return
  console.log(document.getElementById('mcPathChange').files)
  const file = path.dirname(document.getElementById('mcPathChange').files[0].path)

  document.getElementById('mcPath').value = 'Minecraft Path: ' + file

  // localStorage.setItem('mcPath', file)
}
/* END OF JRE & MINECRAFT PATH CHANGER */

// CLOSE WINDOW AFTER LAUNCH PREF
function closePref(box) {
  localStorage.setItem("windowClosePref", box.checked)
}
// END OF CLOSE WINDOW PREF

// SET MEMORY 
function setMemory() {
  localStorage.setItem("memory", document.getElementById('setMem').innerHTML)
}
// END OF SET MEMORY

//EVENTS

document.getElementById('myRange').oninput = () => document.getElementById('setMem').innerHTML = document.getElementById('myRange').value

document.getElementById('jrePath').onclick = () => document.getElementById('jrePathChange').click();
document.getElementById('mcPath').onclick = () => document.getElementById('mcPathChange').click();

document.getElementById('submit').onclick = () => {
  closePref(document.getElementById('closePref1'))
  setMemory()
  // mcPathChange()
  // jrePathChange()
  icpsend('open-main-menu')
}
