<template>
  <div class="chat-page">
    <div class="qa-section">
      <div class="logo">
        <h1>网站 Logo</h1>
      </div>
      <div class="qa-list">
        <div class="qa-card" v-for="(item, index) in qaList" :key="index">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
    <div class="chat-section">
      <div class="chat-list" ref="chatList">
        <div class="chat-message" v-for="(msg, index) in chatMessages" :key="index">
          <div v-if="msg.type === 'text'">{{ msg.content }}</div>
          <img v-if="msg.type === 'image'" :src="msg.content" alt="聊天图片" />
        </div>
      </div>
      <div class="input-area">
        <textarea v-model="inputMessage" placeholder="输入消息..." rows="3"></textarea>
        <div class="button-group">
          <button @click="sendMessage">发送</button>
          <button @click="sendEncryptedMessage">加密发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qaList: [
        { question: '网站功能是什么？', answer: '本网站提供聊天功能，支持文本和图片发送。' },
        { question: '如何使用？', answer: '输入消息并点击发送按钮。' },
        // 添加更多 Q&A
      ],
      chatMessages: [],
      inputMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.inputMessage.trim()) {
        this.chatMessages.push({ type: 'text', content: this.inputMessage });
        this.inputMessage = '';
        this.scrollToBottom();
      }
    },
    sendEncryptedMessage() {
      // 这里可以添加加密逻辑
      if (this.inputMessage.trim()) {
        this.chatMessages.push({ type: 'text', content: `加密: ${this.inputMessage}` });
        this.inputMessage = '';
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatList = this.$refs.chatList;
        chatList.scrollTop = chatList.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.chat-page {
  display: flex;
  height: 100vh;
}

.qa-section {
  width: 30%;
  border-right: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}

.logo {
  text-align: center;
  margin-bottom: 20px;
}

.qa-list {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.qa-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
}

.chat-section {
  width: 70%;
  display: flex;
  flex-direction: column;
}

.chat-list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f1f1f1;
  border-left: 1px solid #ccc;
}

.chat-message {
  margin-bottom: 10px;
}

.input-area {
  display: flex;
  padding: 10px;
  background: #fff;
}

textarea {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  flex-direction: column; /* 垂直排列按钮 */
  justify-content: space-between; /* 按钮之间的间距 */
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;
  margin-bottom: 5px; /* 按钮之间的间距 */
}

button:hover {
  background: #0056b3;
}
</style>
