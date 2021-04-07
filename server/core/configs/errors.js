const TESTING = process.env.NODE_ENV === 'testing';

module.exports = {
  // Custom application errors
  errors: [
    {
      name: 'FunctionValidationError',
      message: 'Failed to meet function requirements',
      code: 400
    }
  ],

  // Application custom error handlers
  handlers: {
    // Handle validations errors with BadRequestError
    ValidationError: 'BadRequestError',

    // Handle validations errors with BadRequestError
    FunctionValidationError: 'BadRequestError',

    // Handle errors with code 11000 with MongoDuplicatedError
    11000: 'DuplicatedEntityError'
  },

  // Every failed HTTP request to this urls will be terminated
  exclude: /^\/(assets|api)\//i,

  // Redirection urls
  redirect: {
    error: '/error?err=',
    lost: '/lost?url='
  },

  // Function to use for debugging
  debug: !TESTING
    ? /* istanbul ignore next */
      err => {
        console.log('START ERROR LOG:', new Date());
        console.log(err);
        console.log('END ERROR LOG:', new Date());
      }
    : null,

  // Condition to debug an error
  shouldDebug: err => err.code > 399
};
