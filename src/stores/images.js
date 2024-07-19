import { defineStore } from "pinia";
import axios from "axios";

export const imageStore = defineStore("images", {
  state: () => ({
    current_page: 1,
    next: null,
    images: [],
    error: null,
  }),
  getters: {
    getImages: (state) => state.images,
    getNext: (state) => state.next,
    getCurrentPage: (state) => state.current_page,
  },
  actions: {
    async setImages() {
      this.images = [];
      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        //this.images = await fetch(
        let images = await fetch(
          process.env.API +
            "photos/?page=" +
            this.current_page +
            "&format=json&querytext=null&album=all&user=" +
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
        ).then((response) => {
          return response.json();
        });
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
        }).then((response) => {
          return response.json();
        });

        this.next = newImages.next;
        newImages.results.forEach((item) => {
          this.images.push(item);
        });
      } catch (error) {
        this.error = error;
      }
    },
    async setImagesGalleryFilter(text) {
      this.images = [];
      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        let filterImages = await fetch(
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
        filterImages.results.forEach((item) => {
          this.images.push(item);
        });
      } catch (error) {
        this.error = error;
      }
    },
    setCurrentPage(pageNum) {
      this.current_page = pageNum;
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
