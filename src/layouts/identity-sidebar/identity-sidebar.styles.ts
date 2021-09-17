import styled from 'styled-components'
import bg from '../../assets/media/idenity-left.jpg'
export default styled.div`
  color: white;
  padding: 108px 45px;
  flex-shrink: 0;
  background: url(${bg}) 0 0;
  background-size: cover;
  width: 615px;
  max-width: 50%;
  height: 100vh;
  position: sticky;
  top: 0;
  .sidebar {
    &__logo {
      width: auto;
      height: 100px;
      margin-bottom: 76px;
      display: block;
    }
    &__body {
      padding: 45px 36px;
      background: linear-gradient(
        142.05deg,
        rgba(181, 181, 181, 0.5) 12.87%,
        rgba(75, 75, 75, 0) 108.88%
      );
      backdrop-filter: blur(40px);
    }
  }
  @media all and (max-height: 800px) {
    padding: 24px 45px 108px 45px;
    .sidebar {
      &__logo {
        height: 80px;
        margin-bottom: 24px;
      }
    }
  }
`
