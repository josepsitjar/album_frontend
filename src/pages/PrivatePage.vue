<template>
  <q-page>
    <!-- Navigation-->
    <nav
      class="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNavPrivate"
    >
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand">Picbook</a>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto my-2 my-lg-0">
            <li class="nav-item">
              <a class="nav-link link_menu" @click="open_gallery">Gallery</a>
            </li>
            <li class="nav-item">
              <a class="nav-link link_menu" @click="open_album">Albums</a>
            </li>
            <li class="nav-item">
              <a class="nav-link link_menu" @click="open_map">Map</a>
            </li>
            <li class="nav-item">
              <a class="nav-link link_menu" @click="upload_data">Upload</a>
            </li>
            <li>
              <button
                onclick="location.href='/';"
                @click="logout"
                class="btn nav-item"
              >
                <i class="fa fa-sign-out"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Image Gallery-->
    <GalleryComponent v-if="gallery" />
    <!-- Map -->
    <MapComponent v-if="map_component" />
    <!-- Upload Data-->
    <UploadImageComponent v-if="upload_page" />

    <!-- Album Image Gallery -->
    <section
      v-if="gallery_album"
      class="page-section"
      id="gallery_album"
      ref="gallery_album"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <h2 class="albumTitle">{{ selectedAlbumDescription }}</h2>
            <br />
            <span
              v-for="(img, index) in album_images"
              :key="img.id"
              class="images"
            >
              <q-img
                :src="url_server + img.image"
                spinner-color="white"
                style="height: 240px; max-width: 250px"
                fit="cover"
                @click="openAlbumCarousel(index)"
              >
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{ img.description }}
                </div>
              </q-img>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Albums -->
    <section v-if="album" class="page-section" id="album" ref="album">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <h2 class="albumTitle">Album collection</h2>
            <br />
            <span v-for="album in albums" :key="album.id" class="albums">
              <q-img
                :src="url_server + album.image"
                spinner-color="white"
                style="height: 440px; max-width: 350px"
                fit="cover"
                @click="showAlbumImages(album.pk, album.description)"
              >
                <div class="absolute-full text-subtitle1 flex flex-center">
                  {{ album.description }}
                </div>
              </q-img>
            </span>
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
  </q-page>

  <!-- carrousel images album-->
  <q-dialog v-model="carousel_album" full-width>
    <q-btn
      round
      icon="fa fa-times"
      color="black"
      class="close_button"
      @click="closeAlbumCarousel()"
    ></q-btn>
    <DeleteImage
      :imageObj="getImage()"
      @closeCarousel="closeCarouselAfterDelete"
    />
    <q-carousel
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      arrows
      v-model="slide"
      control-color="primary"
      thumbnails
      infinite
      class="bg-white shadow-1 rounded-borders"
      height="80vh"
    >
      <q-carousel-slide
        v-for="(img, index) in album_images"
        :key="img.id"
        :name="index"
        :img-src="url_server + img.image"
      ></q-carousel-slide>
    </q-carousel>
  </q-dialog>
  {{ slide }}
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import VueSmoothScroll from "vue3-smooth-scroll";

import GalleryComponent from "components/GalleryComponent.vue";
import MapComponent from "components/MapComponent.vue";
import UploadImageComponent from "components/UploadImageComponent.vue";
import DeleteImage from "components/DeleteImage.vue";

import { userAuthStore } from "stores/usr-auth";
import { imageStore } from "stores/images.js";
import { albumImageStore } from "stores/album_images.js";
import { albumStore } from "stores/albums.js";
import { imagesLocationStore } from "stores/images_location.js";

import axios from "axios";

export default defineComponent({
  name: "PrivatePage",
  components: {
    GalleryComponent,
    MapComponent,
    UploadImageComponent,
    DeleteImage,
  },
  setup() {
    const url_server = process.env.PHOTOS;

    const spinner = ref(false);

    const authStore = userAuthStore();
    const isAuthenticated = storeToRefs(authStore);

    // album store
    const albStore = albumStore();
    const { setAlbums } = albumStore();
    setAlbums();

    const selectedAlbumDescription = ref();
    const albums = ref([]);
    setTimeout(function () {
      albums.value = albStore.getAlbums;
    }, 1000);

    // album images
    const album_images = ref([]);
    const showAlbumImages = function (albumPk, albumDescription) {
      window.scrollTo(0, 0);
      spinner.value = true;
      // image store
      const albumImgStore = albumImageStore();
      const { setAlbumImages } = albumImageStore();
      setAlbumImages(albumPk);

      album_images.value = [];
      setTimeout(function () {
        selectedAlbumDescription.value = albumDescription;
        album_images.value = albumImgStore.getImages;
        spinner.value = false;
      }, 1000);

      this.gallery = false;
      this.album = false;
      this.gallery_album = true;
    };

    // start loading map data
    // image feature
    const imgLocStore = imagesLocationStore();
    const { setFeature } = imagesLocationStore();
    setFeature();

    return {
      url_server,
      spinner,
      gallery: ref(true),
      album: ref(false),
      map_component: ref(false),
      upload_page: ref(false),
      selectedAlbumDescription,
      gallery_album: ref(false),
      carousel_album: ref(false),
      slide: ref(1),
      VueSmoothScroll,
      isAuthenticated,
      authStore,
      albums,
      album_images,
      showAlbumImages,
    };
  },
  data() {
    return {};
  },
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    openAlbumCarousel(index) {
      window.scrollTo(0, 0);
      this.carousel_album = true;
      this.slide = index;
    },
    closeAlbumCarousel() {
      this.carousel_album = false;
    },
    closeCarouselAfterDelete() {
      this.carousel_album = false;
      this.album_images.splice(this.slide, 1);
    },
    logout() {
      this.$router.push("/private");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user_email");

      this.authStore.noAuthenticated;

      axios
        .get("https://www.picbook.es/apidjrframework/api-auth/logout/")
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    open_gallery() {
      window.scrollTo(0, 0);
      this.gallery = true;
      this.album = false;
      this.gallery_album = false;
      this.map_component = false;
      this.upload_page = false;

      setTimeout(function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    },
    open_album() {
      window.scrollTo(0, 0);
      this.gallery = false;
      this.gallery_album = false;
      this.album = true;
      this.map_component = false;
      this.upload_page = false;

      setTimeout(function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    },
    open_map() {
      window.scrollTo(0, 0);
      this.gallery = false;
      this.gallery_album = false;
      this.album = false;
      this.map_component = true;
      this.upload_page = false;

      setTimeout(function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    },
    upload_data() {
      window.scrollTo(0, 0);
      this.gallery = false;
      this.gallery_album = false;
      this.album = false;
      this.map_component = false;
      this.upload_page = true;

      setTimeout(function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    },
    getImage() {
      /**
       * returns de image object according to current slide
       */
      return this.album_images[this.slide];
    },
  },
  mounted() {},
});
</script>

<style>
#mainNav {
  /*background-color: white;*/
}

#mainNavPrivate .link_menu,
#mainNavPrivate .navbar-brand {
  color: black !important;
}

.link_menu {
  cursor: pointer;
}

#album,
#gallery,
#gallery_album {
  margin-top: 50px;
}

.albums {
  max-width: 250px;
  cursor: pointer;
}

.text-subtitle1 {
  margin: 5px;
}
.q-img__image {
  padding: 5px;
  cursor: pointer;
}

.close_button {
  position: absolute;
  top: 4vh;
  /*right: 2vw*/
  right: 20px;
  font-size: 10px;
  cursor: pointer;
  pointer-events: auto;
}

.deltete_button {
  margin-right: 40px;
}

/* overwritte carrousel style*/
.q-carousel__slide {
  background-size: contain; /* don't crop the image  */
  background-repeat: no-repeat; /* only show the image one time  */
  background-color: black; /* color to fill empty space with  */
}

.q-dialog__inner--fullwidth > div {
  overflow: hidden;
}

.albumTitle {
  font-family: "Tangerine", serif;
  font-size: 48px;
}
</style>
