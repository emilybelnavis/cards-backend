import { Schema, model } from "mongoose";
import uuid from "uuid";
import { handSchema } from "@src/models/Hand";

export const roundSchema = new Schema({
    id: Number,
    state: String,
    prompt: Number,
    winner: String,
    hands: [handSchema]
});

export const Round = model("Round", roundSchema);

