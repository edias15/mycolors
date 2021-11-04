const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql2');
require('dotenv').config()
const dev = !app.isPackaged
let win
async function connect() {
	try {
		const connection = (mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT,
    }));
    console.log('Connected to database')
	} catch (error) {
		console.log(error);
	}
}connect()

if (dev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (dev) {
    win.webContents.openDevTools()
  }
  win.loadFile('index.html')
}

ipcMain.on('color-name', (event, data) => {
  console.log(data)
  event.reply('color-name-reply', `Colors Name ${data}`)
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
