import { Schema, model } from "mongoose";
import uuid from "uuid";
import log from "@utils/Log";

// const gameSchema = new Schema({
//     id: String,
//     state: String,
//     rounds: [
//         {
//             id: String,
//             state: String,
//             prompt: Number,
//             winner: String,
//             hands: [
//                 {
//                     cards: [String],
//                     player: String
//                 }
//             ]
//         }
//     ]
// });

const handsSchema = new Schema({
    cards: [String],
    player: String
})

const roundSchema = new Schema({
    id: String,
    state: String,
    prompt: Number,
    winner: String,
    hands: [handsSchema]
});

const gameSchema = new Schema({
    id: String,
    state: String,
    rounds: [roundSchema]
})

export const Game = model("Game", gameSchema);
export const Round = model("Round", roundSchema);

export async function newGame(gameId: String) {
    const game = new Game({
        id: gameId,
        state: "in progress"
    });

    try {
        return await game.save();
    }
}

export async function addHand() {}