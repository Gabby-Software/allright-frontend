import styled from 'styled-components'

export default styled.div`
  .add-account {
    &__title {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-weight: 700;
      font-size: 1.5rem;
      margin: 0 0 24px 0;
      text-align: center;
    }
    &__options {
      @media all and (min-width: ${(p) => p.theme.vars.media.tablet + 1}px) {
        display: flex;
        justify-content: center;
      }
    }
    &__option {
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
      &__active {
        background-color: ${(p) => p.theme.vars.colors.primaryDark};
        border: 1px solid ${(p) => p.theme.vars.colors.secondary2};
        color: white;
        box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
      }
      &__disabled {
        filter: grayscale(100%);
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
        margin: auto 33px auto 5px;
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
        margin-top: 2px;
      }
    }
    &__submit {
      display: block;
      max-width: 320px;
      margin: 40px auto;
      @media all and (max-width: 720px) {
        position: sticky;
        bottom: 20px;
        outline: 20px solid white;
      }
    }
  }
`
