# jsgrep-cli

An alternative to grep which uses JavaScript's Regex, supports a match and a match-and-replace

## Installation

```
npm i jsgrep-cli -g
```

## Example

Match input from stdin:

```
ls -al ~/ | jsgrep " \.[a-z]+rc$"
```

Match and replace from stdin. Matches are exposed as `$1`, `$2`... variables (1-indexed), and must be escaped to prevent being interpreted by Bash:

```
ls -al ~/ | jsgrep ".+ (\.[a-z]+rc$)" "\$1"
```

Passing flags (default `i`):

```
ls -al ~/ | jsgrep " \.[a-z]+rc$" --flags iu
```
