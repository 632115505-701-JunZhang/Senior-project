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
import Axios from "../Services/AxiosClient";

export default {
  data() {
    return {
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
    // 登录
    submitForm() {
      Axios.post("http://13.214.205.122:8080/login", this.form1)
        .then((res) => {
          this.$message.success(res.message);
          this.$router.push("/home");
        })
        .catch((error) => {
          alert(error);
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
