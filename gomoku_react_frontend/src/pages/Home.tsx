import { useState, useCallback, useEffect, useRef } from "react"
import { Input, Button } from '../components'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context'
import style from './Home.module.css'

import { Game } from '../types/Game'
import { get, post } from '../utils/http'

import { API_HOST } from '../constants'

export default function Home() {

  
    //const { user } = useContext(UserContext)
    const [boardSize, setBoardSize] = useState('')
    //const navigate = useNavigate()
    const boardSizeInput = useRef<HTMLInputElement | null>(null)



    const { user, logout } = useContext(UserContext)
    const [ filteredGames, setFilteredGames ] = useState<Game[]>([])


    const navigate = useNavigate()


    const postGameToDB  = async (inputBS: number | undefined) => {
      let winner:string = ""
      winner = "Current Player: White"
      if (user){
        const res = await post (`${ API_HOST }/api/games/${user?._id}`, {
          //userId: user._id,
          gameId: filteredGames.length+1,
          boardsize: inputBS,
          result: winner,
          whiteMoves: [],
          blackMoves: [],
          date: new Date().toLocaleDateString()
        })
        return res
      }
    }



    const fetchGames = useCallback(async () => {
    try{
      const userGames = await get<Game[]>(`${ API_HOST }/api/games/${user?._id}`)
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




    

    function handleOnClick() {
        let bs: unknown = boardSize
        if (!user) {
            navigate(`/loginpage`);
    }
        else if ((bs as number) > 4 && (bs as number) <= 20){

          let inbs: number = (bs as number);

          var y: number = +inbs;
          


          //window.alert(filteredGames.length)

          const response = postGameToDB(y)

          

          


          navigate(`/maingame/${filteredGames.length+1}`);

            
    }
        else if ((bs as string) !== null){
            window.alert("Please enter a value between 5-20")
  }
}


  return (
    
    <div className={style.container}>
     <Input ref = {boardSizeInput} name="board-size" placeholder="  Board Size" value={boardSize} onChange={(b) => {
        setBoardSize(b.target.value)}}/>
        <Button type="submit" disabled={!boardSize} onClick={ handleOnClick }>Start</Button>
        </div>
  )
}