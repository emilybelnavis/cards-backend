import { Schema, model } from "mongoose";

const schema = new Schema({
    cards: [Number],
    player: String
});

