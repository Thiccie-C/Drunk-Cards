const { Schema, model, Types } = require('mongoose');

const cardSchema = new Schema ({
    cardName: {
        type: String
    },
    cardText: {
        type: String
    },
    cardColor: {
        type: String
    }
})

const Card = model("Card", cardSchema)
module.exports = Card