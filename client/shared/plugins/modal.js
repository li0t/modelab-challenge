/**
 * Formulas plugin module.
 *
 * @module shared/plugins/formulas
 */

import $modal from '../services/modal';

const Modal = {
  install: Vue => {
    Object.defineProperty(Vue.prototype, '$modal', {
      value: $modal
    });
  }
};

export default Modal;
