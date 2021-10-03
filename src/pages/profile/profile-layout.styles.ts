import styled from 'styled-components'

import IdentityLayoutStyles from '../../layouts/identity-layout/identity-layout.styles'
import { getColorCarry } from '../../pipes/theme-color.pipe'

const ProfileLayoutStyles = styled(IdentityLayoutStyles)`
  .layout {
    &__main {
      background-color: ${getColorCarry('background_v2')};
    }
    &__wrapper {
      max-width: 100%;
      padding: 0 2.5rem;
      .profile {
        &__main {
          paddinng-top: 0 !important;
        }
      }
    }
  }
`

export default ProfileLayoutStyles
