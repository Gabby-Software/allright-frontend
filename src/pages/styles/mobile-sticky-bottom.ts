import styled from 'styled-components'

export const MobileStickyBottom = styled.div`
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, transparent 20px, white 20px);
    padding: 30px 20px;
    z-index: 2;
  }
`
