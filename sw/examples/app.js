initApp()

function initApp() {
  register()
}

function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
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
}
