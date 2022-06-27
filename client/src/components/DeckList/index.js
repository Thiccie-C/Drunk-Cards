import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_DECKS } from "../../utils/queries";
const DeckList = () => {
    const {data, loading} = useQuery(GET_ALL_DECKS)
    const Decks = data?.getAllDecks || []
    console.log(Decks)
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {Decks && Decks.map((Deck) => (
                <div key={Deck._id} style={{display: "flex", flexWrap: 'wrap'}}>
                    <h1>
                    {Deck.deckName}
                    </h1>
                    {Deck.cardList && Deck.cardList.map((Card) => (
                       <div key={Card._id} style={{background: Card.cardColor, width: '250px', height: '300px', margin: "2.5px", color: 'white', WebkitTextStrokeColor: 'Black', WebkitTextStrokeWidth: '1px', border: '3px solid black'}}>
                       <h1>{Card.cardName}</h1>
                           <h2>
                           {Card.cardText}
                           </h2>

                       </div>
                    ))}
                    <button>Edit Deck</button>
                </div>
            ))}
        </div>
    )
}
export default DeckList