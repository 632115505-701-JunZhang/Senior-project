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
                  <el-option label="CHULA" :value="card.chula" />
                </el-select>
                &ensp; &ensp; &ensp;
              </el-row>
              <!-- <el-table
                class="tabledata"
                :data="[card]"
                stripe
                style="width: 100%"
                :row-key="card.id"
              >
                <el-input
                  type="text"
                  label="Expect rent date"
                  :model-value="card.date"
                ></el-input>
                />
              </el-table> -->
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
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
        chula: "CHULA",
      },
    };
  },

  components: {
    AsideCom,
  },
};
</script>
