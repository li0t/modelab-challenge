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
  padding: 1em 5em
  flex: 1
  min-height: 89vh
  max-height: 89vh
  background-color: #F5F5F5
</style>

