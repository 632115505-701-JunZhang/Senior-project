<template>
  <el-form
    label-width="70px"
    class="Fpwd-container"
    :model="form3"
    :rules="rules"
  >
    <h3 class="Fpwd_title">HRM</h3>
    <!--输入确认邮箱-->
    <el-form-item label="Email" prop="email">
      <el-input
        type="email"
        v-model="form3.email"
        placeholder="Vertify your Email"
      ></el-input>
    </el-form-item>

    <!--确认按钮-->
    <el-form-item>
      <el-row class="Button">
        <el-button type="primary" @click="confirm">Confirm</el-button>
        &ensp; &ensp; &ensp; &ensp;&ensp; &ensp;&ensp; &ensp;

        <!--取消按钮-->
        <el-button type="primary" @click="back">Cancel</el-button>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<style>
.Fpwd-container {
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
import UserService from "../Services/UserService";

export default {
  data() {
    return {
      form3: {
        email: "",
      },

      rules: {
        email: [
          {
            required: true,
            message: "Please input your email!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //确认邮箱功能

    confirm() {
      UserService.forgetPassword(this.form3.email).then((response) => {
        let res = response.data;
        alert(res);
        this.$router.push({ name: "Login" });
      });
      // .catch((error) => {
      // });
    },

    //返回按钮
    back() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
