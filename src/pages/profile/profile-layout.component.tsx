import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import Styles from './profile-layout.styles'

type Props = {
  sidebar: React.ComponentType<any>
  children: React.ReactNode
  w?: string
}
const ProfileLayout = ({ w, sidebar: Sidebar, children }: Props) => {
  return (
    <Styles>
      <IdentitySidebar noFooter={true}>
        <Sidebar />
      </IdentitySidebar>
      <main className={'layout__main'}>
        <div
          className={'layout__wrapper'}
          style={w ? { maxWidth: w } : undefined}
        >
          {children}
        </div>
      </main>
    </Styles>
  )
}

export default ProfileLayout
