const { Schema, model, Types } = require('mongoose');

const deckSchema = new Schema({
    deckName: {
        type: String,
        unique: true
    },
    cardList: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    creator: {
        type: String
    }
})

const Deck = model("Deck", deckSchema)
module.exports = Deck