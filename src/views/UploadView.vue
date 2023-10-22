<template>
  <div>
    <span style="font-size: 20px"
      >Please Upload your image here(One image only)</span
    >
    <br />
    <br />
    <UploadImages
      style="width: 300px; margin-left: auto; margin-right: auto"
      @changed="handleImages"
    />
    <br />
    <el-button type="primary" @click="submitForm">Upload</el-button>
  </div>
</template>

<script>
import UserService from "../Services/UserService";
import UploadImages from "vue-upload-drop-images";
export default {
  components: {
    UploadImages,
  },
  data() {
    return {
      files: [],
      pic: null,
      user: {
        id: "",
        pic: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (this.files.length > 1) {
        alert("One image only");
        return;
      }
      Promise.all(
        this.files.map((file) => {
          return UserService.uploadFile(file);
        })
      )
        .then((response) => {
          var newPic = response.map((r) => r.data);
          newPic.forEach((url) => {
            this.pic = url;
            console.log(this.pic);
          });
          var localinfo = JSON.parse(localStorage.getItem("token"));
          var id = localinfo.id;
          var pic = this.pic;
          if (this.vaildNone(id) && this.vaildNone(pic)) {
            let body = JSON.stringify({
              id,
              pic,
            });
            UserService.saveUserPic(body)
              .then(() => {
                alert("Success");
                this.$router.push({ name: "profile" });
              })
              .catch((error) => {
                alert(error.response.data);
              });
          }
        })
        .catch(() => {
          alert("image format must be JPEG, PNG, JPEG, GIF");
          location.reload();
        });
    },
    vaildNone(data) {
      if (data == "") {
        return false;
      }
      return true;
    },
    handleImages(files) {
      this.files = files;
    },
  },
};
</script>
<style></style>
