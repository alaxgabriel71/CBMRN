import { useState, useEffect } from 'react'
import { FloatingLabel, Form, Button } from "react-bootstrap";

import api from '../services/api';

export default function CreateGuards() {
    const [active, setActive] = useState(false)
    const [name, setName] = useState()
    const [guards, setGuards] = useState([])

    useEffect(() => {
        api.get("/guards")
            .then(({ data }) => setGuards(data.guards))
    }, [guards])

    const handleSubmit = event => {
        event.preventDefault()
        console.log(name, active)
        api.post("/guards", { name, active })
            .then(() => setGuards([]))
    }

    return (
        <article>
            <h1>Guardas</h1>
            <h2>Criar Nova Guarda</h2>
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    label="Título da guarda"
                    onChange={event => setName(event.target.value)}
                >
                    <Form.Control type="text" required />
                </FloatingLabel>
                <Form.Check type="checkbox" label="Ativar">
                    <Form.Check.Input type="checkbox" isInvalid onChange={() => setActive(!active)} />
                    <Form.Check.Label>
                        {active && <strong>Ativada</strong>}
                        {!active && <strong>Ativar</strong>}
                    </Form.Check.Label>
                    <Form.Control.Feedback type="invalid" hidden={active}>
                        <small>Guarda inativa</small>
                    </Form.Control.Feedback>
                </Form.Check>
                <Button type="submit" variant="danger">Criar</Button>
            </form>
            <h2>Guardas Existentes</h2>
            <ul>
                {guards.map(guard => <li key={guard._id} disabled={guard.active}>{guard.name}</li>)}
            </ul>
        </article>
    )
}