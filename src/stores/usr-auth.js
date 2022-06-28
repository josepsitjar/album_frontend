import { defineStore } from 'pinia';

export const userAuthStore = defineStore('auth', {
  state: () => ({
    counter: 0,
    token: '',
    isAuthenticated: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getToken: (state) => state.token,
    getAuthenticated: (state) => state.isAuthenticated
  },
  actions: {
    increment() {
      this.counter++;
    },
    initializeStore() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token')
        this.isAuthenticated = true
      } else {
        this.token = ''
        this.isAuthenticated = false
      }
    },
    setToken(token) {
      this.token = token
      this.isAuthenticated = true
    },
    removeToken() {
      this.token = ''
      this.isAuthenticated = false
    }
  },
});
