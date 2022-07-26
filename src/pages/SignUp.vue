<template>

  <!-- Contact-->
  <section class="page-section" id="contact">
      <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 col-xl-6 text-center">
                  <h2 class="mt-0">Let's create an account!</h2>
                  <hr class="divider" />
                  <p class="text-muted mb-5">Ready to start your next project with us? Sign up create your albums!</p>
              </div>
          </div>
          <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
              <div class="col-lg-6">
                  <!-- * * * * * * * * * * * * * * *-->
                  <!-- * * SB Forms Contact Form * *-->
                  <!-- * * * * * * * * * * * * * * *-->
                  <!-- This form is pre-integrated with SB Forms.-->
                  <!-- To make this form functional, sign up at-->
                  <!-- https://startbootstrap.com/solution/contact-forms-->
                  <!-- to get an API token!-->
                  <form id="signUpForm" @submit.prevent="submitForm">
                      <!-- Email address input-->
                      <div class="form-floating mb-3">
                          <input v-model="username" name="username" class="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                          <label for="email">Email address</label>
                          <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                          <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                      </div>
                      <!-- password input-->
                      <div class="form-floating mb-3">
                          <input v-model="password" name="password" class="form-control" id="password" type="password" placeholder="Enter your password" data-sb-validations="required" />
                          <label for="name">Password</label>
                          <div class="invalid-feedback" data-sb-feedback="name:required">A password is required.</div>
                      </div>
                      <!-- password input-->
                      <div class="form-floating mb-3">
                          <input v-model="password2" name="password2" class="form-control" id="password2" type="password" placeholder="Enter your password again" data-sb-validations="required" />
                          <label for="name">Repeat your password</label>
                          <div class="invalid-feedback" data-sb-feedback="name:required">Enter your password again.</div>
                      </div>
                      <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                      <!-- Submit Button-->
                      <div class="d-grid"><button class="btn btn-primary btn-xl" id="submitButton" type="submit">Submit</button></div>
                  </form>
              </div>
          </div>
      </div>
  </section>

</template>

<script>
import axios from 'axios'
export default {
  name: 'SignUp',
  setup() {
  },
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      email: ''
    }
  },
  methods: {
    submitForm(e) {
      const formData = {
        username: this.password,
        password: this.password,
        password2: this.password2,
        email: this.username
      }

      axios
        .post(process.env.API + 'accounts/register', formData)
        //.post('http://127.0.0.1:8000/accounts/register', formData)
        .then(response => {
          this.$router.push('/private')
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })

    }
  },
  mounted() {

  }
}
</script>

<style>

.page-section {
  padding: 4rem 0 !important;
}
</style>
