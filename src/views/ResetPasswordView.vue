<template>
  <div>
    <h2>Reset Password</h2>
    <form @submit.prevent="resetPassword">
      <label for="newPassword">New Password:</label>
      <input
        type="password"
        id="newPassword"
        v-model="newPassword"
        required
      /><br /><br />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import UserService from "../Services/UserService";
export default {
  data() {
    return {
      newPassword: "",
      token: "",
    };
  },
  mounted() {
    // 获取 URL 中的 token 参数值
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    this.token = urlParams.get("token");
  },
  methods: {
    resetPassword() {
      if (!this.newPassword) {
        alert("new password does not be empty");
        return;
      }
      let newPassword = this.newPassword;
      let token = this.token;
      let body = JSON.stringify({
        newPassword,
        token,
      });
      // 发起 POST 请求到后端
      UserService.resetPassword(body)
        .then((response) => {
          alert(response.data);
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          console.error("error:", error.response.data);
        });
    },
  },
};
</script>
