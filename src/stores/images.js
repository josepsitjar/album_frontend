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
        this.images = await fetch('http://127.0.0.1:8000/photos/?format=json&user=1', {
          method: 'GET',
          credentials: "same-origin",
          headers: {
            "Authorization": 'Token a3f6d0c4533cef47863069cbc89974ff4c2ae9b3',
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRFToken': "a3f6d0c4533cef47863069cbc89974ff4c2ae9b3",
            Accept: "application/json",
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())

      } catch(error){
        this.error = error
      }

    }
  },
});
