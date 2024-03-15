<template>
  <!-- search bar -->
  <div class="col-lg-6 text-center search-box">
    <div class="form-floating mb-3">
      <input
        class="form-control"
        v-model="search_photo"
        name="search_photo"
        id="search_photo"
        type="text"
        placeholder="Search"
        data-sb-validations="required"
        @input="isTyping = true"
      />
      <label for="search_photo"><i class="fas fa-search"></i></label>
    </div>
  </div>
  <!--end search bar-->
</template>

<script>
import { ref, watch } from "vue";
import { defineComponent } from "vue";
import { debounce } from "quasar";
import { imageStore } from "stores/images.js";

export default defineComponent({
  name: "SearchPhoto",
  setup() {
    const isTyping = ref(false);
    const search_photo = ref(null);
    watch(
      () => search_photo.value,
      debounce(function () {
        // image store
        const imgStore = imageStore();
        const { setImagesGalleryFilter } = imageStore();
        setImagesGalleryFilter(search_photo.value);
      }, 900)
    );
    return {
      isTyping,
      search_photo,
    };
  },
  methods: {
    // https://medium.com/@umaams/searching-query-after-typing-text-on-vuejs-dd48fcfc506f
  },
});
</script>

<style>
.search-box {
  margin-bottom: 50px;
}
</style>
