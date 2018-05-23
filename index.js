#!/usr/bin/env node

var commander = require('commander')
var isSafeRegEx = require('safe-regex')
var osEOL = require('os').EOL

/**
 * Bootstrap app:
 *  Inject dependencies, parse CLI arguments
 */
var cli = require('./util/cli').configure(commander, isSafeRegEx)
var io = require('./util/io').configure(osEOL)
io.setupErrorHandler()
var program = cli.setupArgumentHandler(process.argv)

/**
 * Run app:
 *  A read-eval-print-loop for each line
 */
io.readStdin(function _readStdin(data) {
  data
    .map(cli.getCommand(program, match, matchReplace))
    .filter(io.isFalsy)
    .forEach(io.writeStdout)
})

/**
 * Command: Match
 */
function match(matchRegex) {
  return function _match(line) {
    return line.match(matchRegex) ? line : ''
  }
}

/**
 * Command: Match & Replace
 */
function matchReplace(matchRegex, replaceStr) {
  return function _matchReplace(line) {
    if (!line.match(matchRegex)) {
      return ''
    }
    return line.replace(matchRegex, replaceStr)
  }
}
