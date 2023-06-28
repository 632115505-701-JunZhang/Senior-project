<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <el-menu-item index="1">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>Home</span>
      </template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Rent</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><icon-menu /></el-icon>
      <template #title>Manage</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>My House</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><setting /></el-icon>
      <template #title>Chat</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {};
  },
};
</script>
