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
                <el-select v-model="card.city" placeholder="City">
                  <el-option label="Chiang Mai" :value="card.chiangmai" />
                  <el-option label="Bangkok" :value="card.bangkok" />
                </el-select>
                &ensp; &ensp; &ensp;
                <!--学校选择-->
                <el-select v-model="card.university" placeholder="University">
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
                      v-model="card.value1"
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
                      v-model="card.value2"
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
              <el-select v-model="card.roomtype" placeholder="Room type">
                <el-option label="Single room" :value="card.type1" />
                <el-option label="Whole set" :value="card.type2" />
                <el-option label="Huouse" :value="card.type3" />
              </el-select>
            </el-form-item>
            <!--价格选择-->
            <el-form-item label="Expect rent price">
              <el-input
                v-model="card.price"
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
        type1: "Single Room",
        type2: "Whole Set",
        type3: "House",
        value1: "",
        value2: "",
      },
    };
  },

  components: {
    AsideCom,
  },

  methods: {
    search() {
      console.log(this.card.value1);
    },
  },
};
</script>
