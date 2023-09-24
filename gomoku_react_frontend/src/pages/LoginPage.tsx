import { useState, useContext, useEffect, useRef } from 'react'
import { Button, Input, Message } from '../components'
//import users from '../data/users.json'
import { UserContext } from '../context'
import { useNavigate } from 'react-router-dom'

import style from './LoginPage.module.css'

export default function LoginPage() {

    const { login } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
      setErrorMessage('')
      const result = await login(username, password)
      if (result === true) {
        navigate('/')
      } else {
        setErrorMessage(result)
      }
    }


  
  
  
  
    return (
        <form
            className={style.container}
            onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
        }}
        >
        
        {errorMessage && <Message variant="error" message={errorMessage} />}

        <Input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setErrorMessage("")
          }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorMessage("")
          }}
        />
        <Button type="submit" disabled={!username || !password}>
          Login
        </Button>
      </form>
  )
}
