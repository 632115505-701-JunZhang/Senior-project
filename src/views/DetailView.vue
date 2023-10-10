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
                    <template v-if="this.isExist">
                      <img
                        class="img"
                        v-for="url in this.house.house_pic"
                        :key="url"
                        :src="url"
                      />
                    </template>
                    <template v-else>
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="url"
                        :zoom-rate="1.2"
                        :preview-src-list="srcList"
                        :initial-index="4"
                        fit="cover"
                      />
                    </template>
                  </div>
                </span>
              </div>
            </template>
            <el-descriptions :title="this.username" :data="this.username">
              <el-descriptions-item
                label="University"
                class="descriptions-item"
              >
                <el-tag size="small">{{
                  this.house.university
                }}</el-tag></el-descriptions-item
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
                <el-tag size="small">{{ this.email }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item
                label="Address"
                :class="descriptions - item"
              >
                <el-tag size="small">{{ this.house.address }}</el-tag>
                <span style="opacity: 0"
                  >Extra characters111111</span
                ></el-descriptions-item
              >
            </el-descriptions>
            <div class="button" v-if="this.isSamePerson">
              <el-button type="primary" @click="update(this.house)"
                >Update</el-button
              >
              <el-button
                type="primary"
                style="background-color: #e63f00"
                @click="deleteHouse(this.house.id)"
                >Delete</el-button
              >
            </div>
            <el-button
              v-if="!this.isSamePerson"
              type="primary"
              @click="Contact(this.house.user_id)"
              >Contact him</el-button
            >
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AsideCom from "../components/AsideCom.vue";
import HouseService from "../Services/HouseService";
import MessageService from "../Services/MessageService";
export default {
  data() {
    return {
      house: {},
      username: "",
      email: "",
      isExist: true,
      isSamePerson: false,
    };
  },

  components: {
    AsideCom,
  },
  mounted() {
    var houseString = JSON.parse(this.$route.query.house);
    this.house = houseString;
    var localinfo = JSON.parse(localStorage.getItem("token"));
    var user_id = localinfo.id;
    if (this.house.user_id == user_id) this.isSamePerson = true;
    this.getUserInfo();
    if (this.house.house_pic[0] == "") this.isExist = false;
  },
  methods: {
    getUserInfo() {
      HouseService.getUserById(this.house.user_id)
        .then((response) => {
          console.log(response.data);
          this.email = response.data.email;
          this.username = response.data.username;
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    Contact(HouseUserId) {
      if (
        this.user_id == null ||
        this.user_id == "" ||
        this.HouseUserId == null ||
        this.HouseUserId == ""
      ) {
        alert("user id or card is empty,please login again");
        return;
      }
      const message = {
        text: "",
        time: "",
        send_id: this.user_id,
        receive_id: HouseUserId,
      };
      const id = HouseUserId;
      MessageService.addMessage(message)
        .then(() => {
          this.$router.push({ name: "chat", params: { id } });
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    update(house) {
      if (this.house.house_pic[0] == "") this.house.house_pic = [];
      this.$router.push({
        name: "UpdateHouse",
        query: { house: JSON.stringify(house) },
      });
    },
    deleteHouse(house_id) {
      if (confirm("Are you sure you want to delete?")) {
        HouseService.deleteHouseById(house_id)
          .then((response) => {
            alert(response.data);
            this.$router.push({
              name: "myHouses",
            });
          })
          .catch((error) => {
            alert(error.response.data);
          });
      }
    },
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
}
.House_Detail {
  width: 960px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.descriptions-item {
  width: calc(100% / 3);
  float: left;
}
.img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-right: 30px;
}
.button {
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 20px;
  gap: 5px;
}
.button el-button:nth-child(2) {
  margin-left: auto; /* 将第二个按钮向右推到最右边 */
}
</style>
