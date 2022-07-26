<template>
  <q-page>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNavPrivate">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="#page-top">PicBook</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto my-2 my-lg-0">
                  <li class="nav-item"><a class="nav-link link_menu" href="#services">Gallery</a></li>
                  <li class="nav-item"><a class="nav-link link_menu" href="#services">Albums</a></li>
                  <li class="nav-item"><a class="nav-link link_menu" href="#services">Map</a></li>
                  <li class="nav-item"><a class="nav-link link_menu" href="/" @click="logout">Logout</a></li>
                    <!--
                    <li class="nav-item"><a class="nav-link link_menu" @click="scrollMeTo('about')">About</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" href="#portfolio">Portfolio</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" href="#contact">Contact</a></li>
                    <li class="nav-item"><a class="nav-link link_menu" @click="loginForm = true" ><i class="fa fa-user" aria-hidden="true"></i></a></li>

                    <li class="nav-item"><a class="nav-link link_menu" @click="logout" ><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
                    -->
                </ul>
            </div>
        </div>
    </nav>


    <!-- Image Gallery-->
    <section class="page-section" id="gallery" ref="gallery">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12 text-center">
                  <span v-for="(img, index) in imgs" :key="img.id" class="images">

                    <q-img
                      :src="img.image"
                      spinner-color="white"
                      style="height: 240px; max-width: 250px"
                      fit="cover"

                      @click="openCarousel(index)"
                    >
                      <div class="absolute-bottom text-subtitle1 text-center">
                        {{ img.description }}
                      </div>
                    </q-img>

                  </span>

                </div>
            </div>
        </div>
    </section>

  </q-page>

  <q-dialog v-model="carousel" full-width>
    <q-btn round icon="fa fa-times" color="black"  class="close_button" @click="closeCarousel()"></q-btn>
    <q-carousel
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      v-model="slide"
      control-color="primary"
      thumbnails
      infinite
      class="bg-white shadow-1 rounded-borders"
      height="80vh"

    >
      <q-carousel-slide v-for="(img, index) in imgs" :key="img.id" :name="index" :img-src="img.image" ></q-carousel-slide>

    </q-carousel>

  </q-dialog>




</template>



<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import VueSmoothScroll from 'vue3-smooth-scroll'

import { userAuthStore } from 'stores/usr-auth'
import { imageStore } from 'stores/images.js'

import axios from 'axios'



export default defineComponent({
  name: 'PrivatePage',
  components: {  },
  setup () {
    const authStore = userAuthStore()
    const isAuthenticated = storeToRefs(authStore)


    // image store
    const imgStore = imageStore()
    const { setImages } = imageStore()
    setImages()

    const imgs = ref([])
    setTimeout(function(){
      imgs.value = imgStore.getImages
      console.log(imgStore.getImages)
    }, 1000)


    return {
      carousel:ref(false),
      slide: ref(1),

      VueSmoothScroll,
      isAuthenticated,
      authStore,
      imgs,
    }
  },
  data() {
    return {

    }
  },
  methods:{
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    openCarousel(index) {
      this.carousel=true
      this.slide = index
    },
    closeCarousel(){
      this.carousel=false
    },
    logout() {
      this.$router.push('/private')
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('user_email');

      /*
      const token = this.authStore.getToken
      console.log('token on logout')
      console.log(token)

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
        */

    }
  },
  mounted() {

  }
})
</script>

<style >
#mainNav  {
  /*background-color: white;*/

}

#mainNavPrivate .link_menu,
#mainNavPrivate .navbar-brand {
  color: black !important;
}

.link_menu{
  cursor: pointer;
}

#gallery {
  margin-top: 50px;
}



.text-subtitle1{
  margin:5px;
}
.q-img__image{
  padding:5px;
  cursor: pointer;

}

.close_button{
  position:absolute;
  top: 4vh;
  right: 2vw;
  font-size: 10px;
  cursor:pointer;
  pointer-events: auto;

}
</style>
