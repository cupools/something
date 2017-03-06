export const load(src) {

}

export const loadImage = (urls, progress) => {
  let notice = 0
  const target = [].concat(urls)
  const timer = setInterval(() => {
    if (notice === target.length) {
      clearInterval(timer)
    }
    progress(Math.floor(notice / target.length))
  }, 125)

  return Promise.all(
    target.map(loadOneImage).map(p => p.then(src => (notice += 1) && Promise.resolve(src)))
  )
}

function loadOneImage(src) {
  const img = document.createElement('img')
  return new Promise((resolve, reject) => {
    img.onload = resolve.bind(null, src)
    img.onerror = err => reject.bind(null, err)
    img.src = src
  })
}

export const loadVideo = (url, progress) => {
  const URL = window.webkitURL || window.URL
  if (!URL) return Promise.resolve(src)

  return new Promise(
    resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', src, true)
      xhr.responseType = 'blob'
      xhr.onload = function onload() {
        if (this.status === 200) {
          const myBlob = this.response
          const objectURL = URL.createObjectURL(myBlob)
          // myBlob is now the blob that the object URL pointed to.
          resolve(objectURL)
        }
      }
      xhr.onprogress = () => progress()
      xhr.onerror = () => {
        resolve(src)
      }
      xhr.send(null)
    })
    .catch(() => {
      Promise.resolve(src)
    })
}

