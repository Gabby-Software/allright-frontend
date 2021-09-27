import styled from 'styled-components'
import { mediaQueries } from '../../../enums/screen-sizes.enum'

interface Props {
  color?: 'secondary'
}

export const Styles = styled.div<Props>`
  width: 100%;
  background-color: ${props => props.color === 'secondary' ? '#F8F8F8' : '#fff'};
  border-radius: 0.75rem;
  padding: 2rem;

  @media ${mediaQueries.MOBILE} {
    padding: 1.25rem;
  }
`
