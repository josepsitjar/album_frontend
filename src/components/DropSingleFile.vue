<template>
  <div>
    <div
      class="dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        name="file"
        id="fileInput"
        class="hidden-input"
        @change="onChange"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <label for="title"><i class="text-grey drop-box">Drop an image</i></label>

      <!-- this code shows the uploaded files -->
      <div class="preview-container mt-4" v-if="files.length">
        <div v-for="file in files" :key="file.name">
          <div class="row">
            <div class="col-4">
              <img class="preview-img" :src="generateURL(file)" />
            </div>
            <div class="col-7">
              {{ file.name }}
            </div>
            <div class="col-1">
              <small>
                <button
                  class="btn-close"
                  type="button"
                  @click="remove(files.indexOf(file))"
                ></button>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dropImagesStore } from "stores/drop-images.js";

export default {
  name: "DropSingleFile",
  setup() {},
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
    onChange() {
      this.files = [...this.$refs.file.files];
      console.log("files files");
      console.log(this.files);
      this.updateStore();
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
      this.updateStore();
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
    updateStore() {
      // drop-images store
      const { setImages } = dropImagesStore();
      setImages(this.files);
    },
    removeAll() {
      this.files = [];
    },
  },
};
</script>

<style>
.dropzone-container {
  padding: 0rem;
  padding-left: 1rem;
  padding-top: 30px;
  padding-bottom: 30px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.hidden-input {
  opacity: 1;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
