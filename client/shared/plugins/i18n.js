/**
 * I18n plugin module.
 *
 * @module core/plugins/i18n
 */

import VueI18n from 'vue-i18n';
import Vue from 'vue';

import config from '@/shared/configs/i18n';

Vue.use(VueI18n);

const $i18n = new VueI18n(config);

export default $i18n;
