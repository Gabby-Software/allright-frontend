import extend from './_extends'
import mixin from './_mixins'
import { vars } from './_variables'


export default function theme(isClient?: boolean) {
  return { vars: vars(isClient), mixin, extend }
}
