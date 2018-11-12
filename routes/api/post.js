const debug = require('../../utils/debug')('api/post');

const posts = [
  {title: 'post 3', body: 'this is post 3'},
  {title: 'post 2', body: 'this is post 2'},
  {title: 'post 1', body: 'this is post 1'},
]

const index = () => (req, res, next) => {

  debug(`qs: ${JSON.stringify(req.query)}`)

  const limit = req.query.limit * 1 || 2
  const page = req.query.page * 1 || 1

  const begin = (page - 1) * limit
  const end = begin + limit

  res.json(posts.slice(begin, end))
}


module.exports = {
  index
}