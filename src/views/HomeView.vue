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
          <div>{{ console.log(card) }}</div>
          <div>{{ card.tenant_name }}</div>
          <div>{{ card.address }}</div>

          <el-table
            class="tabledata"
            :data="[card]"
            stripe
            style="width: 100%"
            :row-key="card.id"
          >
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
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import Axios from "../Services/AxiosClient";

export default {
  data() {
    return {
      form: {
        cmu: "CMU",
        chula: "CHULA",
        type1: "Single Room",
        type2: "Whole Set",
        type3: "House",
        below: "5000",
        period: "5000-10000",
        over: "Over-10000",
        yes: "Yes",
        no: "No",
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
    //获取数据
    Axios.get("http://13.214.205.122:8080/getCards")
      .then((res) => {
        console.log(res);
        var cardsString = JSON.stringify(res);
        this.cards = JSON.parse(cardsString);
        console.log(this.cards);
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
