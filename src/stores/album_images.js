import { defineStore } from "pinia";
import axios from "axios";

export const albumImageStore = defineStore("album_images", {
  state: () => ({
    current_page: 1,
    next: null,
    images: [],
    albumImages: [],
    error: null,
  }),
  getters: {
    getImages: (state) => state.images,
    getNext: (state) => state.next,
    getCurrentPage: (state) => state.current_page,
  },
  actions: {
    async setAlbumImages(index) {
      this.images = [];

      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        let images = await fetch(
          process.env.API +
            "photos/?page=" +
            this.current_page +
            "&format=json&querytext=null&album=" +
            index +
            "&user=" +
            userId +
            "",
          {
            method: "GET",
            credentials: "same-origin",
            headers: {
              Authorization: "Token " + token + "",
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRFToken": token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        ).then((response) => response.json());
        this.next = images.next;
        this.images = images.results;
      } catch (error) {
        this.error = error;
      }
    },
    setNext(url) {
      this.next = url;
    },
    async loadMoreImages() {
      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        let newImages = await fetch("" + this.next + "", {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Authorization: "Token " + token + "",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());
        this.next = newImages.next;
        newImages.results.forEach((item) => {
          this.images.push(item);
        });
      } catch (error) {
        this.error = error;
      }
    },
  },
});
