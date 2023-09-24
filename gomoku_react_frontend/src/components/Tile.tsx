
import style from "./Tile.module.css"
import { useState, memo, useEffect, useReducer } from 'react'
import { TILE_STATUS } from '../constants'

type TileProps = {
    id: number
    onSelectBlack: () => void
    onSelectWhite: () => void
    moveNumber: number
    gameOver: Boolean
    

}

export default function Tile(props: TileProps) {
    const { id, onSelectBlack, onSelectWhite, moveNumber, gameOver  } = props 
    const [status, setStatus] = useState(TILE_STATUS.AVAILABLE)

    //console.log(moveNumber)

           
    

    const getClassName = () => {
        
        const className = style.tile
        if (status !== null && status !== undefined){
            
        switch(status) {
            case TILE_STATUS.AVAILABLE:
                return `${className} ${style.available}`
            case TILE_STATUS.BLACK:
                return `${className} ${style.black}`
            case TILE_STATUS.WHITE:
                return `${className} ${style.white}`
            default:
                return className
        }
        }
    }


    const HandleClick = () => {
        if (status === TILE_STATUS.AVAILABLE && gameOver  !== true){

            if (moveNumber % 2 === 0){
                setStatus(TILE_STATUS.BLACK)
                onSelectBlack()


            } else if (moveNumber % 2 !== 0) {

                setStatus(TILE_STATUS.WHITE)
                onSelectWhite()


            }
           //console.log("selected T=tile:", id)
           //console.log("Default Status:",status[id])
           
        } 
     }






  
    return (

        <div className={getClassName()} onClick={HandleClick}/>
  )
}
