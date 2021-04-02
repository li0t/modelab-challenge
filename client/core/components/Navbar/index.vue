<template lang="pug">
#navbar.ui.top.fixed.menu.attached
  navbar-logo
  navbar-menu
  
  .right.menu
    cart-icon

</template>

<script>
import CartIcon from '@/modules/cart/components/CartIcon';
import NavbarMenu from './components/NavbarMenu';
import NavbarLogo from './components/NavbarLogo';

export default {
  name: 'TheNavbar',

  components: {
    NavbarMenu,
    NavbarLogo,
    CartIcon
  }
};
</script>

<style lang="sass" scoped>
#navbar.ui.top.fixed.menu
  background-color: #2079C9
  position: static
  z-index: 103
  flex: 0

  &.attached
    border-bottom: 0
</style>
