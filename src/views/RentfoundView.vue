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
          <el-card v-for="house in houses" class="Housecard" :key="house.id">
            <!-- <el-avatar :size="50" :src="card.avatar"> user </el-avatar> -->
            <div>{{ house.landlord_name }}</div>
            <div>{{ house.address }}</div>

            <el-table
              class="tabledata"
              :data="[house]"
              stripe
              style="width: 100%"
              :header-align="'center'"
              border:align="'center'"
            >
              <el-table-column
                prop="start_time"
                label="Start_time"
                width="180"
              />
              <el-table-column prop="end_time" label="End_time" width="180" />
              <el-table-column prop="area" label="Area" width="180" />
              <el-table-column prop="floor" label="Floor" width="180" />
              <el-table-column prop="room_type" label="Room Type" width="180" />
              <el-table-column prop="price" label="Price" width="180" />
              <el-table-column prop="mark" label="Mark" width="180" />
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
    };
  },
  components: {
    AsideCom,
  },
  created() {
    const housesString = this.$route.params.houses;
    this.houses = JSON.parse(housesString);
    console.log("find=" + this.houses);
  },
};
</script>
