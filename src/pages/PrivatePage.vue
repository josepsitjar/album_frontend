<template>
  <q-page>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="#page-top">PicBook</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto my-2 my-lg-0">
                    <li class="nav-item"><a class="nav-link link_menu" @click="scrollMeTo('about')">About</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" href="#contact">Contact</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" @click="loginForm = true" ><i class="fa fa-user" aria-hidden="true"></i></a></li>

                    <li class="nav-item"><a class="nav-link link_menu" @click="logout" ><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>

                </ul>
            </div>
        </div>
    </nav>


    <div v-if="isAuthenticated">
      <p>estas autenticat</p>
    </div>


  </q-page>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import VueSmoothScroll from 'vue3-smooth-scroll'

import { userAuthStore } from 'stores/usr-auth'

import axios from 'axios'

export default defineComponent({
  name: 'PrivatePage',

  setup () {
    const authStore = userAuthStore()
    const isAuthenticated = storeToRefs(authStore)


    return {
      VueSmoothScroll,
      isAuthenticated,
      authStore
    }
  },
  methods:{
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    logout() {

      const token = this.authStore.getToken
      console.log('token on logout')
      console.log(token)

      //https://stackoverflow.com/questions/69450011/error-request-failed-with-code-403-in-axios-post-api
      // https://www.youtube.com/watch?v=iuZViCeW0JM

      axios
        .post('http://127.0.0.1:8000/auth/v1/token/logout', token)
        .then(response => {
          axios.defaults.headers.common['Authorization'] = "Token " + token


          this.$router.push('/')
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })

        this.$router.push('/')




    }
  },
  mounted() {

  }
})
</script>

<style scoped>
#mainNav  {
  /*background-color: white;*/

}

#mainNav .link_menu,
#mainNav .navbar-brand {
  color: black !important;
}

.link_menu{
  cursor: pointer;
}
</style>
