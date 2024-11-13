#!/bin/bash
# 检查是否安装 Python
if ! command -v python &> /dev/null
then
    echo "Python not found, installing..."
    # 这里可以放一些安装 Python 的命令，具体依据不同的操作系统
    sudo apt-get update
    sudo apt-get install python3
else
    echo "Python is already installed"
fi
