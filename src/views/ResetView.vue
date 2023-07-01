<template>
  <el-form label-width="70px" class="Resetpwd-container" :model="form">
    <h3 class="Resetpwd_title">HRM</h3>
    <h4 class="Resetpwd_title">Change password</h4>
    <!--输入确认邮箱-->
    <el-form-item label="Email" prop="email">
      <el-input
        type="email"
        v-model="form.email"
        placeholder="Vertify your Email"
        readonly
      ></el-input>
    </el-form-item>
    <!--输入确认密码-->
    <el-form-item label="Password" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="Input your Password"
      ></el-input>
    </el-form-item>

    <!--确认按钮-->
    <el-form-item>
      <el-row class="Button">
        &ensp;&ensp; &ensp;&ensp; &ensp; &ensp;&ensp;&ensp;
        <el-button type="primary" @click="submit">Submit</el-button>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<style>
.Resetpwd-container {
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
    };
  },
  created() {
    this.form.email = this.$route.params.email;
  },
  methods: {
    //确认邮箱功能
    submit() {
      Axios.post(
        "http://13.214.205.122:8080/resetPassword?email=" +
          this.form.email +
          "&password=" +
          this.form.password
      )
        .then((res) => {
          console.log(res);
          alert(res);
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
