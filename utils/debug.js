const colors = [
  {name: 'cyan',     value: '\x1b[36m'},
  {name: 'yellow',   value: '\x1b[33m'},
  {name: 'red',      value: '\x1b[31m'},
  {name: 'green',    value: '\x1b[32m'},
  {name: 'magenta',  value: '\x1b[35m'},
];
const resetColor = '\x1b[0m';

const debug = tag => {
  if (!tag) throw Error('tag should be required')

  const randIdx = Math.floor(Math.random() * colors.length)
  const color = colors[randIdx]

  return msg => {
    const logString = `${color.value}[${tag}]${resetColor} ${msg}`;
    console.log(logString);
    return logString;
  }
}

module.exports = debug;
