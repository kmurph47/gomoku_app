import mongoose, { Document } from "mongoose";
import { UserDocument } from './user.model'; 

export interface GamesDocument extends Document {
    id: GamesDocument["_id"];
    userId: UserDocument["_id"];
    gameId: number;
    boardsize: number;
    result: string;
    whiteMoves: Array<number>;
    blackMoves: Array<number>;
    date: Date;
    createdAt: Date;
    updatedAt: string;
}

const gamesSchema = new mongoose.Schema ({
    //Watch here.
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gameId: Number,
    boardsize: Number,
    result: String,
    whiteMoves: Array<number>,
    blackMoves: Array<number>,
    date: String
}, { timestamps: true })


export default mongoose.model<GamesDocument>('Games', gamesSchema);