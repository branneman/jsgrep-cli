var REGEX_EOL = /(\r?\n)/

module.exports = {
  configure: function configure(osEOL) {
    this.osEOL = osEOL

    this.readStdin = this.readStdin.bind(this)
    this.writeStdout = this.writeStdout.bind(this)
    this.setupErrorHandler = this.setupErrorHandler.bind(this)

    return this
  },

  isFalsy: function isFalsy(str) {
    return !!str
  },

  readStdin: function readStdin(cb) {
    process.stdin.setEncoding('utf8')
    process.stdin.on(
      'readable',
      function onStreamReadable() {
        var chunk = process.stdin.read()
        if (chunk !== null) {
          cb(chunk.split(REGEX_EOL))
        }
      }.bind(this)
    )
  },

  writeStdout: function writeStdout(str) {
    process.stdout.write(str)
    process.stdout.write(this.osEOL)
  },

  setupErrorHandler: function setupErrorHandler() {
    process.on(
      'uncaughtException',
      function errorHandler(str) {
        process.stderr.write('\n  error: ' + str.message + '\n\n')
        process.exit(1)
      }.bind(this)
    )
  }
}
