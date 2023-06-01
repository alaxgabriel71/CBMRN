import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, NavLink } from "react-bootstrap";

import api from "../services/api";

export function FunctionCard({ id, name, refresh }) {
    const [show, setShow] = useState(false)

    const handleRemove = () => {
        api.delete(`/functions/${id}`)
            .then(() => refresh())
            .catch(err => console.log(err))
    }

    return (
        <li onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
            <span>{name}</span>
            {show && <Button variant="danger" size="sm" onClick={handleRemove}>Excluir</Button>}
        </li>
    )
}

export default function FunctionsControl() {
    const [functionName, setFunctionName] = useState('')
    const [functions, setFunctions] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        api.get("/functions")
            .then(({ data }) => setFunctions(data.functions))
    }, [refresh])

    const handleSubmit = event => {
        event.preventDefault()
        api.post("/functions", {
            name: functionName
        })
            .then(() => setRefresh(!refresh))
            .then(() => setFunctionName(''))
    }

    return (
        <article>
            <h1>Funções das Guarnições</h1>
            <NavLink href="/garrisons-tabs">Voltar</NavLink>
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    label="Função"
                >
                    <Form.Control type="text" value={functionName} onChange={event => setFunctionName(event.target.value)} required />
                </FloatingLabel>
                <Button variant="danger" size="sm" type="submit">Criar</Button>
            </form>
            <ul>
                {functions.map(func => <FunctionCard key={func._id} id={func._id} name={func.name} refresh={() => setRefresh(!refresh)}/>)}
            </ul>
        </article>
    )
}