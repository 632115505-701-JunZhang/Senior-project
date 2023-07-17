<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom />
        <router-view> </router-view>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <h3 class="Manage">Manage</h3>
          </div>
        </el-header>
        <el-main>
          <el-button type="primary" @click="add">Add Card </el-button>
          <el-button type="primary" @click="rentcard">My Rent Card </el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style></style>

<script>
import AsideCom from "../components/AsideCom.vue";
export default {
  data() {
    return {};
  },
  components: {
    AsideCom,
  },
  methods: {
    add() {
      this.$router.push({ name: "Addcard" });
    },
  },
};
</script>
