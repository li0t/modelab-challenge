/**
 * jQuery plugin module.
 *
 * @module core/plugins/jquery
 */

import jQuery from 'jquery';

window.jQuery = jQuery;

const jQueryPlugin = {
  install: Vue => {
    Object.defineProperty(Vue.prototype, '$$', {
      value: window.jQuery
    });
  }
};

export default jQueryPlugin;
