<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom />
        <router-view> </router-view>
      </el-aside>
      <el-container>
        <el-header>
          <h3>Profile</h3>
        </el-header>
        <el-main>
          <el-card class="Profile">
            <template #header>
              <div>
                <template v-if="this.isExist">
                  <el-avatar :size="100" :src="this.user.pic"> user </el-avatar>
                </template>
                <template v-else>
                  <el-avatar :size="100" :src="this.user.pic"> user </el-avatar>
                </template>
              </div>
              <el-button type="primary" class="upload" @click="upload"
                >Upload</el-button
              >
            </template>
            <div>
              <el-form
                label-width="410px"
                :model="form"
                style="max-width: 610px"
              >
                <el-form-item label="User Name" style="font-size: 20px">
                  <el-input v-model="this.user.username" class="input" />
                </el-form-item>
                <el-form-item label="User Email" style="font-size: 20px">
                  <el-input
                    v-model="this.user.email"
                    class="input"
                    disabled="true"
                  />
                </el-form-item>
              </el-form>
            </div>
            <el-button type="primary" class="upload" @click="update"
              >Save</el-button
            >
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsideCom from "../components/AsideCom.vue";
import UserService from "../Services/UserService";
export default {
  data() {
    return {
      isExist: true,
      user: {},
    };
  },

  components: {
    AsideCom,
  },
  mounted() {
    var localinfo = JSON.parse(localStorage.getItem("token"));
    var id = localinfo.id;
    this.getUserInfo(id);
  },
  methods: {
    getUserInfo(id) {
      UserService.getUser(id)
        .then((response) => {
          var res = response.data;
          var UserString = JSON.stringify(res);
          this.user = JSON.parse(UserString);
          console.log(this.user);
          if (this.user.pic == null) this.isExist = false;
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    contact() {},
    update() {
      if (!this.user.username) {
        alert("Please enter a username");
        return;
      }
      UserService.updateUser(this.user)
        .then((response) => {
          alert("Success");
          var res = response.data;
          var UserString = JSON.stringify(res);
          this.user = JSON.parse(UserString);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    upload() {
      this.$router.push({ name: "Upload" });
    },
  },
};
</script>

<style>
.card-header {
  display: flex;
}
.Profile {
  width: 960px;
  margin-left: auto;
  margin-right: auto;
}
.upload {
  margin-top: 10px;
}
.input {
  font-size: 20px;
  width: 150px;
}
</style>
