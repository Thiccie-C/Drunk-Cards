import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ALL_CARDS } from '../../utils/queries'
import { EDIT_CARD, REMOVE_CARD } from '../../utils/mutations'
const CardList= () => {
    const {data, loading} = useQuery(GET_ALL_CARDS)
    const Cards = data?.getAllCards || []
    const [removeCard] = useMutation(REMOVE_CARD)
    const [editCard, setEditCard] = useState()
    const [editFormData, setEditFormData] = useState({cardName: '', cardText: '', cardColor: ''})
    const [editCardSubmit] = useMutation(EDIT_CARD)
    const handleDelete = (e) => {
        const cardName = e.target.id
        removeCard({variables: {cardName}})
        window.location.reload()
    }
    const handleEditToggle = (e, cardText, cardName, cardColor) => {
        e.preventDefault()
        if(e.target.id === 'cancel') {
            setEditCard(null)
        } else {
        setEditCard(e.target.id)
        setEditFormData({...editFormData, cardName: cardName, cardText: cardText, oldCardName: cardName, cardColor: cardColor})
        }
    }
    const handleEditChange = (e) => {
        if(e.target.id === 'cardColor') {
            setEditFormData({...editFormData, [e.target.id]: e.target.value.split(" ")[0]})
        } else {
            setEditFormData({...editFormData, [e.target.id]: e.target.value})
        }
    }
    const handleEditSubmit = (e) => {
        e.preventDefault()
        editCardSubmit({variables: editFormData})
        window.location.reload()
    }
    if(loading) {
        return (
            <div>
                loading
            </div>
        )
    }
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <h1>Card List</h1>
            {Cards && Cards.map((Card, index) => (
                <div key={Card._id} style={{background: Card.cardColor, width: '250px', height: '300px', margin: "2px", color: 'white', WebkitTextStrokeColor: 'Black', WebkitTextStrokeWidth: '1px', border: '3px solid black'}}>
                {(editCard == index)  ? 
                <>
                <form onSubmit={handleEditSubmit}>
                   <textarea onChange={handleEditChange} id='cardName' placeholder='Card Name' value={editFormData.cardName}></textarea>
                   <textarea onChange={handleEditChange} id='cardText' placeholder='Card Text' value={editFormData.cardText}></textarea>
                   <select onChange={handleEditChange} id="cardColor">
                    <option>Change The Difficulty</option>
                    <option id="Green">Green (Easy)</option>
                    <option id="Yellow">Yellow (Medium)</option>
                    <option id="Red">Red (Hard)</option>
                    <option id="Black">Black (Impossible)</option>
                </select><br/>
                   <button type='submit'>Submit</button> 
                   <button onClick={handleEditToggle} id={'cancel'}>Cancel Edit</button>
                </form>
                </>
                :
                <>
                    <h1>{Card.cardName}</h1>
                    <h2>
                    {Card.cardText}
                    </h2>
                    <button id={Card.cardName} onClick={handleDelete}>Remove Card</button>
                    <button id={index} onClick={(e) => {handleEditToggle(e, Card.cardText, Card.cardName, Card.cardColor)}}>Edit Card</button>
                    </> 
                }
                </div>
            ))}
        </div>
    )
}

export default CardList