const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Card {
        _id: ID
        cardName: String
        cardText:String
        cardColor: String
    }
    type Deck {
        _id: ID
        deckName: String
        cardList: [Card]
        creator: String
    }
    type Query {
        getAllCards: [Card]
        getAllDecks: [Deck]
    }
    type Mutation {
        addCard(cardText: String!, cardName: String!, cardColor: String!): Card
        addDeck(deckName: String!, cardNames: [String], creator: String): Deck
        editCard(oldCardName: String, cardText: String!, cardName: String!, cardColor: String!): Card
        editDeck(oldDeckName: String, deckName: String, cardNames: [String!]): Deck
        removeCard(cardName: String): String
        removeDeck(deckName: String!): String
        removeAllCards: String
        removeAllDecks: String
    }
`
module.exports = typeDefs