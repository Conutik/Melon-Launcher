const { app } = require('electron');
const auth = require('../functions/auth.ts')
const ipc = require('electron').ipcRenderer;

// localStorage.removeItem("current")

function logSubmit() {

    if (document.getElementById('submit').innerHTML === "LAUNCHING") return;

    let profiles = localStorage.getItem("profiles")

    let current = JSON.parse(localStorage.getItem("current"))

    let jre = localStorage.getItem("jrePath")
    let mcPath = localStorage.getItem("mcPath")

    if (jre) jre = process.env.JAVA_HOME;

    if (!mcPath) mcPath = process.env.APPDATA + "/.minecraft";

    auth.validate().then(x => {

        if (x === true) {

            const { Client } = require('minecraft-launcher-core');
            const launcher = new Client();





            let opts = {
                clientPackage: null,
                // For production launchers, I recommend not passing 
                // the getAuth function through the authorization field and instead
                // handling authentication outside before you initialize
                // MCLC so you can handle auth based errors and validation!
                authorization: current,
                root: mcPath,
                javaPath: jre,
                version: {
                    number: "1.8.9",
                    type: "release"
                },
                memory: {
                    max: "4000M",
                    min: "4000M"
                },
                // window: {
                // fullscreen: true
                // width: window.screen.availWidth,
                // height: window.screen.availHeight
                // },
                forge: "C:/Users/ziadk/Documents/coding/Melon Client/forge.jar"
            }

            launcher.launch(opts);

            let i = 0

            // launcher.on('debug', (e) => {});
            launcher.on('data', (e) => {
                document.getElementById('submit').innerHTML = "LAUNCHING";
            });

        }
    }).catch(e => {

        // auth.refresh()

        
        localStorage.removeItem("current")
        localStorage.removeItem("profiles")



        ipc.send("open-login-menu")

        window.close()
    })




    // window.close()
}

function appQuit() {
    window.close()
}

function appMinimize() {
    const { remote } = require('electron')
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function openTab(url) {
    require("electron").shell.openExternal(url);
}

function icpsend(msg) {
    ipc.send(msg)
    window.close()
}

document.getElementById('submit').onclick = function () { logSubmit() }

document.getElementById('settingsButton').onclick = function () { icpsend("open-settings-menu") }



document.getElementById('closeButton').onclick = function () { appQuit() }

document.getElementById('minimizeButton').onclick = function () { appMinimize() }

document.getElementById('youtubeButton').onclick = function () { openTab('https://www.youtube.com/c/melonclient') }

document.getElementById('twitterButton').onclick = function () { openTab('https://twitter.com/ClientMelon') }

document.getElementById('discordButton').onclick = function () { openTab('https://discord.gg/melonclient') }