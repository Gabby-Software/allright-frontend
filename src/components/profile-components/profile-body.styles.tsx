import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

type ProfileBodyStyleProps = {
  edit?: boolean
}

export default styled.div<ProfileBodyStyleProps>`
  padding-bottom: 2rem;

  .profile {
    &__main {
      // padding-top: 26px;
      .add-address-btn {
        margin-top: 36px;
        font-size: 1rem;
        border: none;
        box-shadow: none;
        display: inline-flex;
        width: unset;
        padding: 0;
        color: ${getColorCarry('blue_60')};
        font-weight: 500;
        font-size: 14px;
        svg {
          margin-left: 0.5rem;
        }
      }
      .address__grid {
        margin-bottom: 20px;
      }
    }
    &__card_row {
      display: flex;
      flex-direction: row;
    }
    &__action-btn {
      margin-top: 0 !important;
    }
    &__card-dark {
      background-color: ${getColorCarry('primaryDark_v2')};
      width: 100%;
      max-width: 300px;
      margin-right: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-wrapper {
        display: block;
      }

      &-title {
        font-size: 1rem;
        font-weight: 500;
        color: #fff;
        margin-bottom: 0.625rem;
        display: flex;
        align-items: center;

        & svg {
          margin-right: 0.5rem;
        }
      }

      &-sub {
        font-size: 0.875rem;
        font-weight: 400;
        color: #fff;
        margin-bottom: 0.625rem;
      }

      &-btn {
        width: fit-content;
        padding: 0;
        color: ${getColorCarry('link')};
        font-weight: 500;

        & svg {
          margin-left: 0.5rem;
        }
      }
    }

    &__grid {
      width: 100%;
      display: grid;
      grid-template-columns: ${({ edit }) =>
        edit ? '1fr 1fr' : '1fr 1fr 1fr'};
      grid-column-gap: 2rem;
      grid-row-gap: 2rem;

      &-user-names-mobile {
        display: none;
      }

      &-item {
        &-name,
        &-value {
          font-weight: 400;
          font-size: 0.875rem;
          color: ${getColorCarry('secondary2_v2')};
          line-height: 1.25rem;
          margin-bottom: 0.25rem;
        }
        .text_input__label,
        .select_input__label {
          margin-bottom: 3px;
        }
        .text_input__wrapper {
          margin-bottom: 0px;
        }
        .textarea__wrapper {
          .text_input__input {
            height: 130px;
          }
        }
        .text_input__input {
          padding: 9px 16px;
        }
        .ant-select {
          padding: 5px 16px;
        }
        &-value {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }

      &__dob-mobile {
        display: none;
      }
    }
  }

  .dark-cards {
    display: flex;
  }

  @media ${mediaQueries.MOBILE} {
    padding-bottom: 0;

    .profile {
      padding-bottom: 0;
      &__grid {
        grid-template-columns: 1fr;

        &-user-names-desktop {
          display: none;
        }

        &-user-names-mobile {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }

      &__dob-desktop {
        display: none;
      }

      &__dob-mobile {
        display: block;
      }

      &__card-dark {
        max-width: 100%;
        &-sub {
          color: ${getColorCarry('neutral_50')};
          font-weight: normal;
          padding: 0.5rem 1rem;
          margin-bottom: 0;
        }
        &-btn {
          padding: 0.5rem 1rem;
          font-size: 14px;
          line-height: 20px;
          color: ${getColorCarry('blue_50')};
          font-weight: normal;
        }
      }
    }

    .preview__mobile {
      flex-direction: column;
    }

    .previewContent__mobile {
      text-align: center;
      padding: 0;
    }

    .previewName__mobile {
      padding: 1.1875rem 0 0;
    }

    .dark-cards {
      flex-direction: column-reverse;
    }
  }
`
