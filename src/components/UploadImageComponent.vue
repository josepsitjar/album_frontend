<template>
  <section
    v-if="upload_section"
    class="page-section"
    id="upload_section"
    ref="upload_section"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12 text-center">
          <h2 class="title-upload">Upload your images</h2>
          <br />
          <!--Form -->
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div class="col-lg-6">
              <form
                id="uploadImageForm"
                @submit.prevent="submitFormUploadImage"
              >
                <!-- Name input-->
                <!--
                            <div class="form-floating mb-3">
                                <input class="form-control" v-model="title" name="title" id="title" type="text" placeholder="Enter the title" data-sb-validations="required" />
                                <label for="title">Title</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Introduce el título.</div>
                            </div>
                            -->

                <!-- Name input-->
                <!--
                            <div class="form-floating mb-3">
                                <input class="form-control" v-model="name" name="name" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label for="name">Nombre</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Debes introducir el nombre.</div>
                            </div>
                            -->
                <!-- Upload Files -->
                <!--<label for="formFileMultiple" class="form-label">Multiple files input example</label>-->
                <!--<input class="form-control" type="file" id="formFileMultiple" multiple />-->

                <!--Autocomplete-->
                <!--https://www.w3schools.com/howto/howto_js_autocomplete.asp-->
                <!-- https://quasar.dev/vue-components/select#filtering-and-autocomplete -->
                <div class="form-floating mb-3">
                  <div class="">
                    <div class="form-control">
                      <q-select
                        hide-bottom-space
                        hide-dropdown-icon
                        borderless
                        v-model="albums_list"
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        :options="options"
                        @filter="filterFn"
                        style=""
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                </div>

                <!-- Description-->
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    v-model="description"
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Enter a description"
                    data-sb-validations="required"
                  />
                  <label for="description"
                    ><i class="text-grey">Add a description</i></label
                  >
                  <div
                    class="invalid-feedback"
                    data-sb-feedback="name:required"
                  >
                    Introduce una descripción.
                  </div>
                </div>

                <!-- Drop Files -->
                <div class="form-floating mb-3">
                  <DropFile ref="dropFileComponent" />
                </div>

                <div class="d-none" id="submitSuccessMessage">
                  <div class="text-center mb-3">
                    <div class="fw-bolder">
                      El formulario se ha enviado correctamente
                    </div>
                    To activate this form, sign up at
                    <br />
                    <a href="https://startbootstrap.com/solution/contact-forms"
                      >https://startbootstrap.com/solution/contact-forms</a
                    >
                  </div>
                </div>

                <div class="d-none" id="submitErrorMessage">
                  <div class="text-center text-danger mb-3">
                    Se ha producido un error!
                  </div>
                </div>
                <div v-if="sucess_message" class="text-success">
                  <p>Successfully uploaded</p>
                </div>
                <!-- Submit Button-->
                <div class="d-grid">
                  <button
                    class="btn btn-primary btn-xl"
                    id="submitButton"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
          <!-- End form -->
        </div>
      </div>
    </div>
  </section>

  <!-- SPINNER -->
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-inner-loading
        :showing="spinner"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";

import { albumStore } from "stores/albums.js";
import { dropImagesStore } from "stores/drop-images.js";
import { userInfo } from "stores/user-info.js";
import DropFile from "./DropFile.vue";

export default defineComponent({
  name: "UploadImageComponent",
  components: { DropFile },
  data() {
    return {
      files: [],
    };
  },
  setup() {
    const spinner = ref(false);

    const albumOptions = [];
    const options = ref(albumOptions);

    // album store
    const albStore = albumStore();
    const albums = ref([]);
    setTimeout(function () {
      albums.value = albStore.getAlbums;

      for (var i = 0; i < albums.value.length; i++) {
        albumOptions.push(albums.value[i].title);
      }
    }, 10);

    return {
      spinner,
      sucess_message: ref(false),
      upload_section: ref(true),
      title: ref(""),
      description: "",

      /* album autocomplete options */
      albums_list: ref(null),
      options,
      albums,
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = albumOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  methods: {
    checkUsrSpace() {
      // user info store
      alert("ckeck user space");
      const userInfStore = userInfo();
      const contractedSize = userInfStore.getContractedSize;
    },
    submitFormUploadImage(e) {
      this.spinner = true; // start spinner
      this.sucess_message = false;

      this.obtainFiles();

      /**
       * Iterate over uploaded files
       */
      for (var i = 0; i < this.files.length; i++) {
        let data = new FormData();
        data.append("title", this.files[i].name);
        data.append("image", this.files[i]);
        data.append("description", this.description);
        // selected value
        data.append("album", this.albums_list);

        var token = localStorage.getItem("token");

        axios
          .post(process.env.API + "photos/", data, {
            headers: {
              Authorization: "Token " + token + "",
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRFToken": token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.messageSend = true;
            document.getElementById("uploadImageForm").reset();
            this.albums_list = "";
            this.description = "";
            this.sucess_message = true;
            // remove images from box
            this.$refs.dropFileComponent.removeAll();

            this.spinner = false; // stop spinner
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    obtainFiles() {
      // drop-images store
      const getImgStore = dropImagesStore();
      this.files = getImgStore.getImages;
    },
  },
});
</script>

<style>
#upload_section {
  margin-top: 50px;
}

.title-upload {
  font-family: "Merriweather Sans", sans-serif;
  font-weight: lighter;
  font-size: 23px;
}
</style>
