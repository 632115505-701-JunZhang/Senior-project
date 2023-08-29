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
          <h4>{{ this.username }}</h4>
          <br />
        </div>
      </el-header>
      <!-- Main 主体区域-->
      <el-main>
        <el-card v-for="card in cards" class="Rentcard" :key="card.id">
          <!-- <el-avatar :size="50" :src="card.avatar"> user </el-avatar> -->
          <div>{{ card.id }} {{ card.address }}</div>
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
          <div class="button">
            <el-button type="primary" @click="update(card)">Update</el-button>
            <el-button
              type="primary"
              style="background-color: #e63f00"
              @click="deletecard(card.id)"
              >Delete</el-button
            >
          </div>
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
  margin-top: 10px;
  margin-bottom: 10px;
  width: 770px;
  margin-left: auto;
  margin-right: auto;
  height: 173px;
  position: relative;
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

<script>
import AsideCom from "../components/AsideCom.vue";
import CardService from "../Services/CardService";
export default {
  data() {
    return {
      cards: [],
      username: "",
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
    update(card) {
      this.$router.push({
        name: "UpdateCard",
        query: { card: JSON.stringify(card) },
      });
    },
    deletecard(id) {
      if (confirm("Are you sure you want to delete?")) {
        CardService.deleteCardById(id)
          .then(() => {
            alert("Success");
            location.reload();
          })
          .catch((error) => {
            alert(error.response.data);
          });
      }
    },
  },
  created() {
    var localinfo = JSON.parse(localStorage.getItem("token"));
    var tenant_id = localinfo.tenantid;
    this.username = localinfo.username;
    //获取数据
    CardService.getCardsByTenantId(tenant_id)
      .then((response) => {
        let res = response.data;
        var cardsString = JSON.stringify(res);
        this.cards = JSON.parse(cardsString);
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
