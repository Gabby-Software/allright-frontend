import styled from 'styled-components'

export default styled.p`
  font-size: 14px;
  color: ${(p) => p.theme.vars.colors.neutral_70};
  font-weight: 400;
  margin-top: 54px;
  margin-bottom: 0;
  @media all and (max-height: 800px) {
    margin-top: 20px;
  }
  a {
    margin-top: 10px;
    display: block;
    color: ${(p) => p.theme.vars.colors.primary};
    font-weight: 700;
  }

  .black__link {
    color: ${(p) => p.theme.vars.colors.neutral_100};
  }
`
