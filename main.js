const {app, BrowserWindow, ipcMain, menu} = require('electron')
const path = require('path')
const url = require('url')
const S = require("./win/__sss")



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win


function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, icon: './win/img/logodivi.png' })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  //other windows





  ipcMain.on(S.Win_connection_add, (event, arg) => {
    console.log(S.Win_connection_add);
    
    var modalPath = path.join('file://', __dirname, './win/connection_add.html')
    var Win_connection_add = new BrowserWindow({ 
      width: 600, 
      height: 420, 
      show: false, 
      modal:true, 
      parent: win,
      minimizable: false,
      maximizable: false,
      movable:false,
      resizable: false
     })
    Win_connection_add.setMenu(null);
    Win_connection_add.loadURL(modalPath)
    Win_connection_add.show();
    event.returnValue = 'pong';

  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// http://electron.atom.io/docs/api/ipc-main/
