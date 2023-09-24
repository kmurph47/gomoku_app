    export type Game = {
        _id: string
        userId: string
        gameId: number
        boardsize: number
        result: string
        whiteMoves: number[]
        blackMoves: number[]
        date: string
        createdAt: Date
        updatedAt: string;
    }