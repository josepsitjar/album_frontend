<template>
  <!--
  <q-icon
    class="absolute all-pointer-events edit_album"
    size="25px"
    name="fas fa-ellipsis"
    color="white"
    style="top: 8px; right: 15px; z-index: 1000"
    @click.stop="openMenu(evt)"
  >
  </q-icon>
-->
  <q-btn
    round
    flat
    size="10px"
    color="black"
    text-color="white"
    class="absolute all-pointer-events edit_album"
    icon="fas fa-ellipsis"
    style="top: 8px; right: 15px; z-index: 1000"
    @click.stop="openMenu($evt)"
  >
    <q-menu transition-show="scale" transition-hide="scale">
      <q-list style="min-width: 150px; overflow: hidden">
        <q-item clickable v-close-popup>
          <q-item-section @click="confirm_delete_message()"
            >Delete album</q-item-section
          >
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Edit album</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <!-- Prompt menu to delete an album -->
  <q-dialog v-model="confirmMessage" persistent>
    <q-card style="overflow: hidden">
      <q-card-section class="row items-center">
        <div class="row" align="center">
          <div class="col-2">
            <q-avatar icon="warning" color="primary" text-color="white" />
          </div>
          <div class="col-10" align="left">
            This album will be definetly deleted, but not the associated images.
            <br />Delete album?
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
              @click="deleteAlbum"
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
import { albumStore } from "stores/albums.js";
export default {
  name: "AlbumMenu",
  props: {
    albumId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const confirmMessage = ref(false);
    function openMenu(evt) {
      console.log(evt);
      console.log(this);
    }
    function confirm_delete_message() {
      // Prompt menu
      confirmMessage.value = true;
    }
    function deleteAlbum() {
      // image store
      const albStore = albumStore();
      albStore.deleteAlbum(props.albumId);
    }

    return {
      confirmMessage,
      openMenu,
      deleteAlbum,
      confirm_delete_message,
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
.edit_album:hover {
  color: #f4623a !important;
}
</style>
