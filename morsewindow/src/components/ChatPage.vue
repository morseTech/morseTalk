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
          <div v-if="msg.time">{{ localTime(msg.time) }}</div>
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
import { ref, onMounted } from 'vue';
import { getMessages, saveMessage } from '../services/api';


export default {
    setup() {
    let chatMessages = ref();

    onMounted(async () => {
      const res = await getMessages();
      chatMessages.value = res.data;
    });

    return {
      chatMessages
    };
  },
  data() {
    return {
      qaList: [
        { question: '网站功能是什么？', answer: '本网站提供聊天功能，支持文本和图片发送。' },
        { question: '如何使用？', answer: '输入消息并点击发送按钮。' },
        // 添加更多 Q&A
      ],
      // chatMessages: [],
      inputMessage: ''
    };
  },
  methods: {
    localTime(timestamp) {
      const timestampInt = parseInt(timestamp)
      const date = new Date(timestampInt);
      return date.toLocaleString(navigator.language, {
        dateStyle: 'short',
        timeStyle: 'short',
        hour12: false
      });
    },
    sendMessage() {
      if (this.inputMessage.trim()) {
        const message = {time: new Date().getTime(), type: 'text', content: this.inputMessage}
        // this.chatMessages.push(message);
        saveMessage(message);
        this.inputMessage = '';
        this.scrollToBottom();
      }
    },
    sendEncryptedMessage() {
      console.log(this.chatMessages)
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
  flex-direction: row; /* 默认横向布局 */
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

/* 媒体查询 */
@media (max-width: 768px) {
  .chat-page {
    flex-direction: column; /* 小屏幕上垂直布局 */
  }

  .qa-section {
    width: 100%; /* 左侧部分占满宽度 */
    border-right: none; /* 移除右边框 */
    border-bottom: 1px solid #ccc; /* 添加下边框 */
  }

  .chat-section {
    width: 100%; /* 右侧部分占满宽度 */
  }

  .input-area {
    flex-direction: column; /* 输入区域垂直排列 */
  }

  textarea {
    margin-right: 0; /* 移除右边距 */
    margin-bottom: 10px; /* 添加下边距 */
  }

  .button-group {
    flex-direction: row; /* 按钮横向排列 */
  }

  button {
    margin-bottom: 0; /* 移除按钮之间的下边距 */
    margin-right: 10px; /* 添加右边距 */
  }
}
</style>
