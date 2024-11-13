<template>
  <div v-if="showInstallPrompt" class="install-prompt">
    <p>{{ installMessage }}</p>
    <button @click="installPython">安装 Python</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInstallPrompt: false,
      installMessage: '',
    };
  },
  mounted() {
    window.electron.onInstallPython((event, message) => {
      this.showInstallPrompt = true;
      this.installMessage = message;
    });
  },
  methods: {
    installPython() {
      // 这里可以处理安装逻辑，或者显示安装链接等
      this.showInstallPrompt = false;
      alert('请手动安装 Python');
    },
  },
};
</script>

<style scoped>
.install-prompt {
  background-color: #f8d7da;
  padding: 20px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
}
</style>
