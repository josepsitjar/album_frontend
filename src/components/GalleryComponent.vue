<template>
  <!-- Image Gallery-->

  <section v-if="gallery" class="page-section" id="gallery" ref="gallery">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12 text-center">
          <h2 class="galleryTitle">Image Gallery</h2>
          <br />
          <span v-for="(img, index) in imgs" :key="img.id" class="images">
            <q-img
              :src="url_server + img.image"
              spinner-color="white"
              style="height: 240px; max-width: 250px"
              fit="cover"
              @click="openCarousel(index)"
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

  <!-- carrousel images gallery-->
  <q-dialog v-model="carousel" full-width>
    <q-btn
      round
      icon="fa fa-times"
      color="black"
      class="close_button"
      @click="closeCarousel()"
    ></q-btn>
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
        v-for="(img, index) in imgs"
        :key="img.id"
        :name="index"
        :img-src="url_server + img.image"
      ></q-carousel-slide>
    </q-carousel>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { imageStore } from "stores/images.js";

export default defineComponent({
  name: "GalleryComponent",
  setup() {
    const url_server = process.env.PHOTOS;

    const spinner = ref(true);
    // image store
    const imgStore = imageStore();
    const { setImages } = imageStore();
    setImages();

    const imgs = ref([]);
    setTimeout(function () {
      imgs.value = imgStore.getImages;
      spinner.value = false;
    }, 1000);

    return {
      url_server,
      imgs,
      spinner,
      gallery: ref(true),
      carousel: ref(false),
      slide: ref(1),
    };
  },
  methods: {
    openCarousel(index) {
      this.carousel = true;
      this.slide = index;
    },
    closeCarousel() {
      this.carousel = false;
    },
  },
});
</script>

<style>
#gallery {
  margin-top: 50px;
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
  right: 2vw;
  font-size: 10px;
  cursor: pointer;
  pointer-events: auto;
}

.galleryTitle {
  font-family: "Tangerine", serif;
  font-size: 48px;
}
</style>
