const path = require('path');

/**
 * @description Automaticly synchronizes database with the actual state of Sequelize models.
 * @docs https://sailsjs.com/docs/concepts/extending-sails/generators/custom-generators
 * 
 * Usage:
 * This handler should be added to your .sailsrc file for registering
 * a custom sails generator. 
 * The shell command to be executed will be:
 * `sails generate <generator-name>`,
 * where:
 *   a) `generator-name` is a name used for generator in .sailsrc file
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
    const db = require(path.resolve(__dirname, '../../../../../resources/sql/models'));
    
    db.sequelize
      .sync({ alter: true })
      .then(() => {
        done();
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        done(err);
        process.exit();
      });
  },
  targets: {},

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` and `copy` builtins)
   *
   * @type {String}
   */
  templatesDirectory: path.resolve(__dirname, './templates'),
};
