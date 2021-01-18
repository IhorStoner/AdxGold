import React from 'react'

function TextField({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error, warning },
  ...rest
}) {

  let labelColor;

  if (error) {
    labelColor = 'red'
  } else if (warning) {
    labelColor = 'yellow'
  }
  const message = error || warning;
  return (
    <input
      label={label}
      type={type}
      loading={asyncValidating}
      {...input}
      {...rest}
    />
  )
}

export default TextField;