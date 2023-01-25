import { defineStore } from 'pinia';
import axios from 'axios';

export const dropImagesStore = defineStore('drop-images', {
  state: () => ({
    images: [],
    error: null
  }),
  getters: {
    getImages: (state) => state.images,
  },
  actions: {
    async setImages(imgs) {
      
      try {
        this.images = imgs
        console.log('files store')
        console.log(this.images)
      } catch(error){
        this.error = error
      }

    }
  },
});