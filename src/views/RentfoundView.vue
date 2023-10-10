<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom />
        <router-view> </router-view>
      </el-aside>
      <el-container>
        <el-header>
          <h3 class="Rentfind_title">Rent Find</h3>
        </el-header>
        <el-main>
          <h2 v-if="this.isHouseEmpty">Not Find Houses!</h2>
          <el-card
            v-for="house in houses"
            class="Housecard"
            :key="house.id"
            v-else
          >
            <!-- <el-avatar :size="50" :src="card.avatar"> user </el-avatar> -->
            <!-- <div>{{ house.landlord_name }}</div> -->
            <div>{{ house.address }}</div>

            <el-table
              class="tabledata"
              :data="[house]"
              stripe
              style="width: 960px"
            >
              <el-table-column
                prop="start_time"
                label="Start_time"
                width="120"
                fixed
              />
              <el-table-column
                prop="end_time"
                label="End_time"
                width="120"
                fixed
              />
              <el-table-column prop="area" label="Area" width="120" fixed />
              <el-table-column prop="floor" label="Floor" width="120" />
              <el-table-column
                prop="room_type"
                label="Room Type"
                width="120"
                fixed
              />
              <el-table-column prop="price" label="Price" width="120" fixed />
              <el-table-column prop="mark" label="Mark" width="120" fixed />
              <el-table-column width="120">
                <el-button
                  @click="handleClick(JSON.parse(JSON.stringify(house)))"
                  >Detail</el-button
                >
              </el-table-column>
            </el-table>

            <!-- <el-button type="primary" @click="contact">Contact him</el-button> -->
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.Housecard {
  margin-bottom: 20px;
  width: 960px;
  margin-left: auto;
  margin-right: auto;
}
.tabledata {
  width: 180%;
}
</style>

<script>
import AsideCom from "../components/AsideCom.vue";
export default {
  data() {
    return {
      houses: [],
      house: {},
      isHouseEmpty: false,
    };
  },
  components: {
    AsideCom,
  },
  created() {
    const housesString = this.$route.params.houses;
    this.houses = JSON.parse(housesString);
    console.log(this.houses);
    if (this.houses.length == 0) this.isHouseEmpty = true;
  },
  methods: {
    handleClick(house) {
      console.log(house);
      this.$router.push({
        name: "Detail",
        query: { house: JSON.stringify(house) },
      });
    },
  },
};
</script>
