<template>
  <q-btn
    round
    icon="fa fa-trash"
    color="black"
    class="close_button deltete_button"
    @click="confirmDelete"
  ></q-btn>

  <!-- Prompt menu to delete an image -->
  <q-dialog v-model="confirmMessage" persistent>
    <q-card style="overflow: hidden">
      <q-card-section class="row items-center">
        <div class="row" align="center">
          <div class="col-2">
            <q-avatar icon="warning" color="primary" text-color="white" />
          </div>
          <div class="col-10" align="left">
            This mage will be definetly deleted. Are you sure?
          </div>
        </div>
      </q-card-section>

      <q-card-actions>
        <div class="row" align="center">
          <div class="col">
            <q-btn
              flat
              label="Yes"
              color="primary"
              v-close-popup
              @click="deleteImage"
            />
          </div>
          <div class="col">
            <q-btn flat label="No" color="primary" v-close-popup />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { imageStore } from "stores/images.js";
import { albumImageStore } from "stores/album_images.js";

export default defineComponent({
  name: "DeleteImage",
  props: {
    imageObj: {
      type: Object,
      required: true,
    },
  },
  emits: ["closeCarousel"],
  setup(props, { emit }) {
    /**
     * Delete Image
     * @param {*} event
     */

    const confirmMessage = ref(false);

    const confirmDelete = function () {
      // Prompt menu
      confirmMessage.value = true;
    };

    const deleteImage = (event) => {
      // image store
      const imStore = imageStore();
      imStore.deleteImage(props.imageObj.pk);

      // close carousel with emit
      emit("closeCarousel");
    };

    return {
      confirmDelete,
      deleteImage,
      confirmMessage,
    };
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style></style>
