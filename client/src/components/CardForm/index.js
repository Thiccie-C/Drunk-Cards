import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARD } from "../../utils/mutations";
const CardForm = () => {
    const [addCard] = useMutation(ADD_CARD)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(e.target[0].id, e.target[0].value)
        console.log(e.target[1].id, e.target[1].value)
        console.log(e.target[2].id, e.target[2].value.split(' ')[0])
        addCard({variables: {[e.target[2].id]: e.target[2].value.split(' ')[0], [e.target[1].id]: e.target[1].value, [e.target[0].id]: e.target[0].value }})
        window.location.reload()
    }
    return (
        <div style={{display: 'flex'}}>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="cardName" id="cardName"></textarea> <br/>
                <textarea placeholder="cardText" id='cardText'></textarea><br/>
                <select id="cardColor">
                    <option>Select a Difficulty</option>
                    <option id="Green">Green (Easy)</option>
                    <option id="Yellow">Yellow (Medium)</option>
                    <option id="Red">Red (Hard)</option>
                    <option id="Black">Black (Impossible)</option>
                </select><br/>
                <button type="submit">Add Card</button>
            </form>
        </div>
    )
}

export default CardForm