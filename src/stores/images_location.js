import { defineStore } from 'pinia';
import axios from 'axios';

export const imagesLocationStore = defineStore('image_location', {
  state: () => ({
    feature: null,
    error: null
  }),
  getters: {
    getFeature: (state) => state.feature
  },
  actions: {
    async setFeature() {

      this.feature = null

      try {
        var userId = localStorage.getItem('userId');
        var token = localStorage.getItem("token");

        this.feature = await fetch('https://www.picbook.es/apidjrframework/photosGeojson/?format=json&user='+userId+'', {
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
