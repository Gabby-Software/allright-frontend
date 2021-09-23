import { Styles } from './page.styles'
import { PropsWithChildren } from 'react'
import Header from './components/header/header.component'

interface PageProps {}

export default function Page({ children }: PropsWithChildren<PageProps>) {
  return (
    <Styles>
      <Header />

      <div className="page__content">
        {children}
      </div>
    </Styles>
  )
}
