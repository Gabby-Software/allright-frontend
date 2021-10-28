export const mainHost = () => {
  if (document.location.host.startsWith('localhost')) {
    return 'http://localhost:8022'
  }

  // Redirect to dashboard for EatRight
  // if (document.location.host.includes('eatright')) {
  //   return (
  //     document.location.protocol +
  //     '//' +
  //     document.location.hostname.split('.').slice(1).join('.') + '/dashboard'
  //   )
  // }

  return (
    document.location.protocol +
    '//' +
    document.location.hostname.split('.').slice(1).join('.')
  )
}
