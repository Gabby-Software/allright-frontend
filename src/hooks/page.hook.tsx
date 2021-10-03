import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

import routes from '../config/routes.config'
export const usePage = () => {
  const location = useLocation()
  return useMemo(() => {
    // eslint-disable-next-line
    const path = location.pathname.substring(1).replace(/:[^\/]+/g, '[^/]+')
    const reg = new RegExp(path)
    return routes.find((r) => reg.test(r.url))
  }, [location])
}
