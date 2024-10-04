<template>
  <q-page>
    <!-- Navigation-->
    <nav
      class="navbar navbar-expand-lg navbar-light fixed-top py-3"
      id="mainNav"
    >
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand link_menu" @click="scrollMeTo('initial')"
          >KeepYourPhoto</a
        >
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto my-2 my-lg-0">
            <li class="nav-item">
              <a class="nav-link link_menu" @click="scrollMeTo('about')"
                >KeepYourPhoto</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link link_menu" @click="scrollMeTo('services')">{{
                $t("Funcionalidades")
              }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link link_menu" @click="scrollMeTo('contact')">{{
                $t("Contacto")
              }}</a>
            </li>

            <li v-if="token == null" class="nav-item">
              <a class="nav-link link_menu" @click="loginForm = true"
                ><i class="fa fa-user" aria-hidden="true"></i
              ></a>
            </li>
            <li v-if="user_email" class="nav-item">
              <a class="nav-link link_menu" @click="goToPrivate()">
                {{ user_email }}
              </a>
            </li>

            <!--<li class="nav-item"><a class="nav-link link_menu" @click="$root.$i18n.locale='en-US'">EN</a></li>-->
            <li class="nav-item" style="color: white">|</li>
            <li class="nav-item">
              <a
                class="nav-link link_menu"
                @click="$root.$i18n.locale = 'ca-ES'"
                >CA</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link link_menu"
                @click="$root.$i18n.locale = 'es-ES'"
                >ES</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link link_menu"
                @click="$root.$i18n.locale = 'en-US'"
                >EN</a
              >
            </li>

            <!--
                    <li class="nav-item"><a class="nav-link link_menu">
                      <q-select
                        v-model="locale"
                        :options="localeOptions"
                        dense
                        borderless
                        emit-value
                        map-options
                        options-dense
                        style="width: 150px;"
                    />
                    </a></li>
                    -->
          </ul>
        </div>
      </div>
    </nav>

    <!-- Masthead-->
    <header class="masthead" ref="initial">
      <div class="container px-4 px-lg-5 h-100">
        <div
          class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center"
        >
          <div class="col-lg-8 align-self-end">
            <h1 class="text-white font-weight-bold">
              {{
                $t(
                  "Una plataforma para almacenar, organizar y visualizar tus fotos."
                )
              }}
            </h1>
            <hr class="divider" />
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p class="text-white-75 mb-5">
              {{
                $t(
                  "Almacena, cataloga y visualiza tus fotos, y compártelas a través de la plataforma."
                )
              }}
            </p>
            <a class="btn btn-primary btn-xl" @click="scrollMeTo('about')">{{
              $t("Ver más")
            }}</a>
          </div>
        </div>
      </div>
    </header>
    <!-- About-->
    <section class="page-section bg-primary" id="about" ref="about">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="text-white mt-0">
              {{ $t("Tenemos lo que necesitas!") }}
            </h2>
            <hr class="divider divider-light" />
            <p class="text-white-75 mb-4">
              {{
                $t(
                  "KeepYourPhoto cuenta con todas las funcionalidades que necesitas para almacenar, catalogar, gestionar y visualizar tus fotografías de una forma simple y eficiente. KeepYourPhoto es una plataforma desarrollada con código abierto, que te ayudará a catalogar y visualizar todos tus álbumes de fotos."
                )
              }}
            </p>
            <p class="text-white-75 mb-4">
              {{ $t("Utiliza esta demo para descubrir la plataforma.") }} User:
              <b>demo@keepyourphoto.com</b> and Password: <b>demo</b>
            </p>
            <p class="text-white-75 mb-4">
              {{
                $t(
                  "Contacta con nosotros para implementar una versión de KeepYourPhoto personalizada y con funcionalidades adicionales."
                )
              }}
            </p>
            <a class="btn btn-light btn-xl" @click="loginForm = true"
              >{{ $t("Empezamos!") }}
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- Services-->
    <section class="page-section" id="services" ref="services">
      <div class="container px-4 px-lg-5">
        <h2 class="text-center mt-0">
          {{ $t("Funcionalidades de KeepYourPhoto") }}
        </h2>
        <hr class="divider" />
        <div class="row gx-4 gx-lg-5">
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <div class="mb-2"><i class="fa fa-upload fa-3x"></i></div>
              <h3 class="h4 mb-2">{{ $t("Almacena tus fotografías") }}</h3>
              <p class="text-muted mb-0">
                {{
                  $t(
                    "Almacena de forma segura todas las imágenes, con copias de seguridad."
                  )
                }}
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <div class="mb-2"><i class="fa fa-archive fa-3x"></i></div>
              <h3 class="h4 mb-2">{{ $t("Catálogo") }}</h3>
              <p class="text-muted mb-0">
                {{
                  $t(
                    "Cataloga tus fotos, añadiendo información complementaria: título, descripción, localización, fecha y personas que aparecen en la imagen."
                  )
                }}
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <div class="mb-2"><i class="fa fa-eye fa-3x"></i></div>
              <h3 class="h4 mb-2">{{ $t("Visualiza") }}</h3>
              <p class="text-muted mb-0">
                {{
                  $t(
                    "KeepYourPhoto te ofrecerá diferentes formas de visualizar y buscar tus imágenes."
                  )
                }}
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <div class="mb-2"><i class="fa fa-share-alt fa-3x"></i></div>
              <h3 class="h4 mb-2">{{ $t("Comparte") }}</h3>
              <p class="text-muted mb-0">
                {{
                  $t(
                    "Comparte las imágenes de forma segura con las personas que quieras: clientes, usuarios, família, o bien hazlas públicas para todo el mundo."
                  )
                }}
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <div class="mb-2"><i class="fa fa-map fa-3x"></i></div>
              <h3 class="h4 mb-2">{{ $t("Localiza") }}</h3>
              <p class="text-muted mb-0">
                {{
                  $t(
                    "Guarda la ubicación en la que se han tomado las imágenes y visualízalas en el mapa."
                  )
                }}
              </p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <div class="mb-2"><i class="fa fa-helmet-safety fa-3x"></i></div>
              <h3 class="h4 mb-2">{{ $t("Personaliza") }}</h3>
              <p class="text-muted mb-0">
                {{
                  $t(
                    "Podemos desarrollar una personalización completa de la plataforma."
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Services-->
    <section class="page-section bg-light" id="pricing" ref="pricing">
      <div class="container px-4 px-lg-5">
        <h2 class="text-center mt-0">
          {{ $t("Elige el plan que más te convenga") }}
        </h2>
        <hr class="divider" />
        <div class="row pricing py-5">
          <!--https://startbootstrap.com/snippets/pricing-table-->
          <!-- Free Tier -->
          <div class="col-lg-4">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <h5 class="card-title text-muted text-uppercase text-center">Free</h5>
                <h6 class="card-price text-center">$0<span class="period">/{{ $t("mes") }}</span></h6>
                <hr>
                <ul class="fa-ul">
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>10GB {{ $t("Almacenaje") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Imágenes ilimitadas") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Descarga de imágenes") }}</li>
                  <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>{{ $t("Álbums ilimitados") }}</li>
                  <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>{{ $t("Usuarios ilimitados") }}</li>
                  <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>{{ $t("Descargar álbums") }}</li>
                  <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>{{ $t("Personalización de la interfaz") }}</li>
                </ul>
                <div class="d-grid">
                  <router-link to="/register" class="btn btn-primary text-uppercase">{{ $t("Registro") }}</router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Plus Tier -->
          <div class="col-lg-4">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <h5 class="card-title text-muted text-uppercase text-center">Plus</h5>
                <h6 class="card-price text-center">€2.99<span class="period">/{{ $t("mes") }}</span></h6>
                <hr>
                <ul class="fa-ul">
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>100GB {{ $t("Almacenaje") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Imágenes ilimitadas") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Descarga de imágenes") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Álbums ilimitados") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Usuarios ilimitados") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Descargar álbums") }}</li>
                  <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>{{ $t("Personalización de la interfaz") }}</li>
                </ul>
                <div class="d-grid">
                  <router-link to="/register" class="btn btn-primary text-uppercase">{{ $t("Registro") }}</router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Pro Tier -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-muted text-uppercase text-center">Custom</h5>
                <h6 class="card-price text-center"><span class="period">{{ $t("a partir de") }}</span> €199</h6>
                <hr>
                <ul class="fa-ul">
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Almacenaje ilimitado") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Imágenes ilimitadas") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Descarga de imágenes") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Álbums ilimitados") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Usuarios ilimitados") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span>{{ $t("Descargar álbums") }}</li>
                  <li><span class="fa-li"><i class="fas fa-check"></i></span><strong>{{ $t("Personalización de la interfaz") }}</strong></li>
                </ul>
                <div class="d-grid">
                  <router-link to="/register" class="btn btn-primary text-uppercase">{{ $t("Registro") }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Portfolio-->
    <div id="portfolio">
      <div class="container-fluid p-0">
        <div class="row g-0">
          <div class="col-lg-4 col-sm-6">
            <img
              class="img-fluid"
              src="../assets/portfolio/thumbnails/foto1.jpg"
              alt="..."
            />
          </div>
          <div class="col-lg-4 col-sm-6">
            <img
              class="img-fluid"
              src="../assets/portfolio/thumbnails/foto2.jpg"
              alt="..."
            />
          </div>
          <div class="col-lg-4 col-sm-6">
            <img
              class="img-fluid"
              src="../assets/portfolio/thumbnails/foto3.jpg"
              alt="..."
            />
          </div>
          <div class="col-lg-4 col-sm-6">
            <img
              class="img-fluid"
              src="../assets/portfolio/thumbnails/foto4.jpg"
              alt="..."
            />
          </div>
          <div class="col-lg-4 col-sm-6">
            <img
              class="img-fluid"
              src="../assets/portfolio/thumbnails/foto5.jpg"
              alt="..."
            />
          </div>
          <div class="col-lg-4 col-sm-6">
            <img
              class="img-fluid"
              src="../assets/portfolio/thumbnails/foto6.jpg"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div id="contact" ref="contact"></div>
    <ContactformComponent />
  </q-page>

  <!-- login form dialog -->
  <q-dialog v-model="loginForm">
    <q-card square class="shadow-24" style="width: 700px; max-width: 80vw">
      <q-card-section class="bg-primary">
        <h4 class="text-h5 text-white q-my-md">
          SignIn
          <span
            ><q-btn
              flat
              round
              icon="close"
              v-close-popup
              class="float-right"
              style="margin-right: 10px"
            ></q-btn
          ></span>
        </h4>
      </q-card-section>

      <form id="loginForm" v-on:submit.prevent="submitLoginForm">
        <q-card-section>
          <q-input
            outlined
            type="email"
            v-model="username"
            name="username"
            label="User name"
            style="padding-left: 15px"
          />
          <q-input
            outlined
            type="password"
            v-model="password"
            label="Password"
            style="padding-left: 15px; margin-top: 15px"
          />
        </q-card-section>

        <q-card-section>
          <!-- Submit Button-->
          <div class="d-grid">
            <button
              class="btn btn-secondary btn-xl"
              id="submitButton"
              type="submit"
            >
              Login
            </button>
          </div>
        </q-card-section>
      </form>

      <q-card-section class="text-center q-pa-none">
        <p class="text-grey-6">
          Not reigistered?
          <router-link to="/register">Create an Account</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import VueSmoothScroll from "vue3-smooth-scroll";
import { storeToRefs } from "pinia";
import axios from "axios";

import ContactformComponent from "components/ContactformComponent.vue";

import { userAuthStore } from "stores/usr-auth";

import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "HomePage",
  components: { ContactformComponent },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const authStore = userAuthStore();

    const isAuthenticated = storeToRefs(authStore).getAuthenticated;

    const token = localStorage.getItem("token");
    const user_email = localStorage.getItem("user_email");

    const { locale } = useI18n({ useScope: "global" });

    return {
      VueSmoothScroll,
      loginForm: ref(false),
      email: ref(""),
      authStore,
      token,
      user_email,
      isAuthenticated,
      locale,
      localeOptions: [
        { value: "en-US", label: "English" },
        { value: "ca-ES", label: "Català" },
      ],
    };
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
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    submitLoginForm(e) {
      const formData = {
        username: this.username,
        password: this.password,
      };

      axios
        .post(process.env.API + "accounts/login", formData)
        .then((response) => {
          const token = response.data.token;
          console.log(response);

          this.authStore.setToken(token);
          this.authStore.setUserId(response.data.user_id);

          axios.defaults.headers.common["Authorization"] = "Token " + token;

          localStorage.setItem("user_email", response.data.email);
          localStorage.setItem("token", token);
          localStorage.setItem("userId", response.data.user_id);

          this.authStore.isAuthenticated;

          this.$router.push("/private");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToPrivate() {
      this.$router.push("/private");
    },
  },
  mounted() {},
});
</script>

<style>
.link_menu {
  cursor: pointer;
}

/** style pricing table */
section.pricing {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.pricing .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.pricing hr {
  margin: 1.5rem 0;
}

.pricing .card-title {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  letter-spacing: .1rem;
  font-weight: bold;
}

.pricing .card-price {
  font-size: 3rem;
  margin: 0;
}

.pricing .card-price .period {
  font-size: 0.8rem;
}

.pricing ul li {
  margin-bottom: 1rem;
}

.pricing .text-muted {
  opacity: 0.7;
}

.pricing .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  opacity: 0.7;
  transition: all 0.2s;
}

/* Hover Effects on Card */

.pricing .card:hover {
    margin-top: -.25rem;
    margin-bottom: .25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }

  .pricing .card:hover .btn {
    opacity: 1;
  }
</style>
