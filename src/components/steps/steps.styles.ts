import styled from 'styled-components'

const Style = styled.div.attrs(() => ({
  path: window.location.pathname as string
}))`
  overflow: hidden;
  width: 100%;
  .steps {
    &__wrapper {
      display: flex;
      transition: ${(p) => {
        return p.theme.vars.defaults.transition
      }};
    }
    &__dots {
      ${(p) => p.theme.extend.flexCenter}
      margin: 70px 0 0 0;
    }
    &__dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${(p) => p.theme.vars.colors.secondary2};
      transition: ${(p) => p.theme.vars.defaults.transition};
      margin: 0 15px;
      cursor: pointer;
      &__active {
        background-color: ${(p) => p.theme.vars.colors.primary};
        width: 14px;
        height: 14px;
      }
      &__past {
        cursor: pointer;
      }
    }
    &__step {
      width: 100%;
      overflow: hidden;
      padding: 0 1px;
      &:last-child {
        padding-top: ${(p) => (p.path === '/add-account' ? '0px' : '80px')};
        @media all and (max-width: ${(p) => p.theme.vars.media.mobile}px) {
          padding-top: 56px;
        }
      }
    }
  }

  .steps__button {
    font-weight: 500;
  }

  .text_input__label, .select_input__label {
    font-weight: 500 !important;
  }

  @media all and (max-width: ${(p) => p.theme.vars.media.mobile}px) {
    .onboard__row {
      display: flex;
      > * {
        width: 100%;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`

export default Style
