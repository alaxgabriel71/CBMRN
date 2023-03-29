import { useState } from "react"
import { FloatingLabel, Form, Button } from 'react-bootstrap'

import api from "../../services/api"
import StatusMessage from "../StatusMessage"

export default function EditVehicleForm({ cId, cName, cModel, cPlate, cSeats, cActive }) {
    const [name, setName] = useState(cName)
    const [model, setModel] = useState(cModel)
    const [plate, setPlate] = useState(cPlate)
    const [seats, setSeats] = useState(cSeats)
    const [active, setActive] = useState(cActive)
    const [message, setMessage] = useState()
    const [status, setStatus] = useState()
    const [variant, setVariant] = useState()
    const [show, setShow] = useState(false)

    const handleReset = () => {
        setActive(false)
    }

    const handleSubmit = (e) => {
        setShow(false)
        e.preventDefault()
        //console.log(name, model, plate, seats, active)
        api.put(`/vehicle/${cId}`, {
            active,
            name,
            model,
            plate,
            seats
        })
            .then(() => {
                setStatus("Sucesso")
                setMessage("Viatura atualizada com sucesso!")
                setVariant("success")
                setShow(true)
            })
            .catch(() => {
                setStatus("Falha")
                setMessage("Ocorreu um erro. Tente novamente mais tarde!")
                setVariant("secondary")
                setShow(true)
            })
        setShow(false)
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <StatusMessage message={message} status={status} variant={variant} show={show} />
                <FloatingLabel
                    label="Nome"
                    className="mb-3"
                    value={name}
                    onChange={e => setName(e.target.value)}
                >
                    <Form.Control type="text" defaultValue={name} required />
                </FloatingLabel>
                <FloatingLabel
                    label="Modelo"
                    className="mb-3"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                >
                    <Form.Control type="text" defaultValue={model} required />
                </FloatingLabel>
                <FloatingLabel
                    label="Placa"
                    className="mb-3"
                    value={plate}
                    onChange={e => setPlate(e.target.value)}
                >
                    <Form.Control type="text" defaultValue={plate} required />
                </FloatingLabel>
                <FloatingLabel
                    label="Assentos"
                    className="mb-3"
                    value={seats}
                    onChange={e => setSeats(e.target.value)}
                >
                    <Form.Control type="number" defaultValue={seats} min="2" required />
                </FloatingLabel>
                <Form.Check type="checkbox" label="Ativar" reverse>
                    <Form.Check.Input type="checkbox" isInvalid onChange={() => setActive(!active)} checked={active} />
                    <Form.Check.Label>
                        {active && <strong>Ativada</strong>}
                        {!active && <strong>Ativar</strong>}
                    </Form.Check.Label>
                    <Form.Control.Feedback type="invalid" hidden={active}>
                        <small>Viatura desativada</small>
                    </Form.Control.Feedback>
                </Form.Check>
                <Button
                    type="reset"
                    variant="secondary"
                    onClick={() => handleReset()}
                >
                    Limpar Campos
                </Button>
                <Button
                    type="submit"
                    variant="danger"
                >
                    Criar Viatura
                </Button>
            </fieldset>
        </form>
    )
}