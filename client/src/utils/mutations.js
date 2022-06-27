import { gql } from "@apollo/client"

export const ADD_CARD = gql`
mutation AddCard($cardText: String!, $cardName: String!, $cardColor: String!) {
    addCard(cardText: $cardText, cardName: $cardName, cardColor: $cardColor) {
      _id
      cardName
      cardText
      cardColor
    }
  }
`
export const ADD_DECK = gql`
mutation addDeck($deckName: String!, $cardNames: [String!], $creator: String!) {
    addDeck(deckName: $deckName, cardNames: $cardNames, creator: $creator) {
      _id
      deckName
      cardList {
        cardName
      } 
      creator
    }
}`

export const REMOVE_CARD = gql`
mutation RemoveCard($cardName: String!) {
    removeCard(cardName: $cardName)
  }`
export const REMOVE_DECK = gql`
mutation RemoveDeck($deckName: String!) {
    removeDeck(deckName: $deckName)
  }
`

export const EDIT_CARD =gql`
mutation EditCard($cardText: String!, $cardName: String!, $cardColor: String!, $oldCardName: String) {
  editCard(cardText: $cardText, cardName: $cardName, cardColor: $cardColor, oldCardName: $oldCardName) {
    _id
    cardName
    cardText
    cardColor
  }
}`