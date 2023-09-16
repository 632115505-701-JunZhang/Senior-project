<template>
  <el-form
    label-width="70px"
    class="Login-container"
    :model="form1"
    :rules="rules"
  >
    <h3 class="Login_title">HRM</h3>
    <!--账号-->
    <el-form-item label="Email" prop="email">
      <el-input
        type="email"
        v-model="form1.email"
        placeholder="Input your Email"
      ></el-input>
    </el-form-item>
    <!--密码-->
    <el-form-item label="Password" prop="password">
      <el-input
        type="password"
        v-model="form1.password"
        placeholder="Input your Password"
      ></el-input>
    </el-form-item>
    <!--忘记密码-->
    <el-form-item>
      <el-link :underline="false" @click="fpwd">Forget Password?</el-link>
    </el-form-item>

    <!--登录按钮-->
    <el-form-item>
      <el-row class="Button">
        <el-button type="primary" @click="submitForm">Login</el-button>
        &ensp; &ensp; &ensp; &ensp;&ensp; &ensp;&ensp; &ensp;

        <!--注册按钮   ('form')-->

        <el-button type="primary" @click="register">Register</el-button>
      </el-row>
    </el-form-item>
    <!-- <button @click.prevent="openWindow">Oopen</button> -->
    <div v-if="isWindowOpen" class="window">
      <button @click.prevent="closeWindow" class="close-button">Close</button>
      <iframe src="/maps.html" @load="setupMap"></iframe>
    </div>
  </el-form>
</template>

<style>
.Login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
}
.el-input {
  width: 198px;
}
.window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 20px solid #ccc;
  border-radius: 10px; /* 添加圆角 */
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* 根据地图的大小设置窗口的宽度和高度 */
  width: 800px; /* 自适应宽度 */
  height: 640px; /* 自适应高度 */
  max-width: 100%; /* 最大宽度为100% */
  max-height: 100%; /* 最大高度为100% */
}

/* 打开按钮样式 */
.open-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.open-button:hover {
  background-color: #0056b3;
}
/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #d84315;
}

.window iframe {
  width: 100%;
  height: 100%;
}
</style>

<script>
import UserService from "../Services/UserService";
export default {
  data() {
    return {
      isWindowOpen: false,
      form1: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input your email!",
            trigger: "blur",
          },
        ],

        password: [
          {
            required: true,
            message: "Please input your password!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    openWindow() {
      this.isWindowOpen = true;
    },
    closeWindow() {
      this.isWindowOpen = false;
    },
    setupMap() {
      const iframe = document.querySelector("iframe");
      const mapWindow = iframe.contentWindow;
      const confirm = mapWindow.document.getElementById("confirm");
      confirm.addEventListener("click", () => {
        const address = mapWindow.document.getElementById("autocomplete").value;
        if (address != "") {
          console.log(address);
          this.closeWindow();
        } else {
          alert("The place can't be empty");
        }
      });
    },
    // 登录
    submitForm() {
      UserService.login(this.form1)
        .then((response) => {
          let res = response.data;
          //转换字符串
          let rowval = {
            id: res.id,
            email: res.email,
            // landlordid: res.landlord.id,
            // tenantid: res.tenant.id,
            username: res.username,
          };
          //设置taken
          if (
            this.form1.email == res.email &&
            this.form1.password == res.password
          ) {
            this.$message.success(res.message);
            this.$router.push("/home");
            localStorage.setItem("token", JSON.stringify(rowval));
          } else {
            alert(res);
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    register() {
      this.$router.push({ name: "Register" });
    },

    fpwd() {
      this.$router.push({ name: "Fpwd" });
    },
  },
};
</script>
