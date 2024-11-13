// electron-app/main.js
const {app, BrowserWindow} = require('electron');
const path = require('path');
const {exec} = require('child_process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    // 启动 Python 后端
    const pythonScript = path.join(__dirname, 'python_backend', 'app.py');
    exec(`python ${pythonScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error starting Python backend:', stderr);
        } else {
            console.log('Python backend started successfully');
        }
    });

    // 创建窗口
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
