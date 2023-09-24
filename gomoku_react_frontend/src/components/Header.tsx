import style from "./Header.module.css"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context'


export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useContext(UserContext)

    const getActions = () => {
        if (user) {
          return (
            <>
              <button className={style.action} onClick={() => navigate('/gamelog')}>
                Game History
              </button>
              <button
                className={style.action} onClick={() => {
                    logout()
                    navigate('/')
                }}
              >
                Logout
              </button>
            </>
          )
        } else {
            return location.pathname !== '/loginpage' ? (
                <>
                    <button className={style.action} onClick={() => navigate('loginpage')}>
              Login
            </button>
            </>
            ) : (  

                <>

                  <button className={style.action} onClick={() => navigate('signup')}>
                  Sign Up
            </button>
                
                
                
                </>


            )
        }
      }
    
    return (
  
      <header className={style.header}>
      <div className={style.container}>
      <Link to="/">Gomoku</Link>
      <div className={style.actions}>{getActions()}</div>
      

      </div>
      
    </header>
    
    )
  }