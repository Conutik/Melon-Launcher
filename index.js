const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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
      worldSafeExecuteJavaScript: true
    },
    backgroundColor: '#171614'
  })

  main.loadFile('pages/main.html')
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
