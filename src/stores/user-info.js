import { defineStore } from "pinia";
import axios from "axios";

export const userInfo = defineStore("user-info", {
  state: () => ({
    contracted_size: null,
    error: null,
  }),
  getters: {
    getContractedSize: (state) => state.contracted_size,
    getAlbums: (state) => state.albums,
  },
  actions: {
    async setContractedSize() {
      this.contracted_size = null;

      try {
        var userId = localStorage.getItem("userId");
        var token = localStorage.getItem("token");

        this.contracted_size = await fetch(
          process.env.API + "userinfo/?format=json&user=" + userId + "",
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
