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
          process.env.API +
            "photos/?format=json&querytext=null&album=all&user=" +
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
    async setImagesGalleryFilter(text) {
      console.log(text);
      this.images = [];
      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        this.images = await fetch(
          process.env.API +
            "photos/?format=json&querytext=" +
            text +
            "&album=all&user=" +
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
    async deleteImage(imgPk) {
      /*
      await axios.delete(process.env.API + "point_answer/", {
        data: { id: id },
      });
      */
      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        await axios.delete(process.env.API + "photos/" + imgPk + "", {
          data: { pk: imgPk },
          method: "DELETE",
          credentials: "same-origin",
          headers: {
            Authorization: "Token " + token + "",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        this.error = error;
      }
    },
  },
});
