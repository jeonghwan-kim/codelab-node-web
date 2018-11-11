const logger = () => (req, res, next) => {
  const log = `${req.method} ${req.url}`;
  console.log(log);
  next();
}

module.exports = logger;
