import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CARDS } from "../../utils/queries";
import { ADD_DECK } from "../../utils/mutations";
const DeckForm = () => {
    const {data, loading} = useQuery(GET_ALL_CARDS)
    const Cards = data?.getAllCards || []
    const [cardList, setCardList] = useState([])
    const [addDeck] = useMutation(ADD_DECK)
    const [isAllChecked, setIsAllChecked] = useState(false)
    const handleChange = (e) => {
        var cardName = e.target.id
        const cardNameArray = cardList
        console.log(cardNameArray)
        console.log(e.target.checked)
        if(e.target.checked === true) {
            setCardList([...cardNameArray, e.target.id])
        } else if(e.target.checked === false) {
            const index =cardNameArray.indexOf(cardName)
            cardNameArray.splice(index, 1)
            setCardList(cardNameArray) 
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        const deckName = e.target[0].value
        const creator = e.target[1].value
        console.log(deckName, creator)
        console.log(cardList)
        addDeck({variables: {deckName, cardNames: cardList, creator}})
        window.location.reload()
    }
    const toggleAllClicked = () => {
        setIsAllChecked(!isAllChecked)
        const cardArray = []
        for(var i = 0; i < Cards.length; i++) {
            cardArray.push(Cards[i].cardName)
        }
        setCardList(cardArray)
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <form onSubmit={handleSubmit}>
                <textarea id="deckName" placeholder="Deck Name"></textarea> <br/>
                <textarea placeholder="Creator"></textarea><br/>
                    Select All <input type="checkbox" onClick={toggleAllClicked}></input>
                    <h2>Which Cards would you like to add to the Deck?</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {Cards && Cards.map((Card) => (
                       <div key={Card._id} style={{background: Card.cardColor, width: '250px', height: '300px', margin: "2px", color: 'white', WebkitTextStrokeColor: 'Black', WebkitTextStrokeWidth: '.25px', border: '3px solid black'}}>
                       <h1>{Card.cardName}</h1>
                           <h2>
                           {Card.cardText}
                           </h2>
                           <label>
                                Add to Deck
                                <input checked={isAllChecked} id={Card.cardName} onChange={handleChange}  type={'checkbox'}>
                            </input>
                           </label>
                       </div>
                    ))}
                    </div>
                    <button type="submit">Create Deck</button>
            </form>
        </div>
    )
}

export default DeckForm