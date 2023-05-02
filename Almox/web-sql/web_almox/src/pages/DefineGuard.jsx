import { useState } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'

export function GuardForm() {
    const [quantity, setQuantity] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    
    const handleSubmit = event => {
        event.preventDefault()
        console.log(quantity, start, end)
    }

    return (
        <form onSubmit={handleSubmit}>
            <FloatingLabel
                label="Quantidade de militares"
                onChange={e => setQuantity(e.target.value)}
            >
                <Form.Control type="number" min="1" required />
            </FloatingLabel>
            <FloatingLabel
                label="Início"
                onChange={e => setStart(e.target.value)}
            >
                <Form.Control type="time" required />
            </FloatingLabel>
            <FloatingLabel
                label="Término"
                onChange={e => setEnd(e.target.value)}
            >
                <Form.Control type="time" required />
            </FloatingLabel>
            <Button type="submit" variant="danger" size="sm">Gerar</Button>
        </form>
    )
}

export default function DefineGuard() {

    return (
        <article>
            <h1>Definir Guarda do Quartel</h1>
            <h2>Guarda Diurna</h2>
            <GuardForm />
            <h2>Guarda Noturna</h2>
            <GuardForm />
            <h2>Guarda Matinal</h2>
            <GuardForm />
        </article>
    )
}