import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router'

import { LoadingPlaceholder } from '../../components/placeholders'
import { toast } from '../../components/toast/toast.component'
import { AuthResponseType } from '../../hooks/authorization.hook'
import api from '../../managers/api.manager'
import { auth } from '../../managers/auth.manager'
import cookieManager from '../../managers/cookie.manager'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { mainHost } from '../../pipes/main-host'
import { unblockCookies } from '../../utils/cookie'

const LoginAs = () => {
  const history = useHistory()
  const { setData } = useContext(AuthDataContext)

  const makeLoginRequest = async () => {
    const searchParams = new URLSearchParams(location.search)

    const url = searchParams.get('url')

    if (url) {
      api
        .get<AuthResponseType>(url)
        .then((res) => res.data)
        .then((res) => {
          cookieManager.set('access_token', res.access_token, res.expires_in)
          cookieManager.set('auth', JSON.stringify(res.user), res.expires_in)

          if (res.user.email_verified_at) {
            unblockCookies()
            document.location.href = mainHost()
          } else {
            auth.current = res
            setData(res)
          }
        })
        .catch((error) => {
          toast.show({
            type: 'error',
            msg: error.response.data.message
          })
          history.push('/login')
        })
    } else {
      history.push('/login')
    }
  }

  useEffect(() => {
    makeLoginRequest()
  }, [])

  return <LoadingPlaceholder spacing />
}

export default LoginAs
