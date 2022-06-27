const {Card, Deck} = require('../models')

const resolvers = {
    Query: {
        getAllCards: async () => {
            return await Card.find()
        },
        getAllDecks: async () => {
            const Decks = await Deck.find().populate('cardList')
            console.log(Decks)
            return Decks
        }
    },
    Mutation: {
        addCard: async (parent, args) => {
            console.log(args)
            const card = await Card.create(args)
            console.log(card)
            return card
        },
        addDeck: async (parent, args) => {
            const CardArray = []
            for(var i = 0; i <  args.cardNames.length; i++) {
                console.log(args.cardNames[i])
                const card = await Card.findOne({cardName: args.cardNames[i]})
                console.log(card)
                CardArray.push(card)
            }
            console.log(CardArray)
            const deck = await Deck.create(args)
            console.log(deck.deckName)
            const addedCards = await Deck.findOneAndUpdate({deckName: deck.deckName},{$addToSet: {cardList: CardArray}}, {new: true}).populate('cardList')
            console.log(addedCards)
            return addedCards
        },
        editCard: async (parent, args) => {
            const updatedCard = await Card.findOneAndUpdate({cardName: args.oldCardName}, {cardName: args.cardName, cardText: args.cardText, cardColor: args.cardColor}, {new: true})
            console.log(updatedCard)
            return updatedCard
        },
        editDeck: async (parent, args) => {
            console.log(args)
            const CardArray = []
            for(var i = 0; i <  args.cardNames.length; i++) {
                console.log(args.cardNames[i])
                const card = await Card.findOne({cardName: args.cardNames[i]})
                console.log(card)
                CardArray.push(card)
            }
            const updatedDeck = await Deck.findOneAndUpdate({deckName: args.oldDeckName}, {deckName: args.deckName, cardList: CardArray}, {new: true}).populate('cardList')
            console.log(updatedDeck)
            return updatedDeck
        },
        removeCard: async (parent, {cardName}) => {
            await Card.deleteOne({cardName: cardName})
            return cardName + " has been deleted"
        },
        removeDeck: async (parent, {deckName}) => {
            await Deck.deleteOne({deckName: deckName})
            return deckName + ' has been deleted'
        },
        removeAllCards: async () => {
            await Card.deleteMany()
            return "All Cards Deleted"
        },
        removeAllDecks: async () => {
            await Deck.deleteMany()
            return "All Decks Deleted"
        }
    }
}
module.exports = resolvers