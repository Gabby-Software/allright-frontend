import React, { useContext } from 'react'
import { OnBoardStepType } from './onboard.type'
import Steps from '../../components/steps/steps.component'
import { Formik, Form } from 'formik'
import { OnBoardContext, OnBoardContextTypeNotNull } from './onboard.context'
import OnboardItem from './onboard-item.component'
import ButtonSubmit from '../../components/forms/button-submit/button-submit.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'

const OnboardStep = ({
  validationSchema,
  fields,
  trainer,
  client
}: OnBoardStepType) => {
  const { steps, data, onSubmit, step } = useContext(
    OnBoardContext
  ) as OnBoardContextTypeNotNull
  const { type } = data
  const { t } = useTranslation()
  return (
    <Steps.Step>
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
              <OnboardItem key={field.type} {...field} />
            )
          )}
          <ButtonSubmit>
            {t(steps.length - 1 > step ? 'next' : 'finish')}
          </ButtonSubmit>
        </Form>
      </Formik>
    </Steps.Step>
  )
}

export default OnboardStep
