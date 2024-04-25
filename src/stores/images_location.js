import { defineStore } from "pinia";
import axios from "axios";

export const imagesLocationStore = defineStore("image_location", {
  state: () => ({
    feature: null,
    image: null,
    error: null,
  }),
  getters: {
    getFeature: (state) => state.feature,
    getImage: (state) => state.image,
  },
  actions: {
    async setFeature() {
      this.feature = null;

      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        this.feature = await fetch(
          process.env.API + "photosGeojson/?format=json&user=" + userId + "",
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
    async setImage(image_pk) {
      //this.image = null;
      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        this.image = await fetch(
          process.env.API +
            "single_photo/?format=json&photo_id=" +
            image_pk +
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
      } catch (error) {
        this.error = error;
      }
    },
  },
});
