import { mainHost } from '../pipes/main-host'
import logger from './logger.manager'

export type IframeEventType = {
  action: string
  payload?: any
}
// document.domain = document.location.hostname.split('.').slice(1).join('.');
export default class IframeManager {
  private w: Window
  private events: { [key: string]: (data: any) => void } = {}
  static messages = {
    CHECK_LOGIN: 'check_login',
    DO_LOGIN: 'do_login'
  }
  constructor(targetWindow: Window) {
    this.w = targetWindow
    window.addEventListener('message', ({ data }) => {
      const { key, ...payload } = data
      if (this.events[key]) this.events[key](payload)
    })
  }
  public send<G>(event: IframeEventType): Promise<G> {
    return new Promise((res) => {
      const key = Math.random().toString(36)
      this.events[key] = ({ response }) => res(response)
      try {
        this.w.postMessage(
          { event: event.action, key, ...event.payload },
          '*'
          // document.location.hostname.split('.').slice(1).join('.')
        )
      } catch (e) {
        logger.error(e)
      }
    })
  }
}
