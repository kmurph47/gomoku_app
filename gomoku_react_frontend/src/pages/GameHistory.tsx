import { useParams } from "react-router-dom"

import { HistoryTile, Button } from '../components'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { TILE_STATUS, PLAYERACTIONTYPE } from '../constants'

import { useContext, useCallback, useState,useEffect, useReducer } from 'react'

import { UserContext } from '../context'

import { get, post, put, del } from '../utils/http'
import { Game } from '../types/Game'

import style from './GameHistory.module.css'
import { type } from 'os'


type SelectAction = {

    type: PLAYERACTIONTYPE
    payload: number

}

export default function GameHistory() {



  const navigate = useNavigate()

  
  const { user, logout } = useContext(UserContext)
  const [ boardS, setBoardSize ] = useState<any>(0)
  const [ whiteMoves, setWhiteMoves ] = useState<any[]>([])
  const [ blackMoves, setBlackMoves ] = useState<any[]>([])
  const [ status, setStatus ] = useState<String | null> ()

  
  //const [ gameId, setGameId ] = useState<number>()

  const { gameID } = useParams()

    //const gameID = 1



    const fetchGames = useCallback(async () => {
      try{
        const getOne = await get<Game>(`/api/games/${user?._id}/${gameID}`)
        //setResult(getOne?.result)
        setBoardSize(getOne?.boardsize)
        setWhiteMoves(getOne?.whiteMoves)
        setBlackMoves(getOne?.blackMoves)
        setStatus(getOne?.result)
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
    
  
    const blackMoveGames = blackMoves
    const whiteMoveGames = whiteMoves
    const games = status





    //if(!gameID) return null

    //let boardSize = bs[gameID]
    let boardSize = boardS

    //console.log(blackMoveGames["Game:2"])

  


    //console.log(gameID)

    


  return (
    <div className={style.container}>
      
      <div className={style.container}>
        <div className={style.title}>
              Winner: {games}
      
      </div>
      <div>

      <div className={style.row}> 
      <div className={style.container_game} style={{ gridTemplateColumns: `repeat(${boardSize}, 2rem)`}}>
      {[...Array(boardSize * boardSize)].map((_, index) => (
      <HistoryTile key={`tile-${index}`} id={index} isBlack={blackMoveGames.includes(index)} isWhite={whiteMoveGames.includes(index)}/>

        ))}
      </div>
      </div>
      <div className={style.button}>
        <p>    <Button type="submit" onClick={ () => navigate(`/gamelog`) }>Back</Button></p>
     
      </div>
      </div>
      </div>
   
      </div>
    
  )
}