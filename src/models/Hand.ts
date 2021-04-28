import { Schema, model } from "mongoose";
import uuid from "uuid";

export const handSchema = new Schema({
    cards: [Number],
    player: String
});

export const Hand = model("Hand", handSchema);