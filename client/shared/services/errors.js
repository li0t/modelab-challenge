/**
 * Errors service.
 *
 * @module shared/services/errors
 */

const is = require('@fiquu/is');

/**
 * Builds an error function.
 *
 * @param {Object} options The error definition.
 * @param {String} options.name The error name.
 * @param {String} options.message The error default message.
 * @param {String} options.code The error HTTP response code.
 *
 * @returns {Error} The created custom error.
 */
export function buildError(options) {
  const isMalformed = is.empty(options) || is.empty(options.name) || is.empty(options.message);
  if (isMalformed) {
    throw new Error('Malformed custom error');
  }

  /**
   * Custom Error template.
   *
   * @private
   *
   * @param {String} message The error's message.
   */
  function CustomError(message) {
    Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: options.name || 'CustomError'
    });

    Object.defineProperty(this, 'code', {
      enumerable: false,
      writable: true,
      value: options.code
    });

    Object.defineProperty(this, 'message', {
      enumerable: false,
      writable: true,
      value: message || options.message
    });

    Error.captureStackTrace(this, CustomError);
  }

  Object.setPrototypeOf(CustomError.prototype, Error.prototype);

  return CustomError;
}

export const MissingAttributesError = buildError({
  name: 'MissingAttributesError',
  message: 'There are missing attributes',
  code: 400
});

export default {
  MissingAttributesError,
  buildError
};
