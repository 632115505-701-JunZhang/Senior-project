<template>
  <el-form
    label-width="70px"
    class="Login-container"
    :model="form"
    :rules="rules"
    ref="form"
  >
    <h3 class="Login_title">HRM</h3>
    <!--账号-->
    <el-form-item label="Email" prop="email">
      <el-input
        type="email"
        v-model="form.email"
        placeholder="Input your Email"
      ></el-input>
    </el-form-item>
    <!--密码-->
    <el-form-item label="Password" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="Input your Password"
      ></el-input>
    </el-form-item>
    <!--忘记密码-->
    <el-form-item>
      <el-link :underline="false">Forget Password?</el-link>
    </el-form-item>

    <!--登录按钮-->
    <el-form-item>
      <el-row class="Button">
        <el-button type="primary" @click="submitForm('form')">Login</el-button>
        &ensp; &ensp; &ensp; &ensp;&ensp; &ensp;&ensp; &ensp;
        <!--注册按钮-->

        <el-button type="primary" @click="register">Register</el-button>
      </el-row>
    </el-form-item>
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
</style>

<script>
//import { login } from "../Services/LoginService";
import Api from "../Services/AxiosClient.js";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      user: {
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
    //登录
    submitForm() {
      //获取email 和password
      // const email = this.form.email;
      // const password = this.form.password;

      // //确保非空
      // const user = {
      //   email: email,
      //   password: password,
      // };
      // this.$refs.data.validate(async (valid) => {
      //   if (valid) {
      //     alert("Successful");
      //   await login(data);
      //     this.$router.push({ name: "login" });
      //   } else {
      //     console.log("error fail!");
      //     return false;
      //   }
      // });
      // console.log(email);
      // console.log(password);

      this.user.email = this.form.email;
      this.user.password = this.form.password;

      Api.post("/login", this.user)
        .then((response) => {
          // 处理登录成功的响应
          console.log(response.data);
          // 执行其他操作...
        })
        .catch((error) => {
          // 处理登录失败的响应
          console.error(error);
          // 执行其他操作...
        });

      // Api.get("/users")

      //   .then((response) => {
      //     // 处理登录成功的响应
      //     console.log(response.data);
      //     // 执行其他操作...
      //   })
      //   .catch((error) => {
      //     // 处理登录失败的响应
      //     console.error(error);
      //     // 执行其他操作...
      //   });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>
