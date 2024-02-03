<template>
  <span class="albums" @click="openDialog()">
    <q-img style="height: 440px; max-width: 350px">
      <q-icon
        style="height: 440px; max-width: 350px"
        name="fa-solid fa-plus"
        color="primary"
        size="132px"
      />
      <div class="absolute-full text-subtitle1 flex flex-center"></div>
    </q-img>
  </span>
  <!--dialog to create a new album-->
  <q-dialog
    v-model="dialog"
    :maximized="maximizedToogle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card square class="shadow-24" style="width: 100vw; max-width: 100vw">
      <q-card-section class="bg-primary">
        <h4 class="text-h5 text-white q-my-md">
          Create a new album
          <span
            ><q-btn
              flat
              round
              icon="close"
              v-close-popup
              class="float-right"
              style="margin-right: 10px"
            ></q-btn
          ></span>
        </h4>
      </q-card-section>
      <!--Form-->
      <q-card-section>
        <form id="createAlbumForm" @submit.prevent="submitCreateAlbum">
          <!-- Title-->
          <h6 class="text-h5 q-my-md">Title</h6>
          <div class="form-floating mb-3">
            <input
              class="form-control"
              v-model="title"
              name="title"
              id="title"
              type="text"
              placeholder="Enter a title"
              data-sb-validations="required"
            />
            <label for="title"><i class="text-grey">Add a title</i></label>
            <div class="invalid-feedback" data-sb-feedback="name:required">
              Introduce un título.
            </div>
          </div>
          <!-- Description-->
          <h6 class="text-h5 q-my-md">Description</h6>
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
              ><i class="text-grey">Add a decription</i></label
            >
            <div class="invalid-feedback" data-sb-feedback="name:required">
              Introduce una descripción.
            </div>
          </div>
          <!-- Upload photo for album -->
          <h6 class="text-h5 q-my-md">Image Cover</h6>
          <DropSingleFile ref="dropSingleFileComponent" />
          <br />
          <!-- Submit Button-->
          <div class="d-grid text-center" style="width: 100px">
            <button
              class="btn btn-primary btn-xl"
              id="submitButton"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import DropSingleFile from "./DropSingleFile.vue";
import { dropImagesStore } from "stores/drop-images.js";
import { albumStore } from "stores/albums.js";
import axios from "axios";

export default defineComponent({
  name: "CreateAlbum",
  components: { DropSingleFile },
  props: {},
  setup() {
    return {
      dialog: ref(false),
      maximizedToogle: ref(true),
      files: [],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    submitCreateAlbum(e) {
      let data = new FormData();
      data.append("title", this.title);
      data.append("description", this.description);
      data.append("user", localStorage.getItem("userId"));

      // get album image
      this.obtainFiles();
      data.append("image", this.files[0]);

      var token = localStorage.getItem("token");
      axios
        .post(process.env.API + "albums/", data, {
          headers: {
            Authorization: "Token " + token + "",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.title = "";
          this.description = "";
          this.dialog = false;
          // remove images from box
          this.$refs.dropSingleFileComponent.removeAll();

          // refresh albums section from Private Page
          const albStore = albumStore();
          const { setAlbums } = albumStore();
          const { getAlbums } = albumStore();
          setAlbums();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    obtainFiles() {
      // drop-images store
      const getImgStore = dropImagesStore();
      this.files = getImgStore.getImages;
    },
  },
});
</script>
