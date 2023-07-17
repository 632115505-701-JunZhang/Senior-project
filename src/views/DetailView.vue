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
          <el-card class="House_Detail">
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
            <el-descriptions
              :title="this.house.landlord_name"
              :data="this.house.landlord_name"
            >
              <el-descriptions-item
                label="University"
                class="descriptions-item"
              >
                <el-tag size="small">{{
                  this.house.address
                }}</el-tag></el-descriptions-item
              >
              <el-descriptions-item
                label="Address"
                :class="descriptions - item"
              >
                <el-tag size="small">{{ this.house.address }}</el-tag>
                <span style="opacity: 0"
                  >Extra characters111111</span
                ></el-descriptions-item
              >
              >
              <!-- <el-descriptions-item label="Location">{{
                location
              }}</el-descriptions-item> -->

              <el-descriptions-item label="Area" class="descriptions-item">
                <el-tag size="small">{{ this.house.area }}</el-tag>
                <span style="opacity: 0"
                  >Extra 111111</span
                ></el-descriptions-item
              >
              >
              <el-descriptions-item label="Floor" class="descriptions-item">
                <el-tag size="small">{{ this.house.floor }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Room Type" class="descriptions-item">
                <el-tag size="small">{{ this.house.room_type }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item label="Price" class="descriptions-item">
                <el-tag size="small">{{ this.house.price }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item
                label="Available Time"
                class="descriptions-item"
              >
                <el-tag size="small">{{ this.house.start_time }}</el-tag>
                to
                <el-tag size="small"> {{ this.house.end_time }}</el-tag>
              </el-descriptions-item>

              <el-descriptions-item
                label="Remarks"
                class="descriptions-item"
                :span="2"
              >
                <el-tag size="small">{{ this.house.mark }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="Email" class="descriptions-item">
                <el-tag size="small">{{ this.house.email }}</el-tag>
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
.House_Detail {
  width: 960px;
  margin-left: auto;
  margin-right: auto;
}
.descriptions-item {
  width: calc(100% / 3);
  float: left;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import Axios from "../Services/AxiosClient";
// import Axios from "../Services/AxiosClient";
export default {
  data() {
    return {
      house: {},
    };
  },

  components: {
    AsideCom,
  },
  mounted() {
    var houseString = JSON.parse(this.$route.query.house);
    this.house = houseString;
    this.getuserinfo();
    console.log(this.house);
    console.log(this.house.id);
    console.log(this.house.address);
  },
  methods: {
    getuserinfo() {
      Axios.get(
        "http://13.214.205.122:8080/userbylandlord/" + this.house.landlord_id
      )
        .then((res) => {
          // console.log(res);
          // var cardsString = JSON.stringify(res);
          // this.cards = JSON.parse(cardsString);
          this.house.email = res.email;
          // console.log(this.cards);
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  //   created() {
  //     const urls = [
  //       "C:\Users\Jackson\Desktop\毕业设计\Senior-project\src\assets\kunming.jpg",
  //     ];
  //   },
};
</script>
