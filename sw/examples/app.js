initApp()

function initApp() {
  register()
  bindEvent()
}

function register() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.register(
      '/examples/sw.js',
      { scope: '/examples/' }
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

function bindEvent() {
  document.querySelector('.icon0').addEventListener('click', () => navigator.serviceWorker.controller.postMessage('message'))
}
