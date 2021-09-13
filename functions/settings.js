const { ipcMain } = require('electron')
const si = require('systeminformation')
const ipc = require('electron').ipcRenderer;

function test() {
    si.mem().then(x => {
        x = x.total/1024/1024/1024

        x = Math.ceil(x)
        x = x*1024/2
        console.log(x)
        console.log(x/2)
        let c = x/2
        console.log(c)

        let z = (x+c)/2

        console.log(z)

        document.getElementById('myRange').max = x;
        document.getElementById('myRange').min = c;
        document.getElementById('myRange').value = z;
    })
}

/*



JRE FINDER THING

FOR MORE INFO DM Conutik#5777



*/

const input = document.getElementById('jrePathChange');
input.style.opacity = 0;

function jrePathChanger() {
    let jr = localStorage.getItem("jrePath")
    if(!jr) jr = process.env.JAVA_HOME
    document.getElementById("jrePath").value = "Java Path: " + jr

    

test()

}

function jrePathChange() {
    if(!document.getElementById('jrePathChange').files[0]) return;
    let file = document.getElementById('jrePathChange').files[0].path;

    let testArray = file.split('\\')
    testArray.pop()
    file = testArray.join('\\')

    document.getElementById("jrePath").value = "Java Path: " + file

    localStorage.setItem("jrePath", file)
}
window.addEventListener("load", jrePathChanger());



document.getElementById('jrePath').onclick = function() { input.click() }



input.addEventListener('change', jrePathChange);


/*



MINECRAFT FILE FINDER THING

FOR MORE INFO DM Conutik#5777



*/

function mcPathChanger() {
    let jrs = localStorage.getItem("mcPath")
    if(!jrs) jrs = process.env.APPDATA + "/.minecraft"
    document.getElementById("mcPath").value = "Minecraft Path: " + jrs

}

function mcPathChange() {
    if(!document.getElementById('mcPathChange').files) return;
    let file = document.getElementById('mcPathChange').files[0].path;

    let testArray = file.split('\\')
    testArray.pop()
    file = testArray.join('\\')

    document.getElementById("mcPath").value = "Minecraft Path: " + file

    localStorage.setItem("mcPath", file)
}
window.addEventListener("load", mcPathChanger());

const inputs = document.getElementById('mcPathChange');

document.getElementById('mcPath').onclick = function() { inputs.click() }

inputs.style.opacity = 0;

inputs.addEventListener('change', mcPathChange);

/*


END OF MINECRAFT PATH


*/

function icpsend(msg) {
    ipc.send(msg)
    window.close()
}

document.getElementById('submit').onclick = function() { icpsend("open-main-menu") }

