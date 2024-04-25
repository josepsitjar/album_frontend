<template>
  <section
    v-if="map_section"
    class="page-section"
    id="map_section"
    ref="map_section"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12 text-center">
          <h2 class="mapTitle">Places of your pictures</h2>
          <br />

          <div class="map" id="map" ref="mapContainer"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- carrousel images album-->
  <q-dialog v-model="carousel_images" full-width>
    <q-btn
      round
      icon="fa fa-times"
      color="black"
      class="close_button"
      @click="closeAlbumCarousel()"
    ></q-btn>
    <q-carousel
      animated
      v-model="slide"
      control-color="primary"
      class="bg-white shadow-1 rounded-borders"
      height="80vh"
      style="width: 300px"
    >
      <q-carousel-slide :name="1" :img-src="images" />
    </q-carousel>
  </q-dialog>
</template>

<script>
import { ref, watch } from "vue";
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";

import { imagesLocationStore } from "stores/images_location.js";

import { Map, NavigationControl, Marker } from "maplibre-gl";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";

import cluster_icon from "assets/camera2_app_circle.png";
import camera_icon from "assets/camera2_app.png";

export default defineComponent({
  name: "MapComponent",
  components: {},
  setup() {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);

    // image feature
    const imgLocStore = imagesLocationStore();
    //const { setFeature } = imagesLocationStore()
    //setFeature()

    //const featureColl = ref(null)
    //setTimeout(function(){
    //  featureColl.value = imgLocStore.getFeature
    //spinner.value = false

    //}, 1000)

    // open images on popup
    const images = ref();
    const carousel_images = ref(false);

    /*
    const openCarousel = function () {
      images.value = null;
      //images.value = img;
      images.value = imgLocStore.getImage;
      console.log(images.value);
      carousel_images.value = true;
    };
    */

    onMounted(() => {
      const initialState = { lng: 0.0, lat: 0.0, zoom: 1 };

      map.value = markRaw(
        new Map({
          container: mapContainer.value,
          style:
            "https://geoserveis.icgc.cat/contextmaps/icgc_orto_hibrida.json",
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        })
      );

      map.value.addControl(new NavigationControl(), "top-left");

      // photo layers
      map.value.on("load", function () {
        // add source

        map.value.addSource("photos", {
          type: "geojson",
          data: imgLocStore.getFeature,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        /*
        // add layer to map
        map.value.addLayer({
          id: "clusters",
          type: "circle",
          source: "photos",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });
        */

        // add cluster count layer
        /*
        map.value.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "photos",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["Arial-Italic"],
            "text-size": 12,
          },
        });
        */
        // this layer is useful to allow click on marker
        map.value.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "photos",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 10,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // Add the simple tree image
        map.value.loadImage(camera_icon, (error, image) => {
          if (error) throw error;
          map.value.addImage("camera_icon", image);
        });
        map.value.loadImage(cluster_icon, (error, image) => {
          if (error) throw error;
          map.value.addImage("cluster_icon", image);
        });

        // https://www.jawg.io/docs/integration/maplibre-gl-js/cluster/#15.2/48.852975/2.341069
        map.value.addLayer({
          id: "clusters",
          type: "symbol",
          source: "photos",
          layout: {
            "icon-image": [
              "case",
              ["has", "point_count"],
              "cluster_icon",
              "camera_icon",
            ],
            "text-field": "{point_count_abbreviated}",
            "text-font": ["Arial-Italic"],
            "text-size": 12,
          },
          paint: {
            "text-translate": [18, -17],
            "text-translate-anchor": "viewport",
          },
        });

        // inspect a cluster on click
        /*
        map.value.on("click", "clusters", function (e) {
          var features = map.value.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          var clusterId = features[0].properties.cluster_id;
          map.value
            .getSource("photos")
            .getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) return;

              map.value.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });
        */

        // On click on a cluster, zoom to the expansion zoom level
        map.value.on("click", "clusters", (e) => {
          const feature = e.features[0];
          var clusterId = feature.properties.cluster_id;
          if (!clusterId) return;
          map.value
            .getSource("photos")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              map.value.easeTo({
                center: feature.geometry.coordinates,
                zoom: zoom + 0.5,
              });
            });
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.value.on("click", "unclustered-point", function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var photo_id = e.features[0].properties.photo_pk;
          imgLocStore.setImage(photo_id);

          watch(
            () => imgLocStore.getImage,
            function () {
              var s3_image = imgLocStore.getImage;
              images.value = s3_image[0].image;
            }
          );

          carousel_images.value = true;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
        });

        // pointer on cluster
        map.value.on("mouseenter", "clusters", function () {
          map.value.getCanvas().style.cursor = "pointer";
        });
        map.value.on("mouseleave", "clusters", function () {
          map.value.getCanvas().style.cursor = "";
        });

        // pointer marker
        map.value.on("mouseenter", "unclustered-point", function () {
          map.value.getCanvas().style.cursor = "pointer";
        });
        map.value.on("mouseleave", "unclustered-point", function () {
          map.value.getCanvas().style.cursor = "";
        });
      });
    });

    return {
      carousel_images,
      slide: ref(1),
      map_section: ref(true),
      map,
      mapContainer,
      imgLocStore,
      //openCarousel,
      images,
    };
  },
  methods: {
    closeAlbumCarousel() {
      this.carousel_images = false;
    },
  },
});
</script>

<style>
@import "~maplibre-gl/dist/maplibre-gl.css";

.map {
  position: relative;
  width: 100%;
  height: 75vh;
}

#map_section {
  margin-top: 50px;
}
.text-subtitle1 {
  margin: 5px;
}

.mapTitle {
  font-family: "Merriweather Sans", sans-serif;
  font-weight: lighter;
  font-size: 23px;
}
</style>
