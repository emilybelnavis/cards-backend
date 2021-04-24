import { Schema, model } from "mongoose";

const schema = new Schema({
    roomCode: { type: String, required: true },
    active: { type: Boolean, default: true }
});

export const Room = model("Room", schema);

export async function createRoom({name, })