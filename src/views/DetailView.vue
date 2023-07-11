<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom />
        <router-view> </router-view>
      </el-aside>
      <el-container>
        <el-header>
          <h3 class="House_detial_title">House Details</h3>
        </el-header>
        <el-main>
          <el-card class="House_Detail"  >
            <template #header>
              <div class="card-header">
                <span>
                  <div class="House_picture">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="url"
                      :zoom-rate="1.2"
                      :preview-src-list="srcList"
                      :initial-index="4"
                      fit="cover"
                    />
                  </div>
                </span>
              </div>
            </template>
            <el-descriptions title="Username" :data="houseinformation">
              <el-descriptions-item label="University">{{
                university
              }}</el-descriptions-item>
              <el-descriptions-item label="Address">{{
                address
              }}</el-descriptions-item
              ><el-descriptions-item label="Telephone">{{
                phonenum
              }}</el-descriptions-item>
              <el-descriptions-item label="Location">{{
                location
              }}</el-descriptions-item>

              <el-descriptions-item label="Area">
                <el-tag size="small">{{ area }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Floor">
                <el-tag size="small">{{ floor }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Room Type">
                <el-tag size="small">{{ roomtype }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Price">
                <el-tag size="small">{{ price }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Aviliable Timme">
                <el-tag size="small">{{ availabletime }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Remarks">
                <el-tag size="small">{{ marks }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" @click="contact">Contact him</el-button>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import Axios from "../Services/AxiosClient";
export default {
  data() {
    return {};
  },

  components: {
    AsideCom,
  },
  //   created() {
  //     const urls = [
  //       "C:\Users\Jackson\Desktop\毕业设计\Senior-project\src\assets\kunming.jpg",
  //     ];
  //   },




};
</script>
