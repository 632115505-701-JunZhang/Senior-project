<template>
  <el-form
    label-width="70px"
    class="Register-container"
    :model="form2"
    :rules="rules"
  >
    <h3 class="Register_title">Register</h3>

    <!--用户名-->
    <el-form-item label="Username" prop="Username">
      <el-input
        type="username"
        v-model="form2.username"
        placeholder="Input your Username"
      ></el-input>
    </el-form-item>

    <!--账号-->
    <el-form-item label="Email" prop="email">
      <el-input
        type="email"
        v-model="form2.email"
        placeholder="Input your Email"
      ></el-input>
    </el-form-item>

    <!--密码-->
    <el-form-item label="Password" prop="password1">
      <el-input
        type="password"
        v-model="form2.password"
        placeholder="Input your Password"
      ></el-input>
    </el-form-item>

    <!--确认密码-->
    <!-- <el-form-item label="Confirm" prop="password2">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="Input your Password"
      ></el-input>
    </el-form-item> -->

    <!--登录按钮-->
    <el-form-item>
      <el-row class="Button">
        <el-button type="primary" @click="register">Register</el-button>
        &ensp; &ensp; &ensp; &ensp;&ensp; &ensp;&ensp; &ensp;

        <!--注册按钮-->
        <el-button type="primary" @click="cancel">Cancel</el-button>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<style>
.Register-container {
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
      form2: {
        username: "",
        email: "",
        password: "",
        // password2: "",
      },
      rules: {
        text: [
          {
            required: true,
            message: "Please input your Username",
            trigger: "blur",
          },
        ],
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
        // password2: [
        //   {
        //     required: true,
        //     message: "Please input your password!",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  methods: {
    register() {
      Axios.post("http://13.214.205.122:8080/register", this.form2)
        .then((res) => {
          console.log(res);
          alert(res);
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          alert(error);
        });
    },
    cancel() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
