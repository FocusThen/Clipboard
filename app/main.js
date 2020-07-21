const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')


let tray;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    // frame:false,
    nodeIntegration: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  tray = new Tray('./icon/raven.png')

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  if (process.platform !== 'darwin') {
    const { x, y } = tray.getBounds();
    mainWindow.setPosition(x - 400, y - 610)
  }




  // exit button
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Exit',
      click: function () {
        mainWindow.close();
      }
    },
  ])
  tray.setContextMenu(contextMenu)
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
