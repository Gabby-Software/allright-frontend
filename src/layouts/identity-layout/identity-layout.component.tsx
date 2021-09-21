import IdentityFooter from '../identity-footer/identity-footer.component'
import IdentitySidebar from '../identity-sidebar/identity-sidebar.component'
import Styles from './identity-layout.styles'

type Props = {
  sidebar: React.ComponentType<any>
  children: React.ReactNode
  w?: string
}
const IdentityLayout = ({ w, sidebar: Sidebar, children }: Props) => {
  return (
    <Styles>
      <IdentitySidebar>
        <Sidebar />
      </IdentitySidebar>
      <main className={'layout__main'}>
        <div
          className={'layout__wrapper'}
          style={w ? { maxWidth: w } : undefined}
        >
          {children}
        </div>
        <IdentityFooter />
      </main>
    </Styles>
  )
}

export default IdentityLayout
