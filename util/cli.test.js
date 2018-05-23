var cli = require('./cli')

describe('util/cli', function() {
  describe('configure()', function() {
    it('should bind methods to the instance', function() {
      var context = { test: true }
      context.configure = cli.configure
      context.createRegEx = function() {
        return this.test
      }

      context.configure()
      var createRegEx = context.createRegEx
      var result = createRegEx()

      expect(result).toEqual(true)
    })
  })
})
