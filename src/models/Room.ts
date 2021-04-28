import { Schema, model } from "mongoose";
import uuid from "uuid";
import log from "@utils/Log";
import { gameSchema } from "@src/models/Game";

const roomSchema = new Schema({
    id: String,
    state: String,
    games: [gameSchema]
});

export const Room = model("Room", roomSchema);

// -- Rooms --
export async function createRoom() {
    let roomId = uuid.v4().split('-')[0];
    const room = new Room({
        id: roomId,
        state: "lobby"
    })
    await room.save((err, doc) => {
        if (err) {
            return err;
        }

    })
};

// -- Games --
export async function startGame(roomId: String) {

}