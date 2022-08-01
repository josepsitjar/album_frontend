import { defineStore } from 'pinia';
import axios from 'axios';

export const albumStore = defineStore('albums', {
  state: () => ({
    albums: [],
    error: null
  }),
  getters: {
    getAlbums: (state) => state.albums,
  },
  actions: {
    async setAlbums() {
      this.albums = []

      try {
        var userId = localStorage.getItem('userId');
        var token = localStorage.getItem("token");

        this.albums = await fetch('http://82.223.13.59/apidjrframework/albums/?format=json&user='+userId+'', {
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
