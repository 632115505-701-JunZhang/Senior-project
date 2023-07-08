<template>
  <el-container>
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <el-container>
      <!-- Header 标头-->
      <el-header>
        <el-form :model="form" label-high="10px" class="conditon">
          <el-row class="condition-set">
            &ensp; &ensp; &ensp;&ensp; &ensp; &ensp;&ensp;
            <!--城市选择-->
            <el-select v-model="form.city" placeholder="City">
              <el-option label="Chiang Mai" :value="form.chiangmai" />
              <el-option label="Bangkok" :value="form.bangkok" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--学校选择-->
            <el-select v-model="form.university" placeholder="University">
              <el-option label="CMU" :value="form.cmu" />
              <el-option label="CHULA" :value="form.chula" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--房型选择-->
            <el-select v-model="form.roomtype" placeholder="Room type">
              <el-option label="Single room" :value="form.type1" />
              <el-option label="Whole set" :value="form.type2" />
              <el-option label="Huouse" :value="form.type3" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--价格选择-->
            <el-select v-model="form.price" placeholder="Price">
              <el-option label="Below 5000" :value="form.below" />
              <el-option label="5000-10000" :value="form.period" />
              <el-option label="Over 10000" :value="form.over" />
            </el-select>
            &ensp; &ensp; &ensp; &ensp; &ensp;
            <!--添加Search 按钮搜索-->
            <el-button type="primary" @click="search">Search</el-button>
          </el-row>
        </el-form>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card :data="card" class="Rentcard">
          <el-avatar :size="50" :src="card.avatar"> user </el-avatar>
          <div>{{ card.username }}</div>
          <div>{{ card.address }}</div>

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="rentdate" label="Rentdate" width="180" />
            <el-table-column prop="room" label="Room" width="180" />
            <el-table-column prop="price" label="Rrice" width="180" />
            <el-table-column prop="shared" label="Shared accomdation" />
          </el-table>

          <el-button type="primary" @click="contact">Contact him</el-button>
        </el-card>

        <!-- <el-card class="Rentcard2">
            <div class="card-header">
              <span>avatar</span>
              <h1>Username</h1>
              <span>adress</span>
            </div>
            <div>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="rentdate" label="Rentdate" width="180" />
                <el-table-column prop="room" label="Room" width="180" />
                <el-table-column prop="price" label="Price" width="180" />
                <el-table-column prop="shared" label="Shared accomdation" />
              </el-table>
            </div>
          </el-card> -->
      </el-main>
      <!-- <router-view></router-view> -->
    </el-container>
  </el-container>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.condition-set {
  margin: 25px auto;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import Axios from "../Services/AxiosClient";

export default {
  data() {
    return {
      form: {
        chiangmai: "Chiang-Mai",
        bangkok: "Bangkok",
        cmu: "CMU",
        chula: "CHULA",
        type1: "Single Room",
        type2: "Whole Set",
        type3: "House",
        below: "5000",
        period: "5000-10000",
        over: "Over-10000",
      },
      card: {
        avatar: "",
        username: "JACKSON",
        address: "XJSIOKAJHNNDOIDOIAH",
      },

      // tableData: [
      //   {
      //     rentdate: "7month",
      //     room: "single",
      //     price: "5000",
      //     shared: "no",
      //   },
      // ],
    };
  },

  methods: {
    search() {
      //获取数据
      Axios.get(
        "http://13.214.205.122:8080/existEmail?email=" + this.form3.email
      )
        .then((res) => {
          alert(res);
          this.$router.push({
            name: "Resetpwd",
            params: { email: this.form3.email },
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
  },

  created() {
    console.log(localStorage.getItem("token"));
  },

  components: {
    AsideCom,
  },
};
</script>
