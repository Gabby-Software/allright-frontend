import styled from 'styled-components'

export default styled.div`
  .add-account {
    &__title {
      color: ${(p) => p.theme.vars.colors.neutral_90};
      font-weight: bold;
      font-size: 22px;
      line-height: 32px;
      margin: 0;
      text-align: center;
    }
    &__sub-title {
      margin: 17px 0 0;
      color: ${(p) => p.theme.vars.colors.neutral_70};
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 400;
      text-align: center;
    }
    &__options {
      margin-top: 5rem;
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet + 1}px) {
        display: flex;
        justify-content: center;
      }
    }
    &__option {
      &:hover {
        background-color: ${(p) => p.theme.vars.colors.gray_1};
      }
      transition: ${(p) => p.theme.vars.defaults.transition};
      background-color: white;
      border: 1px solid ${(p) => p.theme.vars.colors.secondary2};
      border-radius: 16px;
      padding: 23px;
      margin: 20px 0;
      flex-shrink: 0;
      position: relative;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      display: flex;
      text-align: left;
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet + 1}px) {
        width: 192px;
        display: block;
        text-align: center;
        margin: 20px 13px;
      }
      @media (max-width: ${(p) => p.theme.vars.media.mobile}px) {
        height: 177px;
      }
      &__active {
        &:hover {
          color: white;
          background-color: ${(p) => p.theme.vars.colors.neutral_100};
        }
        background-color: ${(p) => p.theme.vars.colors.neutral_100};
        color: white;
        border: 1px solid ${(p) => p.theme.vars.colors.secondary2};
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
      }
      &__disabled {
        &:hover {
          background-color: white;
        }
        opacity: 0.5;
        cursor: default;
      }
      &__title {
        color: inherit;
        font-size: 600;
        font-weight: 18px;
        margin-bottom: 15px;
      }
      &__image {
        display: block;
        height: 60px;
        width: auto;
        margin: 8px 33px auto 5px;
        flex-shrink: 0;
        @media all and (min-width: ${(p) => p.theme.vars.media.tablet + 1}px) {
          margin: 27px auto 50px auto;
        }
      }
      &__desc {
        font-size: 10px;
        font-weight: normal;
      }
      &__note {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        font-weight: normal;
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-top: 26px;
        @media (max-width: ${(p) => p.theme.vars.media.mobile}px) {
          position: unset;
          margin-top: 12px;
          display: block;
        }
        &__red {
          color: ${(p) => p.theme.vars.colors.red_70};
        }
        &__blue {
          color: ${(p) => p.theme.vars.colors.blue_60};
        }
      }
    }
    &__submit {
      display: block;
      max-width: 320px;
      margin: 0px auto;
      font-weight: 500;
      &__wrapper {
        padding: 55px 0;
        margin-top: 2rem;
      }
      @media all and (max-width: 720px) {
        position: sticky;
        bottom: 20px;
        outline: 20px solid white;
      }
    }
  }
`
