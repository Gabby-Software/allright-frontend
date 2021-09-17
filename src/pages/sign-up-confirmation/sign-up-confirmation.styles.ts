import styled from 'styled-components'

export default styled.div`
  .confirm {
    &__title {
      font-weight: 700;
      font-size: 1.5rem;
      margin: 0 0 5px 0;
      @media all and (max-height: 700px) {
        margin-top: 0px;
      }
    }
    &__desc {
      font-size: 18px;
      margin: 0 0 50px 0;
      color: ${(p) => p.theme.vars.colors.light2};
    }
  }
`
