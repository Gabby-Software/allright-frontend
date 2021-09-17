import styled from 'styled-components'

export default styled.div`
  padding: 20px 20px 30px 20px;
  border-top: 1px solid ${(p) => p.theme.vars.colors.light2};
  font-weight: 500;
  font-size: 12px;
  margin-top: 40px;
  .footer {
    &__copyright {
      text-align: center;
      color: ${(p) => p.theme.vars.colors.light2};
    }
    &__links {
      ${(p) => p.theme.extend.flexCenter}
      justify-content: space-between;
      margin-top: 18px;
    }
    &__link {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      &:hover {
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
    }
  }
`
