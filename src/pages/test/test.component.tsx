import React, { useState, useEffect, useContext } from 'react'
import Styles from './test.styles'
import IdentityLayout from '../../layouts/identity-layout/identity-layout.component'
import IdentitySidebar from '../../layouts/identity-sidebar/identity-sidebar.component'
import { Routes } from '../../enums/routes.enum'
import { AuthDataContext } from '../../modules/auth/auth-data.context'
import { OnBoardContext, OnBoardProvider } from '../onboard/onboard.context'
import { onBoardData } from '../onboard/onboard.data'
import Steps from '../../components/steps/steps.component'
import OnboardStep from '../onboard/onboard-step.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'

const TestContent = () => {}
const Test = () => {
  return <></>
}
export default Test
