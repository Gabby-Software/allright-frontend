export const mainHost = () => {
  if (document.location.host.startsWith('localhost')) {
    return 'http://localhost:8022'
  }
  return (
    document.location.protocol +
    '//' +
    document.location.hostname.split('.').slice(1).join('.')
  )
}
