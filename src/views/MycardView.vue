<template>
  <el-container>
    <el-aside width="200px">
      <AsideCom />
      <router-view> </router-view>
    </el-aside>
    <el-container class="card-container">
      <el-header>
        <div>
          <h3>My Cards</h3>
        </div>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card v-for="card in cards" class="Rentcard" :key="card.id">
          <!-- <el-avatar :size="50" :src="card.avatar"> user </el-avatar> -->
          <div>{{ card.tenant_name }}</div>
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
  margin-left: auto;
  margin-right: auto;
}
.Rentcard {
  margin-bottom: 20px;
  width: 960px;
  margin-left: auto;
  margin-right: auto;
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
      Axios.get("http://13.214.205.122:8080/getCards")
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
        "http://13.214.205.122:8080/cardSearch?" +
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
    var localinfo = JSON.parse(localStorage.getItem("token"));
    var tenant_id = localinfo.tenantid;
    //获取数据
    Axios.get(
      "http://13.214.205.122:8080/getCardsByTenantid?tenantid=" + tenant_id
    )
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
