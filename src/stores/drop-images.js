import { defineStore } from "pinia";
import axios from "axios";

export const dropImagesStore = defineStore("drop-images", {
  state: () => ({
    images: [],
    error: null,
  }),
  getters: {
    getImages: (state) => state.images,
  },
  actions: {
    async setImages(imgs) {
      try {
        this.images = imgs;
      } catch (error) {
        this.error = error;
      }
    },
  },
});
