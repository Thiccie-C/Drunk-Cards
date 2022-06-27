import React from "react";
import Nav from "../components/Nav";
import DeckList from '../components/DeckList'
import DeckForm from "../components/DeckForm";
const Decks = () => {
    return (
        <>
        <Nav></Nav>
        <DeckList></DeckList>
        <DeckForm></DeckForm>
        <div>
        Deck Page
        </div>
        </>
    )
}
export default Decks