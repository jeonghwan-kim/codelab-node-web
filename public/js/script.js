(() => {
  const http = (method, url, data = null) => new Promise((resolve, reject) => {
    const req = new  XMLHttpRequest()
    req.open(method, url, true)
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.onreadystatechange = evt => {
      if (req.readyState == 4) {
        let responseText = req.responseText.trim()
        responseText = responseText ? JSON.parse(responseText) : {}

        if(req.status >= 200 && req.status < 300) {
          resolve(responseText)
        } else {
          reject({
            status: req.status,
            responseText
          })
        }
      }
    }
    req.send(data)
  })

  const api = {
    getPosts() {
      return http('get', '/api/posts?limit=5&page=1')
    },
    createPost({title, body}) {
      const data = `title=${title}&body=${body}`
      return http('post', '/api/posts', data)
    }
  }

  const loadTimeline = el => {
    el.innerHTML = 'Loading...'

    api.getPosts()
      .then(data => {
        el.innerHTML = data.reduce((html, post) => {
          html += `
            <h2>${post.title}</h2>
            <div>${post.body}</div>
          `
          return html
        }, '')
      })
      .catch(err => {
        console.log(err)
        el.innerHTML = 'Error: Refresh this page'
      })
  }

  const initAddPostForm = el => {
    const onSubmitAddPostForm = e => {
      e.preventDefault()

      const formMsgEl = document.querySelector('#form-msg')
      formMsgEl.innerHTML = ''

      let {title = {}, body = {}} = e.target
      title = title.value || ''
      body = body.value || ''

      if (!title || !body) {
        return formMsgEl.innerHTML = 'Insert text and body'
      }

      api.createPost({title, body})
        .then(data => {
          formMsgEl.innerHTML = ''
          e.target.reset()

          const timelineEl = document.querySelector('#timeline')
          if (!timelineEl) throw Error ('#timeline element is required')
          loadTimeline(timelineEl)
        })
        .catch(err => {
          formMsgEl.innerHTML = 'Error: Retry'
        })
    }
    el.addEventListener('submit', onSubmitAddPostForm)
  }

  const onload = () => {
    const timelineEl = document.querySelector('#timeline')
    if (!timelineEl) throw Error ('#timeline element is required')
    loadTimeline(timelineEl)

    const formEl = document.querySelector('#add-post-form')
    if (!formEl) throw Error ('#add-post-form element is required')
    initAddPostForm(formEl)



  }



  document.addEventListener('DOMContentLoaded', onload);
})()