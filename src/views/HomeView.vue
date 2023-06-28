<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom />
        <router-view> </router-view>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!--路由出口-->
          <!--此处为渲染的区域-->

          Main</el-main
        >
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsideCom from "../components/AsideCom.vue";

export default {
  data() {
    return {};
  },

  components: {
    AsideCom,
  },
};
</script>
