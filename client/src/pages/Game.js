import React, { useState } from "react";
import Nav from '../components/Nav'
import { GET_ALL_DECKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
const Game = () => {
    const {data, loading} = useQuery(GET_ALL_DECKS)
    const Decks = data?.getAllDecks || []
    const [gameStarted, setGameStarted] = useState(false)
    const [gameDeck, setGameDeck] = useState([])
    const [currentCard, setCurrentCard] = useState({})
    const [notOutOfCards, setNotOutOfCards] = useState(true)
    const [drawnCard, setDrawnCard] = useState([])
    const handleGameStart = () => {
        if(gameStarted === false) {
            setGameStarted(true)
        } else if(gameStarted === true) {
            setGameStarted(false)
        }
    }
    const handleChange = (e) => {
        for(var i =0; i < Decks.length; i++) {
            if(Decks[i].deckName === e.target.value){
                setGameDeck(Decks[i].cardList)
            }
        }
    }
    const handleCardDraw = () => {
        var cardList = gameDeck
        console.log(cardList)
        if(cardList.length === 0) {
            setNotOutOfCards(false)
        }
        else {

        var currentCardIndex = Math.floor(Math.random() * cardList.length)
        setCurrentCard(cardList[currentCardIndex])
        console.log(currentCardIndex)
        const filteredList = cardList.filter(Card => {
            return Card._id !== cardList[currentCardIndex]._id
        })
        setGameDeck(filteredList)
        setDrawnCard([...drawnCard, cardList[currentCardIndex]])
    }
    }
    console.log(drawnCard)
    const handleReshuffle = () => {
        setCurrentCard({})
        setGameDeck(drawnCard)
        setNotOutOfCards(true)
        setDrawnCard([])
    }
    if(gameStarted === false) {
    return (
        <div>
            <Nav></Nav>
                <select onChange={handleChange}>
                <option>Which Deck Would you Like to use?</option>
                {Decks && Decks.map((Deck) => (
                    <option key={Deck._id}>{Deck.deckName}</option>
                ))}
            </select>
            <button onClick={handleGameStart}>Start Game</button>
        </div>
    ) 
}
else if(gameStarted === true) {
return(
    <div>
        <Nav></Nav>
        Game Started
        <button onClick={handleCardDraw}>Draw A Card</button>
        {notOutOfCards
            ? 
            <>
            <div style={{background: currentCard.cardColor, width: '250px', height: '300px', margin: "10px", color: 'white', WebkitTextStrokeColor: 'Black', WebkitTextStrokeWidth: '1px', border: '3px solid black'}}>
                <h1>{currentCard.cardName}</h1>
                <h2>{currentCard.cardText}</h2>
            </div>
            <button onClick={handleGameStart}>End Game</button>
            </>
    : <>Game Over <button onClick={handleReshuffle}>Reshuffle</button></>
        }
    </div>
)
}
}
export default Game