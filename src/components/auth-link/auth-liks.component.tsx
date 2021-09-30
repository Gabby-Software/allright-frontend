import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

const Styles = styled.div`
  margin-top: 2.5rem;
  .message {
    color: ${getColorCarry('neutral_70')};
    line-height: 1.25rem;
    font-size: 0.875rem;
    font-weight: 400;
    margin-bottom: 6px;
    text-align: center;
  }
  .linkWrapper {
    text-align: center;
  }
  a {
    margin-top: 10px;
    display: block;
    color: ${getColorCarry('primary')};
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
  }
`

type AuthLinkProps = {
  message: string
  linkText: string
  url: string
}

export default function AuthLink({ message, linkText, url }: AuthLinkProps) {
  return (
    <Styles>
      <div className="message">{message}</div>
      <div className="linkWrapper">
        <Link to={url}>{linkText}</Link>
      </div>
    </Styles>
  )
}
