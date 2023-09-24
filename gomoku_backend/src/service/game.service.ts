import mongoose, { DocumentDefinition, FilterQuery, Types } from "mongoose";
import gamesModel, { GamesDocument } from "../model/game.model";

export async function getGamesByUserId(userID: string) {
    //return await gamesModel.find({ userId: userId} ).lean()
   
    return await gamesModel.find({ userId: userID }).lean();
}

export async function getAllGames() {
    return await gamesModel.find().lean();
  }
export async function getOne(query: FilterQuery<GamesDocument>){
    return await gamesModel.findOne(query)
}

export async function updateGames(
  gameId: number,
  userId: Types.ObjectId,
  input: DocumentDefinition<GamesDocument>
) {
  return gamesModel.findOneAndUpdate(
    {
      gameId,
      userId: new mongoose.Types.ObjectId(userId)
    },
    input,
    { new: true } // new option to true to return the document after update was applied.
  )
}

export async function createGames(
  input: DocumentDefinition<GamesDocument>
  
) 
{
  return gamesModel.create(input)
}

export async function deleteGameByGameAndUserId(query: FilterQuery<GamesDocument>) {
  return gamesModel.findOneAndDelete(query)
}
