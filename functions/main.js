const { app } = require('electron');
const auth = require('../functions/auth.ts')
const ipc = require('electron').ipcRenderer;

// localStorage.removeItem("current")

function logSubmit() {

    if (document.getElementById('submit').innerHTML === "LAUNCHING") return;

    let profiles = localStorage.getItem("profiles")

    let current = JSON.parse(localStorage.getItem("current"))

    if(!current) {
        localStorage.removeItem("current")
        localStorage.removeItem("profiles")



        ipc.send("open-login-menu")

        window.close()
        return;
    }

    let jre = localStorage.getItem("jrePath")
    let mcPath = localStorage.getItem("mcPath")

    if (jre) jre = process.env.JAVA_HOME;

    if (!mcPath) mcPath = process.env.APPDATA + "/.minecraft";

    if(current.mic) {
        const { Client } = require('minecraft-launcher-core');
            const launcher = new Client();

            if(!current.Roles) current.Roles = []

            let access = {
                username: current.accessUser,
                roles: current.accessRoles,
                access_token: current.accessToken,
                token_type: current.accessTokenType,
                expires_in: current.accessExpiresIN
            }

            let acc = {
                username: "Conutik",
                uuid: "7b7ef169-ad97-4011-822f-ef64fc54f87f",
                access_token: current.accessToken
            }





            let opts = {
                clientPackage: null,
                authorization: acc,
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
            })
    } else {

    

    auth.validate().then(x => {

        if (x === true) {

            const { Client } = require('minecraft-launcher-core');
            const launcher = new Client();





            let opts = {
                clientPackage: null,
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

        
        localStorage.removeItem("current")
        localStorage.removeItem("profiles")



        ipc.send("open-login-menu")

        window.close()
    })




    // window.close()
}
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