import { Schema, model } from "mongoose";
import uuid from "uuid";
import { roundSchema } from "@src/models/Round";

export const gameSchema = new Schema({
    id: String,
    state: String,
    packs: [Number],
    rounds: [roundSchema]
});

export const Game = model("Game", gameSchema);