<template>
  <el-container>
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <el-container>
      <!-- Header 标头-->
      <el-header>
        <h3 class="Rent_title">Add House</h3>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card class="box-card" :v-model="card">
          <template #header>
            <div class="card-header">
              <el-row>
                <!--学校选择-->
                <el-form-item label="University">
                  <el-select
                    v-model="house.university"
                    placeholder="University"
                  >
                    <el-option label="CMU" :value="card.cmu" />
                    <el-option label="CMRU" :value="card.cmru" />
                  </el-select>
                </el-form-item>
              </el-row>
            </div>
          </template>
          <el-form rules="rules">
            <!--日期期间选择-->
            <el-form-item label="Rent date">
              <br />
              <div class="demo-date-picker">
                <div class="block">
                  <span class="demonstration">Start date</span>
                  <el-date-picker
                    v-model="house.start_time"
                    type="date"
                    placeholder="Pick a day"
                    :size="size"
                  />
                </div>
                <div class="block">
                  <span class="demonstration">End date</span>
                  <el-date-picker
                    v-model="house.end_time"
                    type="date"
                    placeholder="Pick a day"
                    :size="size"
                  />
                </div>
              </div>
            </el-form-item>
            <!-- 地址输入 -->
            <el-form-item label="Address" class="floor">
              <el-button type="primary" @click.prevent="openWindow"
                >Location</el-button
              >
              <div v-if="isWindowOpen" class="window">
                <button @click.prevent="closeWindow" class="close-button">
                  Close
                </button>
                <iframe src="/maps.html" @load="setupMap"></iframe>
              </div>
              <el-input
                class="address"
                v-model="house.address"
                placeholder="Please input address"
                clearable
              />
            </el-form-item>
            <!--房型选择-->
            <el-form-item label="Room type">
              <el-select v-model="house.room_type" placeholder="Room type">
                <el-option label="Single room" :value="card.room_type_single" />
                <el-option label="Whole set" :value="card.room_type_wholeSet" />
                <el-option label="House" :value="card.room_type_house" />
              </el-select>
            </el-form-item>
            <!-- 面积选择 -->
            <el-form-item label="Area" class="floor">
              <el-input
                class="floor-input"
                v-model="house.area"
                placeholder="Please input area"
                clearable
              />
            </el-form-item>
            <!--楼层输入-->
            <el-form-item label="Floor" class="floor">
              <el-input
                class="floor-input"
                v-model="house.floor"
                placeholder="Please input floor"
                clearable
              />
            </el-form-item>
            <!--价格输入-->
            <el-form-item label="Rent price">
              <el-input
                v-model="house.price"
                placeholder="Please input price"
                clearable
              />
            </el-form-item>
            <!--备注输入-->
            <el-form-item label=" Mark" class="floor">
              <el-input
                class="floor-input"
                v-model="house.mark"
                placeholder="Please input mark"
                clearable
              />
            </el-form-item>
          </el-form>
          <UploadImages @changed="handleImages" style="width: 720px" />
          <el-button type="primary" style="margin-top: 10px" @click="submit"
            >Submit</el-button
          >
        </el-card></el-main
      >
    </el-container>
  </el-container>
</template>
<script>
import AsideCom from "../components/AsideCom.vue";
import UploadImages from "vue-upload-drop-images";
import HouseService from "../Services/HouseService";
export default {
  components: {
    UploadImages,
    AsideCom,
  },
  data() {
    return {
      card: {
        chiangmai: "Chiang-Mai",
        bangkok: "Bangkok",
        cmu: "CMU",
        cmru: "CMRU",
        date: "",
        price: "",
        room_type: "",
        room_type_single: "Single Room",
        room_type_wholeSet: "Whole Set",
        room_type_house: "House",
        start_time: "",
        end_time: "",
      },
      house: {
        address: "",
        start_time: "",
        end_time: "",
        room_type: "",
        price: "",
        area: "",
        floor: "",
        mark: "",
        house_pic: [],
      },
      files: [],
      isWindowOpen: false,
    };
  },
  methods: {
    openWindow() {
      this.isWindowOpen = true;
    },
    closeWindow() {
      this.isWindowOpen = false;
    },
    setupMap() {
      const iframe = document.querySelector("iframe");
      const mapWindow = iframe.contentWindow;
      const confirm = mapWindow.document.getElementById("confirm");
      confirm.addEventListener("click", () => {
        const address = mapWindow.document.getElementById("autocomplete").value;
        if (address != "") {
          this.house.address = address;
          this.closeWindow();
        } else {
          alert("The place can't be empty");
        }
      });
    },
    checkValues() {
      if (!this.house.university) {
        alert("Please select University");
        return false;
      }
      if (!this.house.address) {
        alert("Please select address");
        return false;
      }
      if (!this.house.start_time) {
        alert("Please select start_time");
        return false;
      }
      if (!this.house.end_time) {
        alert("Please select end_time");
        return false;
      }
      if (this.house.end_time < this.house.start_time) {
        alert("End time is earlier than start time");
        return false;
      }
      if (!this.house.room_type) {
        alert("Please select room type");
        return false;
      }
      if (!this.house.price) {
        alert("Please select rent price");
        return false;
      }
      if (!this.house.floor) {
        alert("Please input floor");
        return false;
      }
      if (!this.house.mark) {
        alert("Please input mark");
        return false;
      }
      return true;
    },
    submit() {
      if (!this.checkValues()) {
        return;
      }
      var localinfo = JSON.parse(localStorage.getItem("token"));
      this.house.user_id = localinfo.id;
      this.house.start_time = this.formatDate(this.house.start_time);
      this.house.end_time = this.formatDate(this.house.end_time);
      Promise.all(
        this.files.map((file) => {
          return HouseService.uploadFile(file);
        })
      ).then((response) => {
        this.house.house_pic = response.map((r) => r.data);
        console.log(this.house.house_pic);
        HouseService.addHouse(this.house)
          .then(() => {
            console.log(this.house);
            alert("Success!");
            this.$router.push({ name: "MyHouse" });
          })
          .catch((error) => {
            alert(error.response.data);
          });
      });
    },
    handleImages(files) {
      this.files = files;
    },
    formatDate(date) {
      if (date) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      return "";
    },
  },
};
</script>

<style>
el-aside {
  background-color: #f0f0f0;
}

el-container {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  width: 820px;
  margin-left: auto;
  margin-right: auto;
}
.floor {
  margin-left: 10px;
}
.floor-input {
  margin-left: 22px;
}
.address {
  margin-left: 3px;
  margin-top: 10px;
}
.window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 20px solid #ccc;
  border-radius: 10px; /* 添加圆角 */
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* 根据地图的大小设置窗口的宽度和高度 */
  width: 800px; /* 自适应宽度 */
  height: 640px; /* 自适应高度 */
  max-width: 100%; /* 最大宽度为100% */
  max-height: 100%; /* 最大高度为100% */
}

/* 打开按钮样式 */
.open-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.open-button:hover {
  background-color: #0056b3;
}
/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #ff5722;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #d84315;
}

.window iframe {
  width: 100%;
  height: 100%;
}
</style>
