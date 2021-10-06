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
          padding-top: 0 !important;
          .profile__account-type-content-wrapper {
            display: flex;
            .radio__button {
              width: 200px;
              height: 46px;
            }
            & > a {
              margin-left: auto;
            }
            .ant-btn {
              margin-top: 8px;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
`

export default ProfileLayoutStyles
