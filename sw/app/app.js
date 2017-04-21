import './style.css'

initApp()

function initApp() {
  subscribe()
  register()
  bindEvent()
}

function register() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.register(
      '/sw.js',
      { scope: '/' }
    ).then((reg) => {
      // registration worked
      console.log(`Registration succeeded. Scope is ${reg.scope}`)
    }).catch((error) => {
      // registration failed
      console.log(`Registration failed with ${error}`)
    })
  }
  return null
}

function subscribe() {
  if (!navigator.serviceWorker) {
    return
  }

  navigator.serviceWorker.ready
    .then(reg => reg.pushManager.getSubscription()
    .then(subscription => {
      if (subscription) {
        return Promise.resolve(subscription)
      }
      return reg.pushManager.subscribe({ userVisibleOnly: true })
    })
    .then(pushSubscription => {
      console.log('remain endpoint key: ', pushSubscription.endpoint)
    })
    .catch((err) => {
      console.warn('Error during getSubscription()', err)
    }))
}

function bindEvent() {
  document.querySelector('.icon0').addEventListener('click', () => {
    const msgChannel = new MessageChannel()
    msgChannel.port1.onmessage = event => console.log('client: receive msg from sw "%s"', event.data)
    navigator.serviceWorker.controller.postMessage('msg from client', [msgChannel.port2])
  })
}
