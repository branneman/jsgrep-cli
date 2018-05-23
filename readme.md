# jsgrep-cli

[![Build Status](https://travis-ci.org/branneman/jsgrep-cli.svg?branch=master)](https://travis-ci.org/branneman/jsgrep-cli)

An alternative to grep which uses JavaScript's Regex, supports a match and a match-and-replace

## Installation

```
npm i jsgrep-cli -g
```

## Example

Match input from stdin, return any matching line:

```
ls -al ~/ | jsgrep " \.[a-z]+rc$"
```

Match and replace lines from stdin. Capturing groups are exposed as `$1`, `$2`... variables (1-indexed), and must probably be escaped to prevent being interpreted by your shell:

```
ls -al ~/ | jsgrep ".+ (\.[a-z]+rc$)" "\$1"
```

Passing flags (default `i`):

```
ls -al ~/ | jsgrep " \.[a-z]+rc$" --flags iu
```
