import { Form, Formik } from 'formik'
import { useContext } from 'react'

import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import Steps from '../../components/steps/steps.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Skip } from '../styles/skip.styles'
import { OnBoardContext, OnBoardContextTypeNotNull } from './onboard.context'
import { OnBoardStepType } from './onboard.type'
import OnboardItem from './onboard-item.component'

const OnboardStep = ({
  validationSchema,
  fields,
  trainer,
  client,
  desc
}: OnBoardStepType) => {
  const { steps, data, onSubmit, step } = useContext(
    OnBoardContext
  ) as OnBoardContextTypeNotNull
  const { type } = data
  const { t } = useTranslation()

  const renderSkip = () => {
    console.log({ desc: steps[step].desc })
    if (
      steps[step].desc === 'onboard-set-password' ||
      step === steps.length - 1 ||
      (step === steps.length - 1 && desc !== 'add-account.onboard')
    ) {
      return null
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <Skip />
      </div>
    )
  }

  return (
    <Steps.Step>
      {/* {step === steps.length - 1 ? null : (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Skip />
        </div>
      )} */}
      {renderSkip()}
      <Formik
        initialValues={{ ...data }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
        initialTouched={{ tnb: true }}
      >
        <Form>
          {({ client, trainer }[type as 'client' | 'trainer'] || fields).map(
            (field) => (
              <OnboardItem key={field.type} {...field} /> // props spreading is difficult to read/understand!!!
            )
          )}
          <ButtonSubmit className={'steps__button'}>
            {t(steps.length - 1 > step ? 'next' : 'finish')}
          </ButtonSubmit>
        </Form>
      </Formik>
    </Steps.Step>
  )
}

export default OnboardStep
