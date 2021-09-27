import styled from 'styled-components'

export default styled.div`
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    display: flex;
    > * {
      width: 100%;
      margin-right: 14px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`
