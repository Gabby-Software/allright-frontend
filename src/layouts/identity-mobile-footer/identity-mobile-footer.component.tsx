import { Link } from 'react-router-dom'

import config from '../../config/branding.config'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import Styles from './identity-mobile-footer.styles'

type IdentitFooterProp = {
  showLegals: boolean
}

const IdentityMobileFooter = ({ showLegals = true }: IdentitFooterProp) => {
  const { t } = useTranslation()

  return (
    <Styles>
      <div className={'footer__copyright'}>
        {t('footer.copyright', {
          year: new Date().getFullYear(),
          name: config.name
        })}
      </div>
      {showLegals && (
        <div className={'footer__links'}>
          <Link className={'footer__link'} to={'/support'}>
            {t('footer.tnb')}
          </Link>
          <Link className={'footer__link'} to={'/tnb'}>
            {t('footer.support')}
          </Link>
          <Link className={'footer__link'} to={'/privacy'}>
            {t('footer.privacy')}
          </Link>
        </div>
      )}
    </Styles>
  )
}

export default IdentityMobileFooter
