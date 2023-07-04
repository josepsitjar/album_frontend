import { defineStore } from "pinia";
import axios from "axios";

export const imageStore = defineStore("images", {
  state: () => ({
    images: [],
    error: null,
  }),
  getters: {
    getImages: (state) => state.images,
  },
  actions: {
    async setImages() {
      this.images = [];

      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        this.images = await fetch(
          process.env.API + "photos/?format=json&album=all&user=" + userId + "",
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
      } catch (error) {
        this.error = error;
      }
    },
  },
});
