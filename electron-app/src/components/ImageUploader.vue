<template>
  <div>
    <h1>物体识别</h1>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">上传并识别</button>
    <img v-if="image" :src="image" alt="识别结果" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      image: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadImage() {
      if (!this.file) return;

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const response = await axios.post('http://localhost:5000/predict_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 处理返回的图像
        this.image = 'data:image/jpeg;base64,' + response.data.image;
      } catch (error) {
        console.error('上传图片失败:', error);
      }
    },
  },
};
</script>
