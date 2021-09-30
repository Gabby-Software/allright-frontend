import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  .confirm {
    &__title {
      font-weight: 700;
      font-size: 1.375rem;
      margin: 0 0 5px 0;
      color: ${getColorCarry('neutral_100')};
      @media all and (max-height: 700px) {
        margin-top: 0px;
      }
    }
    &__desc {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 400;
      max-width: 258px;
      margin: 0 0 50px 0;
      color: ${getColorCarry('neutral_70')};

      @media ${mediaQueries.MOBILE} {
        max-width: 100%;
      }
    }

    &__cancel-btn {
      margin-top: 1rem;
    }
    &__buttons-wrapper {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`
