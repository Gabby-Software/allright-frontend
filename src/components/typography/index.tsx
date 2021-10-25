import { BackLinkStyles, BackLinkNativeStyles } from './typography.styles'
import { LinkProps } from 'react-router-dom'
import { CaretLeftIcon } from '../../assets/media/icons'

interface BackLinkProps extends LinkProps {
  native?: boolean
  to: string
}

export function BackLink({ to, children, native }: BackLinkProps) {

  const content = (
    <>
      <CaretLeftIcon />
      <span>{children}</span>
    </>
  )

  if (native) {
    return (
      <BackLinkNativeStyles href={to}>
        {content}
      </BackLinkNativeStyles>
    )
  }
  return (
    <BackLinkStyles to={to}>
      {content}
    </BackLinkStyles>
  )
}
