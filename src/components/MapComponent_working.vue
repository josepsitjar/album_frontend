<template>
  <section v-if="map_section" class="page-section" id="map_section" ref="map_section">
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-lg-12 text-center">
                <h2 class="mapTitle">Places of your pictures</h2>
                <br>

                <div class="map" id="map" ref="mapContainer"></div>

              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { imagesLocationStore } from 'stores/images_location.js'

import { Map, NavigationControl, Marker } from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';


export default defineComponent({
  name: 'MapComponent',
  components: {  },
  setup(){

    const mapContainer = shallowRef(null);
    const map = shallowRef(null);

    // image feature
    const imgLocStore = imagesLocationStore()
    const { setFeature } = imagesLocationStore()
    setFeature()

    const featureColl = ref(null)
    setTimeout(function(){
      featureColl.value = imgLocStore.getFeature
      //spinner.value = false


    }, 1000)


    onMounted(() => {

      const initialState = { lng: 0.0, lat: 0.0, zoom: 1 };

      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: 'https://geoserveis.icgc.cat/contextmaps/icgc_orto_hibrida.json',
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      }));

      map.value.addControl(new NavigationControl(), 'top-left');


      setTimeout(function(){
        console.log(featureColl.value)
      }, 1005)

      // photo layers
      map.value.on('load', function(){
        // add source
        map.value.addSource('earthquakes', {
          type: 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data:
            'https://maplibre.org/maplibre-gl-js-docs/assets/earthquakes.geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        // add layer to map
        map.value.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          paint: {
            // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
            '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        // add cluster count layer
        map.value.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Arial-Italic'],
            'text-size': 12
          }
        });

        map.value.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'earthquakes',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        


      })




      new Marker({color: "#FF0000"})
        .setLngLat([139.7525,35.6846])
        .addTo(map.value);


    })


    return {
      map_section: ref(true),
      map,
      mapContainer,
      featureColl
    }

  },
  methods:{
  }

})
</script>

<style>
@import '~maplibre-gl/dist/maplibre-gl.css';

.map {
  position: relative;
  width: 100%;
  height: 75vh;
}


#map_section {
  margin-top: 50px;
}
.text-subtitle1{
  margin:5px;
}


.mapTitle{
  font-family: 'Tangerine', serif;
  font-size: 48px;
}

</style>
