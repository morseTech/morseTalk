<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getWelcomeMessage } from '../services/api';

export default {
  name: 'WelcomeComponent',
  setup() {
    const message = ref('');

    onMounted(async () => {
      const data = await getWelcomeMessage();
      message.value = data.message;
    });

    return {
      message
    };
  }
};
</script>

<style scoped>
/* 添加样式 */
</style>
