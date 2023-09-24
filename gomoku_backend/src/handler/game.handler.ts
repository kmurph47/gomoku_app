import express, { Request, Response } from 'express'; 
import mongoose from 'mongoose';
import validateSchema from '../middleware/validateSchema';
import { createGames, getGamesByUserId, updateGames, getOne, deleteGameByGameAndUserId, getAllGames } from '../service/game.service';
import { createGamesSchema, updateGamesSchema, getGamesByIdSchema, deleteGamesSchema } from '../schema/game.schema';

import { deserializeUser } from "../middleware/deserializeUser";
const gamesHandler = express.Router();
gamesHandler.use(deserializeUser);

let gameId: number;

gamesHandler.get("/all", async (req: Request, res: Response) => {
    try {
      const result = await getAllGames();
      return res.status(200).send(result.map(m => ({
        _id: m._id,
        userID: m.userId,
        gameId: m.gameId,
        

        
      })));
    } catch (err) {
      return res.status(500).send(err);
    }
  })

gamesHandler.get("/:userId", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    //const userId = req.params.userId
    //const userId = "900b912ac358afc73d9c93de";
    const userId = req.userId;
    console.log("\nget");
    try{
        const userGames = await getGamesByUserId(userId);
        console.log(userGames);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});

/*gamesHandler.get("/:userId", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    const userId = req.params.userId
    //const userId = "900b912ac358afc73d9c93de";
    console.log("\nget");
    try{
        const userGames = await getGamesByUserId(userId);
        console.log(userGames);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});

*/

/*gamesHandler.get("/spec", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    const userId = "900b912ac358afc73d9c93de";
    //console.log("\nget");
    //const userId = req.userId
    try{
        const userGames = await getGamesByUserId(userId);
        return res.status(200).send(userGames);
    }catch (err) {
        return res.status(500).send(err);
    }
});*/

gamesHandler.get("/:userId/:gameId", validateSchema(getGamesByIdSchema), async (req: Request, res: Response) => {
    const g_Id = req.params.gameId
    //const userID = req.params.userId
    const userID = req.userId;
    try{
        const oneGame = await getOne({ gameId: g_Id, userId: new mongoose.Types.ObjectId(userID)} );
        return res.status(200).send(oneGame);
    }catch (err) {
        return res.status(500).send(err);
    }
});


gamesHandler.post("/:userId", validateSchema(createGamesSchema), async (req: Request, res: Response) => {
     const game = req.body
     currentPlayer = game.result
     const userId = new mongoose.Types.ObjectId(req.userId)
     const newGame = await createGames({ ...game, userId})
     return res.status(200).json({"message":`${currentPlayer}`})
 })


  gamesHandler.delete("/:userId/:gameId", validateSchema(deleteGamesSchema), async (req: Request, res: Response) => {
     const gameId = req.params.gameId 
     const userId = new mongoose.Types.ObjectId(req.userId)
     console.log(gameId);
     //const userId = req.params.userId
     //const userId = req.userId;
     const deleteGameUpdate = await deleteGameByGameAndUserId({gameId: gameId, userId: userId})
     return res.status(200).send(deleteGameUpdate)
 })

 gamesHandler.put("/:userId", validateSchema(updateGamesSchema), async (req: Request, res: Response) => {
     const gameUpdate = req.body
     const userId = new mongoose.Types.ObjectId(req.userId)
     gameId = gameUpdate.gameId
     currentPlayer = gameUpdate.result
     let whiteState = gameUpdate.whiteMoves
     let blackState = gameUpdate.blackMoves

     console.log("White state on submit: "+whiteState)

     await updateGames(gameId, userId, { ...gameUpdate})
     return res.status(200).json({"message":`${currentPlayer}`})
 })



let currentPlayer: string


export default gamesHandler;