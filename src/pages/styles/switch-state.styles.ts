import styled from 'styled-components'

export default styled.p`
  font-size: 14px;
  color: #333333;
  font-weight: 400;
  margin-top: 54px;
  margin-bottom: 0;
  @media all and (max-height: 800px) {
    margin-top: 20px;
  }
  a {
    margin-top: 5px;
    display: block;
    color: ${(p) => p.theme.vars.colors.primary};
    font-weight: 700;
  }
`
