import mongoose from "mongoose";
import { Deck } from "@src/models/deck";


const schema = new mongoose.Schema({
    type: { type: String, required: true },
    text: { type: String, required: true },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true,
    },
});

export const Card = mongoose.model('Card', schema);

export async function getCardsFromDeck(deck: string) {;
    try {
        const deckName = await Deck.findOne({ name: deck });
        return await Card.find({ deck: deckName }).select({ type: 1, text: 1 });
    } catch (err) {
        // log error here

    }
}

