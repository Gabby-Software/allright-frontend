import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link)`
  display: block;
  font-weight: 500;
  color: #333333;
  font-size: 14px;
  text-align: right;
  margin-top: 24px;
  &:hover {
    color: #333333;
    text-decoration: underline;
  }
`
