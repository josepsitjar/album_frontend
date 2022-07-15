import { defineStore } from 'pinia';

export const userAuthStore = defineStore('auth', {
  state: () => ({
    counter: 0,
    token: '',
    user_id: '',
    isAuthenticated: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getToken: (state) => state.token,
    getUserId: (state) => state.user_id,
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
    setUserId(id) {
      this.user_id = id
    },
    removeToken() {
      this.token = ''
      this.isAuthenticated = false
    }
  },
});
