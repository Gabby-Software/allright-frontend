// import config  from '../../config/branding.config'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { mainHost } from '../../pipes/main-host'
import Styles from './identity-footer.styles'

type Props = {}
const IdentityFooter = ({}: Props) => {
  const { t } = useTranslation()

  const ERLink = mainHost()
  const supportLink = `${ERLink}/contacts`
  const tncLink = `${ERLink}/terms-and-conditions`
  const privacyLink = `${ERLink}/privacy-policy`

  return (
    <Styles>
      {/* <div className={'footer__copyright'}>
        {t('footer.copyright', {
          name: config.name,
          year: new Date().getFullYear()
        })}
      </div> */}
      <a href={supportLink} className={'footer__link'}>
        {t('footer.support')}
      </a>
      <a href={tncLink} className={'footer__link'}>
        {t('footer.tnb')}
      </a>
      <a href={privacyLink} className={'footer__link'}>
        {t('footer.privacy')}
      </a>
    </Styles>
  )
}

export default IdentityFooter
