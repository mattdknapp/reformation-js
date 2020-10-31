import React from 'react'
import CuratedLabel from './CuratedLabel'
import { safeString } from '../lib/utilities'

const FieldLabel = (props) => {
  const { fieldId, label, explicitLabel, hideLabel } = props

  if (hideLabel) {
    return null
  }

  const content = explicitLabel || safeString(label)

  return (
    <label htmlFor={safeString(fieldId)}>
      <CuratedLabel content={content} />
    </label>
  )
}

export default FieldLabel
