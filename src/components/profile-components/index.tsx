import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'
import Button from '../buttons/button/button.component'
import CardComponent from '../cards/card/card.component'

export const EditRoot = styled.div``

export const Card = styled(CardComponent)<any>`
  width: 100%;
  margin-bottom: 1.25rem;
  flex-direction: ${(props) => (props.$row ? 'row' : 'column')};
  justify-content: ${(props) => (props.$between ? 'space-between' : 'stretch')};
  align-items: ${(props) => (props.$itemsCenter ? 'center' : 'stretch')};

  @media ${mediaQueries.MOBILE} {
    padding: 1.5rem 1.875rem;
  }
`

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.875rem;

  .edit {
    &__gender-mobile {
      display: none;
    }
    &__grid-user-names-mobile {
      display: none;
    }
    &__dob-mobile {
      display: none;
    }
  }

  @media ${mediaQueries.MOBILE} {
    grid-template-columns: 1fr;

    .edit__grid-user-names-mobile {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .edit__grid-user-names-mobile {
      display: none;
    }
    .edit__gender-mobile,
    .edit__dob-mobile {
      display: block;
    }
    .edit__gender-desktop,
    .edit__dob-desktop {
      display: none;
    }
  }
`

export const Preview = styled.div<any>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: ${(p) => (p.center ? 'center' : 'unset')};
`

export const PreviewImage = styled.div<any>`
  width: ${(p) => (p.noWidth ? 'unset' : '100px')};
  height: ${(p) => (p.noWidth ? 'unset' : '100px')};
  border-radius: ${(p) => (p.noRadius ? '0' : '9999px')};
  border: none;
  overflow: ${(p) => (p.noOverflow ? 'unset' : 'hidden')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & span {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    background-color: ${getColorCarry('primary')};
    border: 2px solid white;
    border-radius: 50%;
  }

  & img {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .profile__edit-image {
    img {
      position: relative;
    }
  }
`

export const PreviewContent = styled.div`
  padding-left: 1.75rem;
`

export const PreviewName = styled.p`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark_v2')};
  margin-bottom: 0;
`

export const PreviewSub = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${getColorCarry('dark_v2')};
  margin-bottom: 0;
`

export const ActionContainer = styled.div`
  padding-left: 2rem;
`
// border-left: 1px solid ${getColorCarry('inputBorder_v2')};

export const ActionButton = styled(Button)``

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark_v2')};
  margin-bottom: 1.25rem;

  @media ${mediaQueries.MOBILE} {
    text-align: left;
  }
`
