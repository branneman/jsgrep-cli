module.exports = {
  configure: function configure(commander, isSafeRegEx) {
    this.commander = commander
    this.isSafeRegEx = isSafeRegEx

    this.createRegEx = this.createRegEx.bind(this)
    return this
  },

  setupArgumentHandler: function setupArgumentHandler(argv) {
    return this.commander
      .usage('[options] <regex ...>')
      .option('-f, --flags <flags>', 'The used RegEx flags, default: i', 'i')
      .parse(argv)
  },

  getCommand: function getCommand(program, match, matchReplace) {
    switch (program.args.length) {
      case 0:
        throw new Error('RegEx argument missing')
      case 1:
        var regex = this.createRegEx(program.args[0], program.flags)
        return match(regex)
      case 2:
        var regex = this.createRegEx(program.args[0], program.flags)
        return matchReplace(regex, program.args[1])
      default:
        throw new Error('Ambiguous arguments given, see --help')
    }
  },

  createRegEx: function createRegEx(regex, flags) {
    var regex = new RegExp(regex, flags)
    if (!this.isSafeRegEx(regex)) {
      throw new Error(
        'Passed RegEx is potentially catastrophic (exponential-time: star-height > 1)'
      )
    }
    return regex
  }
}
