<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <AsideCom /> <router-view> </router-view
      ></el-aside>
      <el-container>
        <el-header>
          <h3 class="Rentcard">Rent Card</h3>
        </el-header>
        <el-main>
          <!-- <el-radio-group v-model="labelPosition" label="label position">
            <el-radio-button label="right">Right</el-radio-button>
          </el-radio-group> -->
          <el-form label-width="100px" :model="form" style="max-width: 460px">
            <el-form-item label="Name">
              <el-input v-model="form.username" readonly />
            </el-form-item>
            <el-form-item label="Room type">
              <el-select v-model="form.roomtype" placeholder="Room type">
                <el-option label="Single room" :value="form.type1" />
                <el-option label="Whole set" :value="form.type2" />
                <el-option label="House" :value="form.type3" />
              </el-select>
            </el-form-item>
            <el-form-item label="Price">
              <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="Shared Acconmdation">
              <el-select v-model="form.acc" placeholder="Shared acconmdation">
                <el-option label="Yes" :value="form.yes" />
                <el-option label="No" :value="form.no" />
              </el-select>
            </el-form-item>
            <el-form-item label="Rent date">
              <!--起始时间-->
              <!-- <el-row> -->
              <div class="demo-date-picker">
                <div class="block">
                  <span class="demonstration">Start date</span>
                  <el-date-picker
                    v-model="house.start_time"
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
                    v-model="house.end_time"
                    type="date"
                    placeholder="Pick a day"
                    :size="size"
                  />
                </div>
              </div>
              <!-- </el-row> -->
            </el-form-item>
          </el-form>
          <el-button>
            <el-button type="primary" @click="rentcard">Upload </el-button>
          </el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
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
      form: {
        username: "",
        roomtype: "",
        price: "",
        type1: "Single Room",
        type2: "Whole Set",
        type3: "House",
        yes: "Yes",
        no: "No",
      },
      house: {
        start_time: "",
        end_time: "",
      },
    };
  },
  components: {
    AsideCom,
  },
  methods: {
    rentcard() {},
  },
};
</script>
