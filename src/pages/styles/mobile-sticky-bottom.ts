import styled from 'styled-components'

export const MobileStickyBottom = styled.div`
  font-weight: normal;
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    width: 100%;
    z-index: 2;
    margin: 53px 0 57px;
  }
`
