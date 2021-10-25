import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const BackLinkStyles = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: ${getColorCarry('link')};
  text-decoration: none;
  margin-bottom: 1.5rem;

  & svg {
    margin-right: 0.5rem;
  }
`

export const BackLinkNativeStyles = styled.a`
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: ${getColorCarry('link')};
  text-decoration: none;
  margin-bottom: 1.5rem;

  & svg {
    margin-right: 0.5rem;
  }
`

