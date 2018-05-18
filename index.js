var pkg = require('./package.json')
var REGEX_EOL = /(\r?\n)/
var EOL = require('os').EOL
var program = require('commander')
var safe = require('safe-regex')

process.on('uncaughtException', function(str) {
  console.error('\n  error: ' + str.message + '\n')
  process.exit(1)
})

/**
 * Parse arguments
 */
program
  .version(pkg.version)
  .usage('[options] <regex ...>')
  .option('-f, --flags <flags>', 'The used RegEx flags, default: i', 'i')
  .parse(process.argv)

var operation
switch (program.args.length) {
  case 1:
    operation = match(program.args[0], program.flags)
    break
  case 2:
    operation = matchReplace(program.args[0], program.args[1], program.flags)
    break
  default:
    throw new Error('RegEx argument missing')
}

/**
 * Is passed RegEx safe?
 */
var regex = new RegExp(program.args[0], program.flags)
if (!safe(regex)) {
  throw new Error(
    'Passed RegEx is potentially catastrophic (exponential-time: star-height > 1)'
  )
}

/**
 * Read from `stdin` pipe
 */
process.stdin.setEncoding('utf8')
process.stdin.on('readable', function() {
  var chunk = process.stdin.read()
  if (chunk !== null) {
    processInput(chunk)
  }
})

/**
 * Process input, line by line
 */
function processInput(chunk) {
  chunk
    .split(REGEX_EOL)
    .map(operation)
    .filter(function filterEmptyLines(line) {
      return !!line
    })
    .forEach(function stdout(out) {
      process.stdout.write(out)
      process.stdout.write(EOL)
    })
}

/**
 * Operation: Match
 */
function match(matchRegexStr, flags) {
  var matchRegex = new RegExp(matchRegexStr, flags)

  return function(line) {
    return line.match(matchRegex) ? line : ''
  }
}

/**
 * Operation: Match & Replace
 */
function matchReplace(matchRegexStr, replaceStr, flags) {
  var matchRegex = new RegExp(matchRegexStr, flags)

  return function(line) {
    if (!line.match(matchRegex)) {
      return ''
    }
    return line.replace(matchRegex, replaceStr)
  }
}
