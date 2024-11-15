# python_backend/install_requirements.py
import subprocess
import sys


def install_requirements():
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while installing dependencies: {e}")
        sys.exit(1)


if __name__ == "__main__":
    install_requirements()
