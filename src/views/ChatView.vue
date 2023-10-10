<template>
  <div class="container">
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <div class="message-page">
      <!-- 左侧联系人列表 -->
      <div class="contact-list">
        <h2>Contact List</h2>
        <ul>
          <li
            v-for="contact in contacts"
            :key="contact.id"
            @click="selectContact(contact)"
          >
            <div class="contact-info">
              <el-avatar :size="40" :src="contact.partner_pic"></el-avatar>
              <span>{{ contact.partner_name }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 右侧消息窗口 -->
      <div class="message-window">
        <h2 class="chat-content" v-if="selectedContact">
          {{ selectedContact.partner_name }}
        </h2>
        <div class="chat-content" v-if="selectedContact">
          <!-- 聊天记录 -->
          <div ref="chatWindow" class="scrollable-chat" v-if="selectedContact">
            <div>
              <div
                v-for="(message, index) in selectedContact.messages"
                :key="index"
              >
                <div class="word" v-if="!isSamePerson(message.send_id)">
                  <img :src="this.partner_pic" />
                  <div class="info">
                    <p class="time">
                      {{ this.partner_username }} {{ formatDate(message.time) }}
                    </p>
                    <div class="info-content">{{ message.text }}</div>
                  </div>
                  <!-- <el-avatar :size="50" :src="this.your_pic">
                  {{ your_username }}
                </el-avatar> -->
                </div>
                <div class="word-my" v-else>
                  <div class="info">
                    <p class="time">
                      {{ this.my_username }} {{ formatDate(message.time) }}
                    </p>
                    <div class="info-content">{{ message.text }}</div>
                  </div>
                  <img :src="this.user_pic" />
                  <!-- <el-avatar :size="25" :src="this.user_pic">
                  {{ my_username }}
                </el-avatar> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 发送消息输入框和按钮 -->
        <div
          class="send-message"
          v-if="selectedContact && Object.keys(selectedContact).length > 0"
        >
          <div class="input-button-container">
            <textarea
              v-model="newMessage"
              rows="5"
              placeholder="Type your message..."
            ></textarea>
            <button @click="sendMessage">Send</button>
          </div>
        </div>
        <!-- 显示空的聊天界面 -->
        <div class="empty-chat" v-else>
          <p>No contact selected.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideCom from "../components/AsideCom.vue";
import MessageService from "../Services/MessageService";
export default {
  data() {
    return {
      contacts: [
        // { id: 1, name: "Contact 1", messages: [], selected: false },
        // { id: 2, name: "Contact 2", messages: [], selected: false },
        // Add more contacts here
      ],
      selectedContact: {
        messages: {},
      },
      isMessagesEmpty: true,
      newMessage: "",
      my_pic: "",
      partner_pic: "",
      my_id: "",
      partner_id: "",
      my_username: "",
      partner_username: "",
    };
  },
  components: {
    AsideCom,
  },
  mounted() {
    var localinfo = JSON.parse(localStorage.getItem("token"));
    this.my_id = localinfo.id;
    var user_pic = localinfo.pic;
    this.user_pic = user_pic;
    this.my_username = localinfo.username;
    MessageService.getChatPartners(this.my_id)
      .then((response) => {
        this.contacts = response.data;
        if (parseInt(this.$route.params.id) != -1) {
          const id = parseInt(this.$route.params.id);
          var contact = this.contacts.find(
            (contact) => contact.partner_id === id
          );
          this.selectContact(contact);
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  },
  methods: {
    selectContact(contact) {
      this.contacts.forEach((c) => (c.selected = false));
      contact.selected = true;
      this.selectedContact = contact;
      this.partner_username = this.selectedContact.partner_name;
      this.partner_id = this.selectedContact.partner_id;
      this.partner_pic = this.selectedContact.partner_pic;
      MessageService.getMessagesBetweenUsers(this.my_id, this.partner_id)
        .then((response) => {
          if (!this.isMessageEmpty(response.data)) {
            this.selectedContact.messages = response.data;
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          }
        })
        .catch(() => {
          // alert(error.response.data);
          this.selectedContact.messages = {};
        });
    },
    sendMessage() {
      if (this.selectedContact && this.newMessage.trim() !== "") {
        // Simulate sending a message
        const message = {
          text: this.newMessage,
          time: this.formatDate(new Date()),
          send_id: this.my_id,
          receive_id: this.partner_id,
        };
        MessageService.addMessage(message)
          .then((response) => {
            this.selectedContact.messages.push(response.data);
            this.$nextTick(() => {
              this.scrollToBottom();
            });
            this.newMessage = "";
          })
          .catch((error) => {
            alert(error.response.data);
          });
      } else {
        alert("the message cannot be empty");
      }
    },
    scrollToBottom() {
      const chatWindow = this.$refs.chatWindow;
      chatWindow.scrollTop = chatWindow.scrollHeight;
    },
    isSamePerson(id) {
      if (this.my_id == id) return true;
      else return false;
    },
    isMessageEmpty(Messages) {
      if (Messages.length === 1) {
        const firstMessage = Messages[0];
        if (firstMessage.text === "" && firstMessage.time === "") {
          return true;
        }
      }
      return false;
    },
    formatDate(date) {
      if (date) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const seconds = String(dateObj.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
      return "";
    },
  },
};
</script>

<style scoped>
.scrollable-chat {
  height: 400px;
  max-height: 400px; /* 设置消息记录窗口的最大高度，超过此高度将显示滚动条 */
  overflow-y: auto; /* 启用垂直滚动条 */
}
.container {
  display: flex;
}
.message-page {
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 20px;
  width: 1000px; /* 设置消息页面的固定宽度 */
  margin: 0 auto; /* 居中显示 */
}
.contact-list {
  flex: 1;
  padding: 10px;
  border-right: 1px solid #ccc;
}
.contact-list h2 {
  margin-bottom: 10px;
}
.contact-list ul {
  list-style: none;
  padding: 0;
}
.contact-list li {
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.2s;
}
.contact-list li .contact-info {
  display: flex;
  align-items: center;
}

.contact-list li .contact-info el-avatar {
  margin-right: 10px;
}
.contact-list li .contact-info span {
  margin-left: 10px; /* 增加名字和边框之间的距离 */
}
.contact-list li:hover {
  background-color: #f0f0f0;
}
.message-window {
  flex: 3;
  padding: 10px;
}

.message-window h2 {
  margin-bottom: 10px;
}

.chat-content {
  width: 740px;
  padding: 20px;
}

.word {
  display: flex;
  margin-bottom: 20px;
}

.word img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.word .info {
  margin-left: 10px;
}

.word .info .time {
  font-size: 12px;
  color: rgba(51, 51, 51, 0.8);
  margin: 0;
  height: 20px;
  line-height: 20px;
  margin-top: -5px;
}

.word .info .info-content {
  padding: 10px;
  font-size: 14px;
  background: #cac9c9;
  position: relative;
  margin-top: 8px;
  border-radius: 8px;
}

.word .info .info-content::before {
  position: absolute;
  left: -8px;
  top: 8px;
  content: "";
  border-right: 10px solid #cac9c9;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.word-my {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.word-my img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.word-my .info {
  width: 90%;
  margin-left: 10px;
  text-align: right;
}

.word-my .info .time {
  font-size: 12px;
  color: rgba(51, 51, 51, 0.8);
  margin: 0;
  height: 20px;
  line-height: 20px;
  margin-top: -5px;
  margin-right: 10px;
}

.word-my .info .info-content {
  max-width: 70%;
  padding: 10px;
  font-size: 14px;
  float: right;
  margin-right: 10px;
  position: relative;
  margin-top: 8px;
  background: #a3c3f6;
  text-align: left;
  border-radius: 8px; /* 添加圆角样式 */
}

.word-my .info .info-content::after {
  position: absolute;
  right: -8px;
  top: 8px;
  content: "";
  border-left: 10px solid #a3c3f6;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.send-message {
  display: flex;
  flex-direction: column; /* 将输入框和按钮垂直排列 */
  align-items: flex-start; /* 左对齐 */
  margin-top: 10px;
  margin-left: 10px;
}

.input-button-container {
  display: flex;
  align-items: flex-end; /* 将输入框和按钮底部对齐 */
  position: relative; /* 使用相对定位 */
}

textarea {
  flex-grow: 1; /* 输入框自动扩展以占据剩余空间 */
  resize: none; /* 禁止文本框调整大小 */
  padding: 10px;
  margin-right: 10px; /* 添加一些右边距 */
  width: 700px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

button {
  position: absolute; /* 使用绝对定位 */
  bottom: 0; /* 按钮位于容器底部 */
  right: 0; /* 按钮位于容器右侧 */
  margin-right: 20px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px 20px; /* 调整按钮大小和内边距 */
}
button:hover {
  background-color: #0056b3;
}
</style>
