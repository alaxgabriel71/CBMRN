import { useState, useEffect } from 'react'

import api from '../services/api'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

export function SpotCard({ id, name, sync }) {
    const [show, setShow] = useState(false)
    const handleRemove = id => {
        api.delete(`/spots/${id}`)
            .then(() => sync())
    }
    return (
        <li onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
            <strong>{name}</strong>
            {show && (
                <Button variant="secondary" onClick={() => handleRemove(id)}>Excluir</Button>
            )}
        </li>
    )
}

export default function Spots() {
    const [spots, setSpots] = useState([])
    const [name, setName] = useState()
    const [reload, setReload] = useState(false)


    const handleSubmit = event => {
        event.preventDefault()

        api.post("/spots", { name })
            .then(() => setReload(!reload))
    }

    useEffect(() => {
        api.get("/spots")
            .then(({ data }) => setSpots(data.spots))
    }, [reload])

    useEffect(() => console.log(name), [name])

    return (
        <article>
            <h1>Locais do Quartel</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <FloatingLabel label="Nome do Local" className="floating-label">
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    </FloatingLabel>
                    {/* <input type="text" value={name} onChange={e => setName(e.target.value)} /> */}
                    <Button variant="danger" type='submit'>Adicionar Novo Local</Button>
                </form>
            </fieldset>
            <ol>
                {spots.map(spot => <SpotCard key={spot._id} name={spot.name} id={spot._id} sync={() => setReload(!reload)} />)}
            </ol>
        </article>
    )
}