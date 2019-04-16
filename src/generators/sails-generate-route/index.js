const path = require('path');
const _ = require('lodash');
const replace = require('replace');
require('colors');

/**
 * @description Generates route entries for the given schema name.
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 * 
 * Usage:
 * This handler should be added to your .sailsrc file for registering
 * a custom sails generator. 
 * The shell command to be executed will be:
 * `sails generate <generator-name> <schema-name>`,
 * where:
 *   a) `generator-name` is a name used for generator in .sailsrc file
 *   b) `schema-name` is a name of schema to be added
 */
module.exports = {
  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Dictionary} scope
   * @param  {Function} done
   */
  before(scope, done) {
    if (_.isUndefined(scope.args[0])) {
      return done('Please provide a name for this controller.'.yellow);
    }

    const name = scope.args[0];
    const route = _.snakeCase(name);
    const file = _.startCase(scope.args[0]).replace(/ /g, '');
    replace({
      regex: '// ////.+',
      replacement: `// //// DO NOT TOUCH THIS LINE

  // Endpoints for ${_.startCase(name)}
  'GET /api/${route}/stats': '${file}Controller.stats',
  'GET /api/${route}': '${file}Controller.list',
  'GET /api/${route}/:id': '${file}Controller.get',
  'POST /api/${route}': '${file}Controller.post',
  'PUT /api/${route}/:id': '${file}Controller.put',
  'PATCH /api/${route}/:id': '${file}Controller.patch',
  'PATCH /api/${route}/:id/export': '${file}Controller.export',
  'PATCH /api/${route}/:id/import': '${file}Controller.import',
  'DELETE /api/${route}/:id': '${file}Controller.delete',`,

      paths: [path.resolve(__dirname, '../../../../../config/routes.js')],
      recursive: false,
      silent: false,
    });

    replace({
      regex: '// ////.+',
      replacement: `// //// DO NOT TOUCH THIS LINE
  ${file}Controller: {
    '*': ['isAuthorized'],
  },`,

      paths: [path.resolve(__dirname, '../../../../../config/policies.js')],
      recursive: false,
      silent: false,
    });    

    return done();
  },

  targets: {},

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` and `copy` builtins)
   *
   * @type {String}
   */
};
