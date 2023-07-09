<template>
  <el-container>
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <el-container class="card-container">
      <!-- Header 标头-->
      <el-header>
        <el-form :model="form" label-high="10px" class="conditon">
          <el-row class="condition-set">
            &ensp; &ensp; &ensp;&ensp; &ensp; &ensp;&ensp;
            <!--添加Reset 按钮搜索-->
            <el-button type="primary" @click="reset">Reset</el-button>
            &ensp; &ensp; &ensp;
            <!--学校选择-->
            <el-select v-model="form.university" placeholder="University">
              <el-option label="CMU" :value="form.cmu" />
              <el-option label="CMRU" :value="form.cmru" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--房型选择-->
            <el-select v-model="form.roomtype" placeholder="Room type">
              <el-option label="Single room" :value="form.type1" />
              <el-option label="Whole set" :value="form.type2" />
              <el-option label="House" :value="form.type3" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--价格选择-->
            <el-select v-model="form.price" placeholder="Price">
              <el-option label="Below 5000" :value="form.below" />
              <el-option label="5000-10000" :value="form.period" />
              <el-option label="Over 10000" :value="form.over" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--价格选择-->
            <el-select v-model="form.acc" placeholder="Shared acconmdation">
              <el-option label="Yes" :value="form.yes" />
              <el-option label="No" :value="form.no" />
            </el-select>
            &ensp; &ensp; &ensp; &ensp; &ensp;
            <!--添加Search 按钮搜索-->
            <el-button type="primary" @click="search">Search</el-button>
          </el-row>
        </el-form>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card v-for="card in cards" class="Rentcard" :key="card.id">
          <!-- <el-avatar :size="50" :src="card.avatar"> user </el-avatar> -->
          <div>{{ card.tenant_name }}</div>
          <div>{{ card.address }}</div>

          <el-table class="tabledata" :data="[card]" stripe style="width: 100%">
            <el-table-column prop="expect_date" label="Rentdate" width="180" />
            <el-table-column prop="room_type" label="Room" width="180" />
            <el-table-column prop="price" label="Price" width="180" />
            <el-table-column
              prop="share_accommodation"
              label="Shared accommodation"
            />
          </el-table>

          <!-- <el-button type="primary" @click="contact">Contact him</el-button> -->
        </el-card>
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
.tabledata {
  width: 180%;
}
.card-container {
  height: 700px;
  overflow: auto;
}
.Rentcard {
  margin-bottom: 20px;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import Axios from "../Services/AxiosClient";

export default {
  data() {
    return {
      form: {
        cmu: "CMU",
        cmru: "CMRU",
        type1: "Single Room",
        type2: "Whole Set",
        type3: "House",
        below: "5000",
        period: "5000-10000",
        over: "Over-10000",
        yes: "Yes",
        no: "No",
        university: "",
        roomtype: "",
        price: "",
        acc: "",
      },
      card: {
        avatar: "",
        username: "JACKSON",
        address: "XJSIOKAJHNNDOIDOIAH",
      },
      cards: [],
    };
  },

  methods: {
    checkValues() {
      if (!this.form.university) {
        alert("Please select university");
        return false;
      }
      if (!this.form.roomtype) {
        alert("Please select roomtype");
        return false;
      }
      if (!this.form.price) {
        alert("Please select price");
        return false;
      }
      if (!this.form.acc) {
        alert("Please select shared acconmdation");
        return false;
      }
      return true;
    },
    reset() {
      Axios.get("http://localhost:8081/getCards")
        .then((res) => {
          // console.log(res);
          var cardsString = JSON.stringify(res);
          this.cards = JSON.parse(cardsString);
          // console.log(this.cards);
        })
        .catch((error) => {
          alert(error);
        });
    },
    search() {
      if (!this.checkValues()) {
        return;
      }
      console.log("uni=" + this.form.university);
      console.log("roomtype=" + this.form.roomtype);
      console.log("price=" + this.form.price);
      console.log("acc=" + this.form.acc);
      Axios.get(
        "http://localhost:8081/cardSearch?" +
          "address=" +
          this.form.university +
          "&room_type=" +
          this.form.roomtype +
          "&price=" +
          this.form.price +
          "&share_accommodation=" +
          this.form.acc
      )
        .then((res) => {
          console.log(res);
          var cardsString = JSON.stringify(res);
          this.cards = JSON.parse(cardsString);
        })
        .catch((error) => {
          alert(error);
        });
    },
  },

  created() {
    console.log(localStorage.getItem("token"));
    //获取数据
    Axios.get("http://localhost:8081/getCards")
      .then((res) => {
        // console.log(res);
        var cardsString = JSON.stringify(res);
        this.cards = JSON.parse(cardsString);
        // console.log(this.cards);
      })
      .catch((error) => {
        alert(error);
      });
  },

  components: {
    AsideCom,
  },
};
</script>
