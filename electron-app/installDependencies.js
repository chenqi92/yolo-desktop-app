// electron-app/installDependencies.js
const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');

// 检查 Python 是否安装
function checkPython() {
    return new Promise((resolve, reject) => {
        exec('python --version', (error, stdout, stderr) => {
            if (error) {
                reject('Python not found');
            } else {
                resolve(stdout);
            }
        });
    });
}

// 安装 Python 和依赖
function installDependencies() {
    const pythonPath = path.join(__dirname, 'python_backend');
    const requirementsFile = path.join(pythonPath, 'requirements.txt');

    // 安装依赖
    exec(`pip install -r ${requirementsFile}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error installing Python dependencies:', stderr);
        } else {
            console.log('Python dependencies installed successfully');
        }
    });
}

// 判断并安装 Python
checkPython()
    .catch(() => {
        console.log('Python is not installed, installing...');
        exec('pip install python', (error, stdout, stderr) => {
            if (error) {
                console.error('Error installing Python:', stderr);
            } else {
                console.log('Python installed successfully');
                installDependencies();
            }
        });
    })
    .then(() => {
        installDependencies();
    });
