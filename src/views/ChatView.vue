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
            <h3>Chat</h3>
          </div>
        </el-header>
        <el-main> </el-main>
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
  methods: {},
};
</script>
