import { useContext, useCallback, useState,useEffect, useReducer } from 'react'
import { Navigate, useNavigate, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../context'
import { Tile, Button } from '../components'
import { TILE_STATUS, PLAYERACTIONTYPE } from '../constants'


import { get, post, put, del } from '../utils/http'
import { Game } from '../types/Game'


import style from './MainGame.module.css'
import { type } from 'os'



type SelectAction = {

    type: PLAYERACTIONTYPE
    payload: number

}

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




export default function MainGame() {


  const { user, logout } = useContext(UserContext)
  const [ filteredGames, setFilteredGames ] = useState<Game[]>()

  const [ boardS, setBoardSize ] = useState<any>(0)
  let [ whiteMoves, setWhiteMoves ] = useState<any[]>([])
  let [ blackMoves, setBlackMoves ] = useState<any[]>([])
  //const [ gameId, setGameId ] = useState<number>()
  //const [ res, setResponse ] = useState<string>("Current Player: Black")


  const navigate = useNavigate()

  const { paramID } = useParams()

  console.log("ID:"+Number(paramID))





  const fetchGames = useCallback(async () => {
    try{
      const getOne = await get<Game>(`/api/games/${user?._id}/${paramID}`)
      //setResult(getOne?.result)
      console.log("Boardsize: "+getOne?.boardsize)
      setBoardSize(getOne?.boardsize)
      //setWhiteMoves(getOne?.whiteMoves)
      //setBlackMoves(getOne?.blackMoves)
      //setStatus(getOne?.status)
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



    let bs = parseInt(boardS)

  


    
    
    let [bSelectedTiles, bDispatch] = useReducer(bActionReducer, [])
    const [wSelectedTiles, wDispatch] = useReducer(wActionReducer, [])



    const moveNumber = bSelectedTiles.length + wSelectedTiles.length

    let res = "Black Turn"
    let fRes = ""
    let gameOver: boolean = false;

    

    if(checkIfWinner(bSelectedTiles,bs)) {
        fRes = 'White was the winner'
        res = 'Black was the winner'
        gameOver = true
    }
    else if(checkIfWinner(wSelectedTiles,bs)) {
        fRes = 'Black was the winner'
        res = 'White was the winner'
        gameOver = true
    } else if(moveNumber === bs*bs){
      res = 'Result'
        res = 'Draw'
        gameOver = true

    }
    else {

        if (moveNumber % 2 === 0 ) res = 'Black Turn'
        else res = 'White Turn'
        

    }

    
    

    const resetBoard = () => {

        window.location.reload();

      }



      const deleteGameFromDB = async () => {
        if (user){ 
          await del (`/api/games/${user?._id}/${paramID}`)
        }
      }

    const putGameToDB = async () => {
        let winner:string = ""
        if (res!== undefined){
          winner = res
        if (user){ 

        
              const resp = await put (`/api/games/${user?._id}`, {
      

              gameId: Number(paramID),
              boardsize: boardS,
              result: winner,
              whiteMoves: wSelectedTiles,
              blackMoves: bSelectedTiles,
              
              date: new Date().toLocaleDateString()

            })
            return resp
        }
      }
      }




    const handleConfirmClick = async () => {

     

        if(gameOver){


          putGameToDB()
          


        

        navigate(`/gamelog`)


        } else {

          deleteGameFromDB()
          
          navigate(`/home`)}
        
    
        

    }


   

    

    
  return (
    

    <div className={style.gameSpace}>
        
        <div className={style.title}> 

        <div className={style.score}> {res} </div>
        
         </div>

         <div className={style.row}> 
        <div className={style.tile} style={{ gridTemplateColumns: `repeat(${bs}, 2rem)`}}>
        {[...Array(bs * bs)].map((_, index) => (
            <Tile key={`tile-${index}`} id={index} onSelectBlack={() => bDispatch({ type: PLAYERACTIONTYPE.SELECT_BLACK, payload: index})
            
            } onSelectWhite={() => wDispatch({ type: PLAYERACTIONTYPE.SELECT_WHITE, payload: index})} moveNumber={bSelectedTiles.length + wSelectedTiles.length} gameOver={ gameOver} />))}
            
            
            </div>
             </div>

            <div className={style.buttonContainer}> 
      <Button type='submit' onClick = {()=> {resetBoard()}}>Reset</Button>
      <Button type='submit' onClick={handleConfirmClick}>
        Leave
      </Button>
      </div>
            

</div>

  )
}

// Various check for winner functions.
function checkIfWinner(board: Array<number>, bs: number) {

    // SET NUMBER OF ROWS AND COLUMNS HERE.
let rows: number = bs;
let cols: number = bs;

    // Horizontal 
    for (let j = 0; j < cols*(rows-1); j=j+cols) {

      for (let i = 0; i < cols-4; i++) {
        if (
            board.includes(j+i) &&
            board.includes(j+i+1) &&
            board.includes(j+i+2) &&
            board.includes(j+i+3) &&
            board.includes(j+i+4)
        ) {
          return true
        }
      }
    }



    // Vertical 
    for (let j = 0; j < cols; j++) {

      for (let i = 0; i < rows*(cols-4); i=i+cols) {

        if (
            board.includes(j+i) &&
            board.includes(j+i+cols) &&
            board.includes(j+i+2*cols) &&
            board.includes(j+i+3*cols) &&
            board.includes(j+i+4*cols)
        ) {
          return true
        }
      }
    }

    // Diagonal down 
    for (let j = 0; j < cols-4; j++) {

        for (let i = 0; i < rows*(cols-4); i=i+cols) {

  
          if (
              board.includes(j+i) &&
              board.includes(j+1+(i+cols)) &&
              board.includes(j+2+(i+cols*2)) &&
              board.includes(j+3+(i+cols*3)) &&
              board.includes(j+4+(i+cols*4))
          ) {
            return true
          }
        }
      }  

          // Diagonal up 
    for (let j = 0; j < cols-4; j++) {

        

        for (let i = 4*cols; i < rows*(cols); i=i+cols) {


  
          if (
              board.includes(j+i) &&
              board.includes(j+1+(i-cols)) &&
              board.includes(j+2+(i-cols*2)) &&
              board.includes(j+3+(i-cols*3)) &&
              board.includes(j+4+(i-cols*4))
          ) {
            return true
          }
        }
      }  
  
    return false
  }


  