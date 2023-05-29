import { useState, useEffect } from 'react'
import { FloatingLabel, Form, Button } from "react-bootstrap";

import api from '../services/api';

export function GuardCard({ id, name, active, refresh }) {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        api.put(`/guards/status/${id}`, { active: !active })
            .then(() => refresh())
    }

    const handleRemove = () => {
        api.delete(`/guards/${id}`)
            .then(() => refresh())
    }
    return (
        <li onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
            <strong>{name}</strong>
            <label>
                Ativa
                <input type="radio" checked={active} onClick={handleClick}/>
            </label>
            {show && <button onClick={handleRemove}>Remover</button>}
        </li>
    )
}

export default function CreateGuards() {
    const [active, setActive] = useState(false)
    const [name, setName] = useState()
    const [guards, setGuards] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        api.get("/guards")
            .then(({ data }) => setGuards(data.guards))
    }, [refresh])

    const handleSubmit = event => {
        event.preventDefault()
        api.post("/guards", { name, active })
            .then(() => setRefresh(!refresh))
            .then(() => setName(''))
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
                    <Form.Control value={name} type="text" required />
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
                {guards.map(guard => <GuardCard key={guard._id} id={guard._id} active={guard.active} name={guard.name} refresh={() => setRefresh(!refresh)}/>)}
            </ul>
        </article>
    )
}