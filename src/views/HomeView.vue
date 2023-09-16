<template>
  <el-container>
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <el-container class="card-container">
      <!-- Header 标头-->
      <el-header class="conditon1">
        <el-form :model="form" label-high="10px">
          <el-row class="condition-set">
            <!--添加Reset 按钮搜索-->
            <el-button type="primary" @click="reset">Reset</el-button>
            &ensp; &ensp; &ensp;
            <!--学校选择-->
            <el-select
              v-model="form.university"
              placeholder="University"
              style="width: 120px"
            >
              <el-option label="CMU" :value="form.cmu" />
              <el-option label="CMRU" :value="form.cmru" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--房型选择-->
            <el-select
              v-model="form.roomtype"
              placeholder="Room type"
              style="width: 140px"
            >
              <el-option label="Single room" :value="form.type1" />
              <el-option label="Whole set" :value="form.type2" />
              <el-option label="House" :value="form.type3" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--价格选择-->
            <el-select
              v-model="form.price"
              placeholder="Price"
              style="width: 140px"
            >
              <el-option label="Below 5000" :value="form.below" />
              <el-option label="5000-10000" :value="form.period" />
              <el-option label="Over 10000" :value="form.over" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--价格选择-->
            <el-select
              v-model="form.acc"
              placeholder="Shared acconmdation"
              style="width: 180px"
            >
              <el-option label="Yes" :value="form.yes" />
              <el-option label="No" :value="form.no" />
            </el-select>
            &ensp; &ensp; &ensp;
            <!--添加Search 按钮搜索-->
            <el-button type="primary" @click="search">Search</el-button>
          </el-row>
        </el-form>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card v-for="card in cards" class="Rentcard1" :key="card.id">
          <el-avatar :size="50" :src="card.img_pic"> user </el-avatar>
          <div>{{ card.user_name }}</div>
          <div>{{ card.address }}</div>

          <el-table class="tabledata" :data="[card]" stripe style="width: 100%">
            <el-table-column label="Rentdate" width="180">
              <template v-slot="scope">
                {{ scope.row.expect_date }} Months
              </template>
            </el-table-column>
            <el-table-column prop="room_type" label="Room" width="180" />
            <el-table-column label="Price" width="180">
              <template v-slot="scope">
                {{ scope.row.price }} Baht/Month
              </template>
            </el-table-column>
            <el-table-column
              prop="share_accommodation"
              label="Shared accommodation"
            />
          </el-table>

          <el-button type="primary" @click="contact">Contact him</el-button>
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
  margin-left: auto;
  margin-right: auto;
}
.Rentcard1 {
  margin-bottom: 40px;
  height: 230px;
  width: 960px;
  margin-left: auto;
  margin-right: auto;
}
.conditon1 {
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
import CardService from "../Services/CardService";

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
      location.reload();
    },
    search() {
      if (!this.checkValues()) {
        return;
      }
      const card = {
        address: this.form.university,
        room_type: this.form.roomtype,
        price: this.form.price,
        share_accommodation: this.form.acc,
      };
      console.log(card);
      CardService.searchCards(
        this.form.university,
        this.form.roomtype,
        this.form.price,
        this.form.acc
      )
        .then((response) => {
          let res = response.data;
          var cardsString = JSON.stringify(res);
          this.cards = JSON.parse(cardsString);
          console.log(this.cards);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },

  mounted() {
    CardService.getCards()
      .then((response) => {
        let res = response.data;
        var cardsString = JSON.stringify(res);
        this.cards = JSON.parse(cardsString);
        console.log(this.cards);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  },

  components: {
    AsideCom,
  },
};
</script>
