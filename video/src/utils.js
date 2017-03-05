export const load(src) {

}

export const loadImage = (raw, done, progress) => {
  return Promise.all(
    [].concat(raw).map(loadOneImage)
  )
}

export const loadVideo = (url, done, progress) => {
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
          done()
        }
      }
      xhr.onprogress = () => progress()
      xhr.onerror = () => {
        resolve(src)
        done()
      }
      xhr.send(null)
    })
    .catch(() => {
      Promise.resolve(src)
      done()
    })
}

function loadOneImage(src) {
  const img = document.createElement('img')
  return new Promise((resolve, reject) => {
    img.onload = resolve.bind(null, src)
    img.onerror = err => reject.bind(null, err)
    img.src = src
  })
}
