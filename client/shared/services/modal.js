/**
 * Modals service module.
 *
 * @module shared/services/modals
 */

import Vue from 'vue';

export default new Vue({
  methods: {
    show(type = 'default') {
      this.$emit(`modal:show:${type}`);
    },

    close() {
      this.$emit('modal:close');
    }
  }
});
