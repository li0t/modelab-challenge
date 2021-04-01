/**
 * Map store module service module.
 *
 * @module shared/services/map-store-module'
 */

// TODO: Refactor getOwnProperty use.
/* eslint-disable no-prototype-builtins */

import { mapState } from 'vuex';
import $store from '@/store';

import is from '@fiquu/is';

/**
 * Creates a module mapped getter.
 *
 * @param {String} [moduleName] The name of the store module.
 * @param {String} getter the name of the getter.
 * @returns {Function} A mapper function.
 */
function _mapModuleGetters(moduleName, getter) {
  return function map() {
    const mod = moduleName || this.module;

    return $store.getters[`${mod}/${getter}`];
  };
}

/**
 * Creates an object or array of mapped store getters.
 *
 * @param {String} [moduleName] The name of the store module.
 * @returns {Object} An object of mappers.
 */
export function mapModuleGetters(...args) {
  const mod = args.length > 1 ? args[0] : undefined;

  let getters = args[args.length - 1];

  const mapped = {};

  if (is.object(getters)) {
    for (const getter in getters) {
      if (getters.hasOwnProperty(getter)) {
        const prop = getters[getter];

        mapped[getter] = _mapModuleGetters(mod, prop);
      }
    }
  } else if (!Array.isArray(getters)) {
    getters = [getters];
  }

  for (let i = 0; i < getters.length; i++) {
    const prop = getters[i];

    mapped[prop] = _mapModuleGetters(mod, prop);
  }

  return mapped;
}

/**
 * Creates a store attribute map function.
 *
 * @param {String} [moduleName] The name of the store module.
 * @param {String} attrName The name of the attribute to map.
 * @returns {Function} A mapper function.
 */
function _mapModuleState(moduleName, attrName) {
  return function map(state) {
    const mod = moduleName || this.module;

    return state[mod] && state[mod][attrName];
  };
}

/**
 * Creates an object or array of mapped store attributes.
 *
 * @param {String} [moduleName] The name of the store module.
 * @returns {Object} An object of mappers.
 */
export function mapModuleState(...args) {
  const mod = args.length > 1 ? args[0] : undefined;

  let props = args[args.length - 1];

  const mapped = {};

  if (is.object(props)) {
    for (const propName in props) {
      if (props.hasOwnProperty(propName)) {
        const prop = props[propName];

        mapped[propName] = _mapModuleState(mod, prop);
      }
    }
  } else if (!Array.isArray(props)) {
    props = [props];
  }

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];

    mapped[prop] = _mapModuleState(mod, prop);
  }

  return mapState(mapped);
}

/**
 * Creates a store action map function.
 *
 * @param {String} [moduleName] The name of the store module.
 * @param {String} actionName The name of the action to map.
 * @returns {Function} A mapper function.
 */
function _mapModuleAction(moduleName, actionName) {
  return function action(payload) {
    const mod = moduleName || this.module;

    return this.$store.dispatch(`${mod}/${actionName}`, payload);
  };
}

/**
 * Creates an object or array of mapped store actions.
 *
 * @param {String} [moduleName] The name of the store module.
 * @returns {Object} An object of mappers.
 */
export function mapModuleActions(...args) {
  const mod = args.length > 1 ? args[0] : undefined;

  let actions = args[args.length - 1];

  const mapped = {};

  if (is.object(actions)) {
    for (const actionName in actions) {
      if (actions.hasOwnProperty(actionName)) {
        const action = actions[actionName];

        mapped[actionName] = _mapModuleAction(mod, action);
      }
    }
  } else if (!Array.isArray(actions)) {
    actions = [actions];
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    mapped[action] = _mapModuleAction(mod, action);
  }

  return mapped;
}

/**
 * Creates a store mutation map function.
 *
 * @param {String} [moduleName] The name of the store module.
 * @param {String} mutationName The name of the mutation to map.
 * @returns {Function} A mapper function.
 */
function _mapModuleMutation(moduleName, mutationName) {
  return function mutation(payload) {
    const mod = moduleName || this.module;

    this.$store.commit(`${mod}/${mutationName}`, payload);
  };
}

/**
 * Return a mapped action or array of mutations.
 * @param {String} [moduleName] The name of the store module.
 * @returns {Object} An object of mappers.
 */
export function mapModuleMutations(...args) {
  const mod = args.length > 1 ? args[0] : undefined;

  let mutations = args[args.length - 1];

  const mapped = {};

  if (is.object(mutations)) {
    for (const mutationName in mutations) {
      if (mutations.hasOwnProperty(mutationName)) {
        const mutation = mutations[mutationName];

        mapped[mutationName] = _mapModuleMutation(mod, mutation);
      }
    }
  } else if (!Array.isArray(mutations)) {
    mutations = [mutations];
  }

  for (let i = 0; i < mutations.length; i++) {
    const mutation = mutations[i];

    mapped[mutation] = _mapModuleMutation(mod, mutation);
  }

  return mapped;
}

export default {
  moduleMutations: mapModuleMutations,
  moduleGetters: mapModuleGetters,
  moduleActions: mapModuleActions,
  moduleState: mapModuleState
};
