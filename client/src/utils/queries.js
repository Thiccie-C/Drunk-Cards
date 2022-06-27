import { gql } from "@apollo/client"

export const GET_ALL_CARDS = gql`
query GetAllCards {
    getAllCards {
      _id
      cardName
      cardText
      cardColor
    }
  }
`
export const GET_ALL_DECKS = gql`
query GetAllDecks {
    getAllDecks {
      _id
      deckName
      cardList {
        _id
       cardName
       cardText
       cardColor 
      }
      creator
    }
  }
`