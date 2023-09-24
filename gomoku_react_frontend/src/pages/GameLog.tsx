import { useContext, useCallback, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../context'

import style from './GameLog.module.css'


import { Game } from '../types/Game'
import { get } from '../utils/http'


export default function GameLog() {

    const { user, logout } = useContext(UserContext)
    const [ filteredGames, setFilteredGames ] = useState<Game[]>([])


  
    const navigate = useNavigate()



  const fetchGames = useCallback(async () => {
    try{
      const userGames = await get<Game[]>(`/api/games/${user?._id}`)
      setFilteredGames(userGames)
    }catch (error){
      console.log((error as Error).message)
      logout()
      navigate('/')
    }
  }, [logout, navigate, user?._id])

  useEffect(() => {
    if (!user) return
    fetchGames()
  }, [fetchGames, user])

  



    


  return (
    <div className={style.container}>
      <h1 className={style.header}>You have {filteredGames.length} previosly saved games</h1>

      <div>


        

      </div>

            
            {filteredGames.map(({ _id, gameId, result, date, whiteMoves }) => {

                    return(
                        <div className={style.list} key={gameId}>
                        <p className={style.title}>
                          {gameId} Winner:{result}
                        </p>
                        
                        <button
                          className={style.button}
                          onClick={() => navigate(`/gamehistory/${gameId}`)}
                        >
                          View
                        </button>
                      </div>
                    )
                }
                
                
                )}
    

      </div>
  )
}
