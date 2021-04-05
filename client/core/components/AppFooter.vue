<template lang="pug">
div#AppFooter
  pre
    code {{ name }} v{{ version }}
</template>

<script>
export default {
  name: 'AppFooter',

  data () {
    return {
      version: document.querySelector('meta[name="version"]')
        .getAttribute('content'),

      name: document.querySelector('meta[name="name"]')
        .getAttribute('content')
    };
  }
};
</script>

<style lang="sass" scoped>
#AppFooter
  background: rgb(240, 240, 240)
  width: 100%
  bottom: 0
  right: 0
  left: 0
  flex: 0
  min-height: 5vh
  max-height: 5vh

  pre
    border-top: 1px solid rgba(0, 0, 0, 0.15)
    padding: 0.5rem 1rem
    margin: 0

    code
      color: rgba(0, 0, 0, 0.5)
      text-transform: uppercase
      font-size: 9px
</style>
