import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
  width: 100%;
  min-height: calc(100vh - 106px);
  background-color: ${getColorCarry('background_v2')};
  & > div {
    padding: 8px 0 28px;
  }
`

export default Wrapper
