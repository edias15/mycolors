const {ipcRenderer} = require('electron');

const hexColor = document.getElementById('hexColor');

hexColor.addEventListener('keyup', (event) => {
  if (hexColor.value.length === 7) {
    sendColor(hexColor.value)
  }
})

function sendColor (color) {
  ipcRenderer.send('color-name', color)
}

ipcRenderer.on('color-name-reply', (event, arg) => {
  document.getElementById('nameInput').value = arg
  console.log(arg)
})
