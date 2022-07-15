import { defineStore } from 'pinia';
import axios from 'axios';

export const imageStore = defineStore('images', {
  state: () => ({
    images: [],
    error: null
  }),
  getters: {
    getImages: (state) => state.images,
  },
  actions: {
    async setImages() {
      this.images = []

      try {
        this.images = await fetch('http://127.0.0.1:8000/photos/?format=json&user=1')
        .then((response) => response.json())

      } catch(error){
        this.error = error
      }

    }
  },
});
