<template lang="pug">
main#view-container.ui.fluid.container
  slot
</template>

<script>
export default {
  name: 'ViewContainer'
};
</script>

<style lang="sass" scoped>
main.ui.fluid.container
  overflow-y: scroll
  padding: 1rem
  flex: 1
</style>

