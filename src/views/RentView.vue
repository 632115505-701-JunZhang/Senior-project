<template>
  <el-container>
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <el-container>
      <!-- Header 标头-->
      <el-header>
        <h3 class="Rent_title">Rent</h3>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card class="box-card" :v-model="card">
          <template #header>
            <div class="card-header">
              <el-row>
                <el-select v-model="house.city" placeholder="City">
                  <el-option label="Chiang Mai" :value="card.chiangmai" />
                  <!-- <el-option label="Bangkok" :value="card.bangkok" /> -->
                </el-select>
                &ensp; &ensp; &ensp;
                <!--学校选择-->
                <el-select v-model="house.address" placeholder="University">
                  <el-option label="CMU" :value="card.cmu" />
                  <el-option label="CMRU" :value="card.cmru" />
                </el-select>
                &ensp; &ensp; &ensp;
              </el-row>
            </div>
          </template>
          <el-form rules="rules">
            <!--日期期间选择-->
            <el-form-item label="Expect rent date">
              <!--起始时间-->
              <el-row>
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
                </div>
                <!--结束时间-->
                <div class="demo-date-picker">
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
              </el-row>
            </el-form-item>
            <!--房型选择-->
            <el-form-item label="Expect room type">
              <el-select v-model="house.room_type" placeholder="Room type">
                <el-option label="Single room" :value="card.room_type_single" />
                <el-option label="Whole set" :value="card.room_type_wholeSet" />
                <el-option label="House" :value="card.room_type_house" />
              </el-select>
            </el-form-item>
            <!--价格选择-->
            <el-form-item label="Expect rent price">
              <el-input
                v-model="house.price"
                placeholder="Please input"
                clearable
              />
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="search">Search</el-button>
        </el-card></el-main
      >
    </el-container>
  </el-container>
</template>

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

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import Axios from "../Services/AxiosClient";
export default {
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
        city: "",
        address: "",
        start_time: "",
        end_time: "",
        room_type: "",
        price: "",
      },
    };
  },

  components: {
    AsideCom,
  },

  methods: {
    checkValues() {
      if (!this.house.city) {
        alert("Please select city");
        return false;
      }
      if (!this.house.address) {
        alert("Please select university");
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
      return true;
    },
    search() {
      if (!this.checkValues()) {
        return;
      }
      this.house.start_time = this.formatDate(this.house.start_time);
      this.house.end_time = this.formatDate(this.house.end_time);
      Axios.post("http://13.214.205.122:8080/houseSearch", this.house)
        .then((res) => {
          console.log(res);
          var housesString = JSON.stringify(res);
          this.houses = JSON.parse(housesString);
          this.$router.push({
            name: "Find",
            params: { houses: JSON.stringify(this.houses) },
          });
        })
        .catch((error) => {
          alert(error);
        });
      console.log(this.house);
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
