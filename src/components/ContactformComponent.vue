<template>
  <!-- Contact-->
  <section class="page-section" id="contact">
      <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 col-xl-6 text-center">
                  <h2 class="mt-0">Formulario de contacto</h2>
                  <hr class="divider" />
                  <p class="text-muted mb-5">¿Quieres una versión personalizada de Picbook para tu negocio u organización? ¿Quieres añadir funcionalidades? Envíanos un mensaje y nos pondremos en contacto contigo.</p>
              </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
              <div class="col-lg-6">
                  <form id="contactForm" @submit.prevent="submitFormContact">
                      <!-- Name input-->
                      <div class="form-floating mb-3">
                          <input class="form-control" v-model="name" name="name" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                          <label for="name">Nombre</label>
                          <div class="invalid-feedback" data-sb-feedback="name:required">Debes introducir el nombre.</div>
                      </div>
                      <!-- Email address input-->
                      <div class="form-floating mb-3">
                          <input class="form-control" v-model="email" name="email" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                          <label for="email">e-mail</label>
                          <div class="invalid-feedback" data-sb-feedback="email:required">Introduce el e-mail.</div>
                          <div class="invalid-feedback" data-sb-feedback="email:email">e-mail no válido.</div>
                      </div>
                      <!-- Phone number input-->
                      <div class="form-floating mb-3">
                          <input class="form-control" v-model="address" name="address" id="address" type="text" placeholder="Pl Catalunya, 1. Barcelona." data-sb-validations="required" />
                          <label for="address">Dirección</label>
                          <div class="invalid-feedback" data-sb-feedback="address:required">Introduce la dirección.</div>
                      </div>
                      <!-- Message input-->
                      <div class="form-floating mb-3">
                          <textarea class="form-control" v-model="message" name="message" id="message" type="text" placeholder="Enter your message here..." style="height: 10rem" data-sb-validations="required"></textarea>
                          <label for="message">Mensaje</label>
                          <div class="invalid-feedback" data-sb-feedback="message:required">Introduce el mensaje.</div>
                      </div>

                      <div class="d-none" id="submitSuccessMessage">
                          <div class="text-center mb-3">
                              <div class="fw-bolder">El formulario se ha enviado correctamente</div>
                              To activate this form, sign up at
                              <br />
                              <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                          </div>
                      </div>

                      <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Se ha producido un error!</div></div>
                      <!-- Submit Button-->
                      <div class="d-grid"><button class="btn btn-primary btn-xl" id="submitButton" type="submit">Enviar</button></div>
                  </form>
              </div>
          </div>

          <div v-if="messageSend" class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 col-xl-6 text-center">
                  <p class="mb-5">Muchas grácias por contactar con nosotros. Nos pondremos en contacto contigo tan pronto como sea posible.</p>
              </div>
          </div>

      </div>
  </section>



</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import axios from 'axios'

export default defineComponent({
  name: 'ContactformComponent',
  components: {  },
  setup(){

    return {
      messageSend: ref(false),
      name:'',
      email:'',
      message:'',
      address:''

    }

  },
  methods:{
    submitFormContact(e) {
      const formData = {
        name: this.name,
        email: this.email,
        message: this.message,
        address: this.address
      }

      axios
        .post(process.env.API + 'accounts/contact', formData)
        .then(response => {
          this.messageSend = true
          document.getElementById("contactForm").reset()
          this.name = ''
          this.email = ''
          this.message = ''
          this.address = ''

        })
        .catch(error => {
          console.log(error)
        })

    }

  }

})
</script>

<style>

</style>
