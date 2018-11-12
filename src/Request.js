const Request = req => {
  if (!req) throw Error('req is required')

  const partials = req.url.split('?')

  const path = partials[0] || '/';
  req.path = req.path || path;

  if (!partials[1] || !partials[1].trim()) return req;

  const qs = partials[1].split('&').reduce((obj, p) => {
    const frag = p.split('=')
    obj[frag[0]] = frag[1]
    return obj
  }, {})


  req.query = req.params || qs
  return req
}

module.exports = Request
