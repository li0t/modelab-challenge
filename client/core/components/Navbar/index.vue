<template lang="pug">
#navbar.ui.top.fixed.menu.attached
  navbar-logo
  search-bar
  
  .right.menu
    cart-icon

</template>

<script>
import CartIcon from '@/modules/cart/components/CartIcon';
import NavbarLogo from './components/NavbarLogo';
import SearchBar from './components/SearchBar';

export default {
  name: 'TheNavbar',

  components: {
    NavbarLogo,
    SearchBar,
    CartIcon,
  }
};
</script>

<style lang="sass" scoped>
#navbar.ui.top.fixed.menu
  background-color: #2079C9
  position: static
  z-index: 103
  flex: 0
  min-height: 6vh
  max-height: 6vh
  border-bottom: 0
  padding: .5em 100px .5em 80px
</style>
