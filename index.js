const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let main

function createWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 400,
    icon: 'pictures/logo.png',
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'functions/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('pages/loading.html')
}

function createLoginPage () {
  const login = new BrowserWindow({
    width: 1043,
    height: 586,
    icon: 'pictures/logo.png',
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'functions/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true
    },
    backgroundColor: '#171614'
  })

  login.loadFile('pages/login.html')
}

function createMainPage () {
  main = new BrowserWindow({
    width: 1043,
    height: 586,
    icon: 'pictures/logo.png',
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'functions/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true
    },
    backgroundColor: '#171614'
  })

  main.loadFile('pages/main.html')

  main.minimize()

  main.webContents.on('minimize', function () {
    main.minimize()
  })
}

function createSettingsPage () {
  const main = new BrowserWindow({
    width: 1043,
    height: 586,
    icon: 'pictures/logo.png',
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'functions/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      devTools: true
    },
    backgroundColor: '#171614'
  })

  main.loadFile('pages/settings.html')
}

function createMspopup (ev) {
  const win = new BrowserWindow({
    width: 300,
    height: 400,
    icon: 'pictures/logo.png',
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    parent: main,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadURL('https://login.live.com/oauth20_authorize.srf?client_id=3f4d7aa8-1ef6-4842-aa65-cad1278ad729&response_type=code&redirect_uri=https://melon.conutikmc.repl.co/redirect&scope=XboxLive.signin%20offline_access')

  win.webContents.on('will-redirect', function (event, newUrl) {
    if (!newUrl.includes('/done?')) return
    win.loadFile('microAuth/micro.html')
    const url = new URL(newUrl)
    const search = url.search.substring(1)
    const params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

    win.webContents.on('did-finish-load', function () {
      win.webContents.send('data', params)
      ev.reply('end')
    })
    // More complex code to handle tokens goes here
  })
}

app.whenReady().then(() => {
  createWindow()
  // createLoginPage()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
      // createLoginPage()
    }
  })
})

ipcMain.on('open-login-menu', (event, arg) => {
  createLoginPage()
})

ipcMain.on('open-main-menu', (event, arg) => {
  createMainPage()
})

ipcMain.on('open-settings-menu', (event, arg) => {
  createSettingsPage()
})

ipcMain.on('microsoft-login', async (event, arg) => {
  createMspopup(event)
})

ipcMain.on('open-main-menu-micro', (event, arg) => {
  createMainPage()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
