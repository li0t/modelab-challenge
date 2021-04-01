<template lang="pug">
.view
  .view-error
    h1
      i.fas.fa-kiwi-bird.circular.icon

    h2 Esto no es lo que estabas buscando
</template>

<script>
const viewLostModuleName = 'view-lost';

export default {
  name: viewLostModuleName,

  data() {
    return {};
  },

  created() {
    if (this.$route.path !== '/lost') {
      this.$router.replace(`/lost?url=${this.$route.path}`);
    }
  }
};
</script>

<style lang="sass" scoped>
.view-error
  height: 100px
  min-height: 100%
</style>