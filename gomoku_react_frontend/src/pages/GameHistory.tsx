import { useParams } from "react-router-dom"
import { useLocalStorage } from '../hooks'
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


  let [bs] = [8,6]

  const navigate = useNavigate()

  
  const { user, logout } = useContext(UserContext)
  const [ filteredGames, setFilteredGames ] = useState<Game[]>()
  const [ boardS, setBoardSize ] = useState<any>(0)
  const [ whiteMoves, setWhiteMoves ] = useState<any[]>([])
  const [ blackMoves, setBlackMoves ] = useState<any[]>([])
  const [ status, setStatus ] = useState<String | null> ()

  
  //const [ gameId, setGameId ] = useState<number>()

  const { gameID } = useParams()

    //const gameID = 1

    console.log(gameID)


    const fetchGames = useCallback(async () => {
      try{
        const getOne = await get<Game>(`/api/games/${user?._id}/${gameID}`)
        //setResult(getOne?.result)
        console.log("Boardsize: "+getOne?.boardsize)
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
    
    //const [blackMoveGames] = useLocalStorage<Record<string, number[]>>('blackMoves', {})
    //const [whiteMoveGames] = useLocalStorage<Record<string, number[]>>('whiteMoves', {})
   // const [games] = useLocalStorage<Record<string, string>>('result', {})
    //const [bs] = useLocalStorage<Record<string, number>>('boardSize', {})

    const blackMoveGames = whiteMoves
    const whiteMoveGames = blackMoves
    const games = status

    




    
    

    const [bSelectedTiles, bDispatch] = useReducer(bActionReducer, [])
    const [wSelectedTiles, wDispatch] = useReducer(wActionReducer, [])


    //if(!gameID) return null

    //let boardSize = bs[gameID]
    let boardSize = boardS
    console.log(boardSize)

    //console.log(blackMoveGames["Game:2"])

    console.log("Black Moves",blackMoveGames)
    console.log("White Moves",whiteMoveGames)


    //console.log(gameID)


    function bActionReducer(state: number[], action: SelectAction) {
        const { type, payload } = action
        switch (type) {
          case PLAYERACTIONTYPE.SELECT_BLACK:
            return [...state, payload]
          default:
            return state
        }
      }
    
      function wActionReducer(state: number[], action: SelectAction) {
        const { type, payload } = action
        switch (type) {
          case PLAYERACTIONTYPE.SELECT_WHITE:
            return [...state, payload]
          default:
            return state
        }
      }
    


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