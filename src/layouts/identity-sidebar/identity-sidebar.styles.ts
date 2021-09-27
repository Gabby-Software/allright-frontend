import styled from 'styled-components'

import bg from '../../assets/media/Hero.png'

export default styled.div`
  color: white;
  /* padding: 108px 45px; */
  padding: 2.5rem 3.625rem 2.8125rem;
  flex-shrink: 0;
  background: url(${bg}) 0 0;
  background-size: cover;
  width: 615px;
  max-width: 50%;
  height: 100vh;
  /* position: sticky;
  top: 0; */

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .sidebar {
    &__logo {
      width: auto;
      height: 100px;
      /* margin-bottom: 76px; */
      margin-bottom: 2.25rem;
      display: block;
    }
    &__body {
      padding: 3rem 2.75rem 3.375rem;
      border-radius: 10px;
      width: 100%;
      background: linear-gradient(
        142.05deg,
        rgba(181, 181, 181, 0.5) 12.87%,
        rgba(75, 75, 75, 0) 108.88%
      );
      backdrop-filter: blur(40px);
    }
    &__footer {
      margin-top: auto;
      margin-bottom: 0;
      color: ${(p) => p.theme.vars.colors.neutral_40};
      font-size: 0.75rem;
      font-weight: normal;
    }
  }
`
// @media all and (max-height: 800px) {
//   padding: 24px 45px 108px 45px;
//   .sidebar {
//     &__logo {
//       height: 80px;
//       margin-bottom: 24px;
//     }
//   }
// }
