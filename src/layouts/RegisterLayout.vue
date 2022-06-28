<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
//import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'RegisterLayout',

  components: {
    //EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {

    }
  },
  methods:{

  },
  mounted(){

  }
})
</script>

<style>

</style>
