import styled from 'styled-components'

export default styled.div`
  text-align: center;
  font-size: 18px;
  color: ${(p) => p.theme.vars.colors.primaryDark};
  margin-top: 16px;
  a {
    color: ${(p) => p.theme.vars.colors.primary};
    transition: ${(p) => p.theme.vars.defaults.transition};
    text-decoration: none;
    font-weight: 600;
    &:hover {
      color: ${(p) => p.theme.vars.colors.primaryLight};
    }
  }
`
