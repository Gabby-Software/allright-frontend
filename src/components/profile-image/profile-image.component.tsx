import React, { useEffect, useState } from 'react'

import { classes } from '../../pipes/classes.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import Styles from './profile-image.styles'

type Props = {
  url: string | null
  placeholder: string
  className?: string
}
const ProfileImage = ({ url, placeholder, className }: Props) => {
  return (
    <Styles className={classes(className)}>
      {url ? (
        <img alt={'profile'} src={url} className={'profile-image__img'} />
      ) : (
        <div className={'profile-image__placeholder'}>
          <span>{placeholder}</span>
        </div>
      )}
    </Styles>
  )
}

export default ProfileImage
