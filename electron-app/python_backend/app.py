# python_backend/app.py
from flask import Flask, request, jsonify
from ultralytics import YOLO
import torch
import os

app = Flask(__name__)

# 设置模型文件路径，防止路径问题
model_path = os.path.join(os.path.dirname(__file__), 'yolov10n.pt')

# 加载模型
if os.path.exists(model_path):
    model = YOLO(model_path)  # 加载模型
else:
    raise FileNotFoundError(f"Model file {model_path} not found!")


@app.route('/predict_image', methods=['POST'])
def predict_image():
    file = request.files['file']
    img = Image.open(file.stream)
    frame = np.array(img)  # 转换为 NumPy 数组
    results = model(frame)[0]

    # 返回预测结果
    return jsonify({"message": "Image processed successfully!"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
