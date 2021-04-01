<template lang="pug">
#app
  navbar

  view-container
    router-view

  app-footer

</template>

<script>
import ViewContainer from './core/components/ViewContainer';
import AppFooter from './core/components/AppFooter';
import Navbar from './core/components/Navbar';

export default {
  name: 'App',

  components: {
    ViewContainer,
    AppFooter,
    Navbar
  },

  data() {
    return {};
  },

  computed: {},

  methods: {
  }
};
</script>

<style lang="css" src="@fortawesome/fontawesome-free/css/all.min.css"></style>
<style lang="sass" src="@/core/styles/print.sass"></style>
<style lang="sass">
html,
body
  overflow: hidden
  height: 100%
  width: 100%
  padding: 0
  margin: 0

body
  > #app
    flex-direction: column
    display: flex
    height: 100vh
    width: 100vw
</style>
