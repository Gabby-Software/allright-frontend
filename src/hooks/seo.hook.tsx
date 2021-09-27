import React, { useState, useEffect } from 'react'
import { usePage } from './page.hook'

export const useSeo = () => {
  const page = usePage()
  useEffect(() => {
    if (page) {
      document.title = page.title
    }
  }, [page])
}
