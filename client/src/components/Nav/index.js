import React from 'react'

function Nav() {
    return(
        <header>
         <div className="navbar">
            <div className="navbarcontent" id="Homepage"><a href="/">Homepage</a></div>
            <div className="navbarcontent" id="Game"><a href="/Game">Game</a></div>
            <div className="navbarcontent" id="Decks"><a href="/Decks">Deck</a></div>
            <div className="navbarcontent" id="Cards"><a href="/Cards">Cards</a></div>
        </div>
        </header>
    )
}
export default Nav