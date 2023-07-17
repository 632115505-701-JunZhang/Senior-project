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
        <el-main class="cardmain">
          <!-- <el-radio-group v-model="labelPosition" label="label position">
            <el-radio-button label="right">Right</el-radio-button>
          </el-radio-group> -->
          <el-form label-width="200px" :model="form" style="max-width: 460px">
            <el-form-item label="University">
              <el-input
                v-model="this.card.address"
                placeholder="University"
                style="width: 120px"
              />
            </el-form-item>
            <el-form-item label="Room type">
              <el-select
                v-model="this.card.room_type"
                placeholder="Room type"
                style="width: 120px"
              >
                <el-option label="Single room" :value="form.type1" />
                <el-option label="Whole set" :value="form.type2" />
                <el-option label="House" :value="form.type3" />
              </el-select>
            </el-form-item>
            <el-form-item label="Price">
              <el-input
                v-model="this.card.price"
                style="width: 100px"
                placeholder="Price"
              />
              <span> Baht/Month</span>
            </el-form-item>
            <el-form-item label="Shared Acconmdation">
              <el-select
                v-model="this.card.share_accommodation"
                placeholder="Shared acconmdation"
                style="width: 180px"
              >
                <el-option label="Yes" :value="form.yes" />
                <el-option label="No" :value="form.no" />
              </el-select>
            </el-form-item>
            <el-form-item label="Expect date">
              <el-input
                v-model="this.card.expect_date"
                placeholder="Expect date Like 6"
                style="width: 150px"
              />
              <span> Month</span>
              <!-- </el-row> -->
            </el-form-item>
          </el-form>
          <el-button>
            <el-button type="primary" @click="rentcard">Upload</el-button>
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
.cardmain {
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
        type1: "Single Room",
        type2: "Whole Set",
        type3: "House",
        yes: "Yes",
        no: "No",
      },
      card: {
        address: "",
        room_type: "",
        price: "",
        share_accommodation: "",
        expect_date: "",
        tenant_name: "",
        tenant_id: "",
      },
    };
  },
  components: {
    AsideCom,
  },
  methods: {
    rentcard() {
      if (!this.checkValues()) return;
      var localinfo = JSON.parse(localStorage.getItem("token"));
      this.card.tenant_id = localinfo.tenantid;
      this.card.tenant_name = localinfo.username;
      Axios.post("http://13.214.205.122:8080/setCard", this.card)
        .then((res) => {
          console.log(res);
          alert("Success!");
          location.reload();
        })
        .catch((error) => {
          alert(error);
        });
    },
    checkValues() {
      if (!this.card.address) {
        alert("Please input University");
        return false;
      }
      if (!this.card.room_type) {
        alert("Please select room type");
        return false;
      }
      if (!this.card.price) {
        alert("Please input price");
        return false;
      }
      const price = parseInt(this.card.price);
      if (isNaN(price) || price <= 0) {
        alert("Price must be a positive integer");
        return false;
      }
      if (!this.card.share_accommodation) {
        alert("Please input sharing accommodation details");
        return false;
      }
      if (!this.card.expect_date) {
        alert("Please input expected date");
        return false;
      }
      const expectDate = parseInt(this.card.expect_date);
      if (isNaN(expectDate) || expectDate <= 0) {
        alert("Expect date must be a positive integer");
        return false;
      }
      return true;
    },
  },
};
</script>
