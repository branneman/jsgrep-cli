var io = require('./io')

describe('util/io', function() {
  describe('configure()', function() {
    it('should bind methods to the instance', function() {
      var context = { test: true }
      var fn = function() {
        return this.test
      }
      context.configure = io.configure
      context.readStdin = context.writeStdout = context.setupErrorHandler = fn

      context.configure()
      var readStdin = context.readStdin
      var writeStdout = context.writeStdout
      var setupErrorHandler = context.setupErrorHandler
      var result1 = readStdin()
      var result2 = writeStdout()
      var result3 = setupErrorHandler()

      expect(result1).toEqual(true)
      expect(result2).toEqual(true)
      expect(result3).toEqual(true)
    })
  })
})
