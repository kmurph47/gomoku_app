import style from "./Tile.module.css"
import { useState, memo, useEffect, useReducer } from 'react'
import { TILE_STATUS } from '../constants'
import { useLocalStorage } from '../hooks'

import { type } from "os"

type TileProps = {
    id: number
    isBlack?: Boolean
    isWhite?: Boolean
    

}

export default function Tile(props: TileProps) {
    const { id, isBlack = false, isWhite = false } = props 
    const [status, setStatus] = useState( isBlack ? TILE_STATUS.BLACK : isWhite ? TILE_STATUS.WHITE: TILE_STATUS.AVAILABLE)
    const [blackMoveGames] = useLocalStorage<Record<string, number[]>>('blackMoves', {})
    const [whiteMoveGames] = useLocalStorage<Record<string, number[]>>('whiteMoves', {})

    let a = ''

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
  
    return (

        <div className={getClassName()}>
            {a}
        </div>
  )
}
