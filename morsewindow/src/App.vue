<template>
  <div id="app">
    <ChatPage />
  </div>
</template>

<script>
import ChatPage from './components/ChatPage.vue';

export default {
  components: {
    ChatPage
  }
};
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
