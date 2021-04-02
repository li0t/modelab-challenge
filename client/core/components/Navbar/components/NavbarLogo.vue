<template lang="pug">
router-link.ui.header.vertically.fitted.item(to="/")
  img.ui.image(src="/images/logo.svg")
</template>

<script>
export default {
  name: 'NavbarLogo'
};
</script>

<style lang="sass" scoped>
.ui.header.item
  .ui.image
    width: 4em
    margin: 0
</style>

