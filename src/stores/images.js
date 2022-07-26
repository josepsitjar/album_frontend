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
        var userId = localStorage.getItem('userId');
        var token = localStorage.getItem("token");

        this.images = await fetch('http://82.223.13.59/apidjrframework/photos/?format=json&user='+userId+'', {
          method: 'GET',
          credentials: "same-origin",
          headers: {
            "Authorization": 'Token '+token+'',
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRFToken': token,
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
