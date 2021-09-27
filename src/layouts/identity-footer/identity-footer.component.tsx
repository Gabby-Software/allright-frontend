// import config from '../../config/branding.config'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import Styles from './identity-footer.styles'

type Props = {}
const IdentityFooter = ({}: Props) => {
  const { t } = useTranslation()
  return (
    <Styles>
      {/* <div className={'footer__copyright'}>
        {t('footer.copyright', {
          name: config.name,
          year: new Date().getFullYear()
        })}
      </div> */}
      <div className={'footer__link'}>{t('footer.support')}</div>
      <div className={'footer__link'}>{t('footer.tnb')}</div>
      <div className={'footer__link'}>{t('footer.privacy')}</div>
    </Styles>
  )
}

export default IdentityFooter
