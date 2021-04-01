/**
 * Components service.
 *
 * @module core/services/components
 */
import components from '../configs/components' 
import Vue from 'vue';

for (const componentId of Object.keys(components)) {

  const component = components[componentId];
  Vue.component(componentId, component);
}
