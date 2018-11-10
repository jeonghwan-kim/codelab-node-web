const debug = tag => {
  if (!tag) throw Error('tag should be required')

  return (...msg) => {
    const logString = `${tag} ${msg}`;
    console.log(logString);
    return logString;
  }
}

module.exports = debug