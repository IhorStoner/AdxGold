import React, { useCallback,useContext,useState,useEffect } from 'react'
import { Header, Message } from 'semantic-ui-react'
import AuthForm from '../../components/AuthForm/AuthForm'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom'
import config from '../../config/default.json'

export default function AuthPage() {
  const [ signInSuccess, setSignInSuccess ] = useState(false);
  const [ error, setError ] = useState('');
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = useCallback(async values => {
    const result = await axios.post(`${config.serverUrl}/api/auth`, values)
    .then(res => {
      auth.login(res.data.token,res.data.id)
      setSignInSuccess(true)     
      setError('')
      history.push('/home')
    })
    .catch(err => {
      setError(err.response.data.error)
      setSignInSuccess(false)
    })
  },[])
  
  return (
    <div className='container'>
      <Header as='h2'>Введите почту и пароль что-бы войти</Header>
      <AuthForm onSubmit={onSubmit}/>
      {
        error &&
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      }
    </div>
  )
}