import styled from 'styled-components'

export default styled.div`
  text-align: center;
  .fpc {
    &__image {
      color: ${(p) => p.theme.vars.colors.primary};
      width: 400px;
      max-width: 60%;
      height: auto;
    }
    &__support {
      margin: 24px 0 40px 0;
    }
  }
`
