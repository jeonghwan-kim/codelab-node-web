const Response = res => {
  if (!res) throw Error('res is required');

  res.status = res.status || (code => {
    res.statusCode = code;
    return res;
  })

  res.set = res.set || ((key, value) => {
    res.setHeader(key, value);
    return res;
  })

  res.send = res.send || (text => {
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'text/plain');
    }
    res.end(text);
  })

  res.json = res.json || (data => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  })

  return res;
};

module.exports = Response;