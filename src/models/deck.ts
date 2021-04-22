import mongoose from 'mongoose';
import Log from "@src/utils/Log";

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }
});

export const Deck = mongoose.model("Deck", schema);

// @ts-ignore: cannot set type here
export async function createDeck({name, isPublic}) {
    const deck = new Deck({name, isPublic})
    try {
        return await deck.save();
    } catch (err) {
        Log.error("Could not save deck", err)
    }
}

export async function getPublicDecks(opts = {}) {
    try {
        return await Deck.find({ isPublic: true, ...opts });
    } catch (err) {
        Log.error("Couldn't find the public deck", err)
    }
}

export async function getDeck(deckName: string) {
    try {
        return await Deck.findOne({ name: deckName });
    } catch (err) {
        Log.error("Couldn't find this deck", err)
    }
}
