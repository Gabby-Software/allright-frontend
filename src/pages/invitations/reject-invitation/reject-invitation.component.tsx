import React, { useState, useEffect, useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Routes } from '../../../enums/routes.enum'
import InvitationManager from '../../../managers/invitation.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import logger from '../../../managers/logger.manager'
import { toast } from '../../../components/toast/toast.component'
import { serverError } from '../../../pipes/server-error.pipe'
import { AuthDataContext } from '../../../modules/auth/auth-data.context'
import { mainHost } from '../../../pipes/main-host'
import { unblockCookies } from '../../../utils/cookie'

enum states {
  NONE,
  SUCCESS,
  ERROR
}

const AcceptInvitation = () => {
  const { id } = useParams<{ id: string }>()
  const [state, setState] = useState(states.NONE)
  const { data, setData } = useContext(AuthDataContext)
  const [newUser, setNewUser] = useState(true)
  const [query, setQuery] = useState('')
  const { t } = useTranslation()
  useEffect(() => {
    const query = new URLSearchParams(document.location.search)
    const expires = query.get('expires')
    const signature = query.get('signature')
    if (!(id && expires && signature)) {
      return setState(states.ERROR)
    }
    InvitationManager.rejectInvitation(id, expires, signature)
      .then((res) => {
        logger.success('INVITATION REJECT SUCCESS', res)
        toast.show({ type: 'success', msg: t('alerts:invitation-reject') })
        setNewUser(res.user.is_new_user)
        setData(res)
        setQuery(res.user.set_password_url.split('?')[1])
        setState(states.SUCCESS)
      })
      .catch((e) => {
        toast.show({ type: 'error', msg: serverError(e) })
        setState(states.ERROR)
      })
  }, [])
  if (state === states.SUCCESS) {
    if (!newUser) {
      unblockCookies()
      document.location.href = mainHost()
      return null
    } else {
      return <Redirect to={Routes.INVITATIONS_ONBOARD + `?${query}`} />
    }
  }
  if (state === states.ERROR) {
    if (data?.access_token) {
      document.location.href = mainHost()
      return null
    } else {
      return <Redirect to={Routes.LOGIN} />
    }
  }
  return null
}

export default AcceptInvitation
