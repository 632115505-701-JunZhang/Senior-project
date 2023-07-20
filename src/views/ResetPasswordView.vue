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
      console.log(this.token);
      console.log(this.newPassword);
      if (!this.newPassword) {
        alert("new password does not be empty");
        return;
      }
      // 发起 POST 请求到后端
      fetch("http://13.214.205.122:8080/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: this.newPassword,
          token: this.token,
        }),
      })
        .then((response) => {
          // 根据后端返回的结果进行处理
          if (response.ok) {
            alert(response.data);
            this.$router.push({ name: "Login" });
            // 可以跳转到登录页面或其他操作
          } else {
            alert("Failed,please retry.");
          }
        })
        .catch((error) => {
          console.error("error:", error);
        });
    },
  },
};
</script>
