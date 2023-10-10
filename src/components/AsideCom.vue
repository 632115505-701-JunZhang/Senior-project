<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <el-avatar :size="55" :src="this.pic"></el-avatar>
    </el-menu-item>
    <el-menu-item index="1">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <el-button @click="home"> Home </el-button>
      </template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <el-button @click="rent"> Rent </el-button>
    </el-menu-item>
    <el-menu-item index="3" v-if="isTenant">
      <el-icon><icon-menu /></el-icon>
      <el-button @click="manage"> Card Manage </el-button>
    </el-menu-item>
    <el-menu-item index="4" v-if="!isTenant">
      <el-icon><setting /></el-icon>
      <el-button @click="myhouse"> House Manage </el-button>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <el-button @click="chat"> Chat </el-button>
    </el-menu-item>
    <el-menu-item index="6">
      <el-icon><setting /></el-icon>
      <el-button @click="setting"> Setting </el-button>
    </el-menu-item>
    <el-menu-item>
      <el-icon><setting /></el-icon>
      <el-button @click="logout"> Logout </el-button>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      isTenant: false,
      pic: null,
    };
  },
  mounted() {
    var localinfo = JSON.parse(localStorage.getItem("token"));
    this.pic = localinfo.pic;
    var actor = localinfo.actor;
    console.log(this.pic);
    if (actor == "Tenant") {
      this.isTenant = true;
    } else this.isTenant = false;
  },
  methods: {
    logout() {
      localStorage.clear;
      this.$router.push({ name: "Login" });
    },

    home() {
      this.$router.push({ name: "Home" });
    },
    rent() {
      this.$router.push({ name: "Rent" });
    },
    manage() {
      this.$router.push({ name: "Manage" });
    },
    myhouse() {
      this.$router.push({ name: "MyHouse" });
    },
    chat() {
      var id = -1;
      this.$router.push({ name: "chat", params: { id } });
    },
    setting() {
      this.$router.push({ name: "setting" });
    },
  },
};
</script>
