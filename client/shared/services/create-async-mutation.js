/**
 * Create async mutation service module.
 * 
 * @module shared/services/create-async-mutation 
 */

/**
 * Creates an async mutation definition.
 * 
 * @param {String} action The mutation verb.
 * @param {String} key The store attribute name.
 * @returns {Object} A mutation object.
 */
function createAsyncMutation(action, key) {
  const act = action.toUpperCase();
  const k = key.toUpperCase();

  return {
    SUCCESS: `${act}_${k}_SUCCESS`,
    FAILURE: `${act}_${k}_FAILURE`,
    PENDING: `${act}_${k}_PENDING`,
    loadingKey: `LOADING_${k}`,
    failureKey: `FAILED_${k}`,
    sourceKey: `SOURCE_${k}`,
    stateKey: `${key}`
  };
}

export default createAsyncMutation;
