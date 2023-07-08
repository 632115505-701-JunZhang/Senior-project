<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom />
      </el-aside>
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.common-layout {
  height: 100vh;
  display: flex;
}

el-aside {
  background-color: #f0f0f0;
}

el-container {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
</style>

