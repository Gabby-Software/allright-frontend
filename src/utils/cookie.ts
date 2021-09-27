import cookieManager from '../managers/cookie.manager'

export function blockCookies() {
  cookieManager.set('BLOCK_COOKIE_SET', '1')
}

export function unblockCookies() {
  cookieManager.remove('BLOCK_COOKIE_SET')
}
