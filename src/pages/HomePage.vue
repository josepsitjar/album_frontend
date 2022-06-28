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
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" @click="loginForm = true" ><i class="fa fa-user" aria-hidden="true"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Masthead-->
    <header class="masthead">
        <div class="container px-4 px-lg-5 h-100">
            <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-8 align-self-end">
                    <h1 class="text-white font-weight-bold">Your Favorite Place for Free Bootstrap Themes</h1>
                    <hr class="divider" />
                </div>
                <div class="col-lg-8 align-self-baseline">
                    <p class="text-white-75 mb-5">Start Bootstrap can help you build better websites using the Bootstrap framework! Just download a theme and start customizing, no strings attached!</p>
                    <a class="btn btn-primary btn-xl" href="#about">Find Out More</a>
                </div>
            </div>
        </div>
    </header>
    <!-- About-->
    <section class="page-section bg-primary" id="about" ref="about">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="text-white mt-0">We've got what you need!</h2>
                    <hr class="divider divider-light" />
                    <p class="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                    <a class="btn btn-light btn-xl" href="#services">Get Started!</a>
                </div>
            </div>
        </div>
    </section>
    <!-- Services-->
    <section class="page-section" id="services">
        <div class="container px-4 px-lg-5">
            <h2 class="text-center mt-0">At Your Service</h2>
            <hr class="divider" />
            <div class="row gx-4 gx-lg-5">
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <div class="mb-2"><i class="bi-gem fs-1 text-primary"></i></div>
                        <h3 class="h4 mb-2">Sturdy Themes</h3>
                        <p class="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <div class="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                        <h3 class="h4 mb-2">Up to Date</h3>
                        <p class="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <div class="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                        <h3 class="h4 mb-2">Ready to Publish</h3>
                        <p class="text-muted mb-0">You can use this design as is, or you can make changes!</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 text-center">
                    <div class="mt-5">
                        <div class="mb-2"><i class="bi-heart fs-1 text-primary"></i></div>
                        <h3 class="h4 mb-2">Made with Love</h3>
                        <p class="text-muted mb-0">Is it really open source if it's not made with love?</p>
                    </div>
                </div>
            </div>
        </div>
    </section>



  </q-page>

  <!-- login form dialog -->
  <q-dialog
    v-model="loginForm"
  >
    <q-card square class="shadow-24" style="width: 700px; max-width: 80vw;">
      <q-card-section class="bg-primary">
          <h4 class="text-h5 text-white q-my-md">SignIn <span><q-btn flat round icon="close" v-close-popup  class="float-right" style="margin-right:10px"></q-btn></span></h4>
      </q-card-section>

      <form id="loginForm" v-on:submit.prevent="submitLoginForm">
        <q-card-section>
            <q-input outlined type="email" v-model="username" name="username" label="User name" style="padding-left:15px;"/>
            <q-input outlined type="password" v-model="password" label="Password" style="padding-left:15px;margin-top:15px;"/>
        </q-card-section>

        <q-card-section>
          <!-- Submit Button-->
          <div class="d-grid"><button class="btn btn-secondary btn-xl " id="submitButton" type="submit">Login</button></div>
        </q-card-section>
      </form>

      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">Not reigistered? <router-link to="/register">Created an Account</router-link></p>
      </q-card-section>

    </q-card>


  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import VueSmoothScroll from 'vue3-smooth-scroll'
import axios from 'axios'

import { userAuthStore } from 'stores/usr-auth'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      username: '',
      password: ''
    }

  },
  setup () {
    const authStore = userAuthStore()

    return {
      VueSmoothScroll,
      loginForm: ref(false),
      email: ref(''),
      authStore
    }
  },
  beforeCreate() {
    /*
    const authStore = userAuthStore()
    authStore.initializeStore()

    const token = authStore.getToken

    if ( token ) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
    */

  },
  methods:{
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    submitLoginForm(e) {
      const formData = {
        username: this.username,
        password: this.password
      }

      console.log(formData)

      axios
        .post('http://127.0.0.1:8000/accounts/login',formData)
        .then(response => {
          console.log(response)

          //const token = response.data.auth_token

          //this.authStore.setToken(token)


          //axios.defaults.headers.common['Authorization'] = "Token " + token

          //localStorage.setItem("token", token)

          this.$router.push('/private')

        })
        .catch(error => {
          console.log(error)
        })

    }
  },
  mounted() {

  }
})
</script>


<style>
.link_menu{
  cursor: pointer;
}


</style>
