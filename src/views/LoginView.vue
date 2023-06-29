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
import Axios from "../Services/AxiosClient";

export default {
  data() {
    return {
      form: {
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
      Axios.post("http://18.141.213.44:8080/login", this.form).then((res) => {
        //判断id是否为空 是否存在用户
        //存在账户但是输错密码
        console.log(res);
        // if (res.id != null) {
        //   console.log(this.$message.success(res.message));
        //   if (
        //     (this.form.email != res.email) |
        //     (this.form.password != res.password)
        //   ) {
        //     alert("Email or password is not correct!");
        //   } else {
        //     this.$message.success(res.message);
        //     this.$router.push("/home");
        //   }
        // } else {
        //   this.$message.error(res.message);
        // }
      });
      // .catch((error) => {
      //   console.log(res.message);
      //   console.log(res);
      // });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>
