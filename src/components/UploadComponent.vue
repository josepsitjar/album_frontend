<template>

  <section v-if="upload_section" class="page-section" id="upload_section" ref="upload_section">
      <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
                <h2 class="mapTitle">Upload your images</h2>
                <br>
                <!--Form -->
                <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
                    <div class="col-lg-6">
                        <form id="contactForm" @submit.prevent="submitFormContact">
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" v-model="name" name="name" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label for="name">Album</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Debes introducir el nombre.</div>
                            </div>
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" v-model="name" name="name" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label for="name">Nombre</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Debes introducir el nombre.</div>
                            </div>
                            <!-- Upload Files -->
                            <!--<label for="formFileMultiple" class="form-label">Multiple files input example</label>-->
                            <!--<input class="form-control" type="file" id="formFileMultiple" multiple />-->
                            <div class="form-floating mb-3">
                                <DropFile />
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
                            <div class="d-grid"><button class="btn btn-primary btn-xl" id="submitButton" type="submit">Upload</button></div>
                        </form>
                    </div>
                </div>
                <!-- End form -->
              </div>
          </div>
      </div>
  </section>

  


</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import DropFile from "./DropFile.vue";

import axios from 'axios'

export default defineComponent({
  name: 'ContactformComponent',
  components: { DropFile },
  setup(){


    return {
      upload_section: ref(true),
      files: ref(null)
    }
  },
  methods:{


  }

})
</script>

<style>

#upload_section {
  margin-top: 50px;
}

</style>
