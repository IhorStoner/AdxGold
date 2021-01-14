import React from 'react'
import { Button } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import TextField from '../TextField/TextField'

function AuthForm({handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form__row'>
        <Field className='signUpForm__input' name='email' label='Email' component={TextField} placeholder='login: test@gmail.com'></Field>
      </div>
      <div className='form__row'>
      <Field className='signUpForm__input' name='password' label='Password' type='password' component={TextField} placeholder='password: 123'></Field>
      </div>
      <Button type='submit'>Войти</Button>
    </form>
  )
}

export default reduxForm({
  form: "authForm",
})(AuthForm);