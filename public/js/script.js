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
      return http('get', '/api/posts')
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


  const onload = () => {
    const timelineEl = document.querySelector('#timeline')
    if (!timelineEl) throw Error ('#timeline element is required')
    loadTimeline(timelineEl)



  }



  document.addEventListener('DOMContentLoaded', onload);
})()