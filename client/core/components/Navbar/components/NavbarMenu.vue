<i18n>
es:

</i18n>

<template lang="pug">
.left.menu#navbar-menu()

</template>

<script>
export default {
  name: 'NavbarMenu',

  computed: {},

  mounted() {
    this.initDropdowns();
  },

  methods: {
    initDropdowns() {
      this.$$('#navbar-menu .dropdown').dropdown();
    }
  }
};
</script>
