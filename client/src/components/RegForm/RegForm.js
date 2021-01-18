import React from 'react'
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import TextField from '../TextField/TextField'
import './RegForm.scss'
import config from '../../config/default.json'

function RegForm({handleSubmit, valid, submitting}) {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form__row'>
        <Field className='form__input' name='name' label='Имя' component={TextField} placeholder='Иван'></Field>
      </div>
      <div className='form__row'>
        <Field className='form__input' name='surname' label='Фамилия' component={TextField} placeholder='Иванов'></Field>
      </div>
      <div className='form__row'>
        <Field className='form__input' name='email' label='Почта' component={TextField} placeholder='test@gmail.com'></Field>
      </div>
      <div className='form__row'>
        <Field className='form__input' name='password' label='Пароль' type='password' component={TextField} placeholder='******'></Field>
      </div>
      <div className='form__row'>
        <Field className='form__input' name='repeatPassword' label='Повторите пароль' type='password' component={TextField} placeholder='******'></Field>
      </div>
      <Button type='submit' disabled={!valid && !submitting}>Зарегистрироваться</Button>
    </form>
  )
}

const validate = values => {
  const errors = {};
  if(!values.name){
    errors.name = 'Required'
  }
  if(!values.surname){
    errors.surname = 'Required'
  }
  if(!values.email){
    errors.email = 'Required'
  }
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(values.email)) {
    errors.email = 'Wrong email format!'
  }
  if(!values.password){
    errors.password = 'Required'
  }
  if(values.password !== values.repeatPassword){
    errors.repeatPassword = 'Password don`t match'
  }
  return errors
}

const asyncValidate = async values => {
  if (!values.email) return;
  const response = await axios.get(`${config.serverUrl}/api/registration/is_exist?email=${values.email}`);
  if (response.data.is_exist) {
    throw { email: 'This email is already taken' }
  }
};

export default reduxForm({
  form: "registration",
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(RegForm);