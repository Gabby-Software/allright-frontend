import styled from 'styled-components'

export default styled.div`
  width: 100%;
  max-width: 395px;
  margin: 40px auto 2.8125rem;
  display: flex;
  justify-content: space-between;
  font-weight: 400;

  .footer__link {
    font-size: 0.875rem;
    color: ${(p) => {
      return p.theme.vars.colors.neutral_80
    }};
  }
`
