<template>
  <q-btn
    round
    icon="fa fa-trash"
    color="black"
    class="close_button deltete_button"
    @click="deleteImage"
  ></q-btn>

  <!-- Prompt menu to delete an image -->
  <q-dialog v-model="confirmMessage" persistent>
    <q-card>
      <q-card-section class="row">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">Image will be deleted. Are you sure?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Yes" color="primary" v-close-popup />
        <q-btn flat label="No" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { imageStore } from "stores/images.js";

export default defineComponent({
  name: "DeleteImage",
  props: {
    imageObj: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    /**
     * Delete Image
     * @param {*} event
     */

    const confirmMessage = ref(false);

    const deleteImage = (event) => {
      //console.log("deleting");
      console.log(props.imageObj);
      console.log(props.imageObj.pk);

      // Prompt menu
      //confirmMessage.value = true;

      // image store
      const imStore = imageStore();
      imStore.deleteImage(props.imageObj.pk);
    };

    return {
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
