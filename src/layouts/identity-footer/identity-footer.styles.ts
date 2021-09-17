import styled from 'styled-components'

export default styled.div`
  height: 96px;
  background-color: white;
  border-top: 1px solid ${(p) => p.theme.vars.colors.secondary};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  ${(p) => p.theme.extend.flexCenter}
  padding: 0 42px;
  font-weight: 500px;
  font-size: 16px;
  z-index: ${(p) => p.theme.vars.zIndex.footer};
  .footer {
    &__copyright {
      color: ${(p) => p.theme.vars.colors.light2};
      margin-right: auto;
    }
    &__link {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      margin-left: 45px;
    }
  }
`
