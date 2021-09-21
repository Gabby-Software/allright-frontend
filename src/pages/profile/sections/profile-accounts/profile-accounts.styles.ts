import styled from 'styled-components'

export default styled.section`
  .accounts {
    &__cont {
      @media all and (min-width: ${(p) => p.theme.vars.media.desktop}px) {
        display: flex;
        flex-wrap: wrap;
      }
    }
    &__add {
      cursor: pointer;
      height: 70px;
      background-color: ${(p) => p.theme.vars.colors.card};
      @media all and (min-width: ${(p) => p.theme.vars.media.desktop}px) {
        width: 247px;
      }
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      ${(p) => p.theme.mixin.dashedBorder(p.theme.vars.colors.secondary2)}
      ${(p) => p.theme.extend.flexCenter}
            font-weight: 500;
      font-size: 14px;
      color: ${(p) => p.theme.vars.colors.labelLight};
      svg {
        color: ${(p) => p.theme.vars.colors.secondary2};
      }
    }
    &__item {
      @media all and (max-width: ${(p) => p.theme.vars.media.desktop - 1}px) {
        margin: 0 0 12px 0;
      }
    }
  }
`
