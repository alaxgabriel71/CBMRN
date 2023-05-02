import { useContext, useEffect, useState } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'

import { UserContext } from '../contexts/UserContext'
import StatusMessage from '../StatusMessage'
import api from '../../services/api'

export default function NewGarrison() {
    
    const [name, setName] = useState('')
    const [composition, setComposition] = useState([])
    const [max, setMax] = useState()
    const [min, setMin] = useState()
    const [active, setActive] = useState(false)
    const [message, setMessage] = useState()
    const [status, setStatus] = useState()
    const [variant, setVariant] = useState()
    const [show, setShow] = useState(false)

    const { functions } = useContext(UserContext)

    useEffect(()=>{
        console.log(active)
    }, [composition, active])

    function getFunc(id) {
        let name
        functions.forEach(func => {
            if(id === func._id) {
                name = func.name
            }
        })
        return name
    }

    function removeComponent(id) {
        let newArray = []
        composition.forEach(comp => {
            if(id !== comp){
                newArray.push(comp)
            }
        })
        
        newArray.forEach((comp, k) => {
            comp.id = k
        })

        setComposition(newArray)
    }

    function cancelSubmit() {
        setComposition([])
        setActive(false)
    }

    const handleSubmit = (event) => {
        setShow(false)
        event.preventDefault()
        console.log(name, composition, min, max)
        api.post('/garrisons', {
            name,
            active,
            composition,
            max,
            min
        })
            .then(() => {
                setStatus("Sucesso")
                setMessage("Guarnição salva com sucesso!")
                setVariant("success")
                setShow(true)
            })
            .catch(() => {
                setStatus("Falha")
                setMessage("Ocorreu um erro. Tente novamente mais tarde!")
                setVariant("danger")
                setShow(true)
            })
        setShow(false)
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <StatusMessage message={message} status={status} variant={variant} show={show} />
                <FloatingLabel 
                    label="Nome da Guarnição" 
                    className="mb-3"
                    value={name}
                    onChange={e => setName(e.target.value)}
                >
                    <Form.Control 
                        type="text" 
                        required={true}
                    />
                </FloatingLabel>
                <fieldset>
                    <FloatingLabel 
                        label="Crie a composição da guarnição"
                        className="mb-3"
                    >
                        <Form.Select onChange={e => setComposition([...composition, Number(e.target.value)])} >
                            <option value="" key="0">-- Adicione uma função --</option>
                            {functions.map(func => (
                                <option key={func._id} value={func._id} >{func.name}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    <h4>Componentes selecionados:</h4>
                    <ul>
                        {composition.map(component => (
                            <li key={component} onClick={() => removeComponent(component)}>{getFunc(component)}</li>
                        ))}
                    </ul>
                </fieldset>
                <FloatingLabel
                        label="Quantidade mínima de integrantes"
                        className="mb-3"
                        value={min}
                        onChange={event => setMin(event.target.value)}
                >
                    <Form.Control type="number" min="2" required />
                </FloatingLabel>
                <FloatingLabel
                        label="Quantidade máxima de integrantes"
                        className="mb-3"
                        value={max}
                        onChange={event => setMax(event.target.value)}
                >
                    <Form.Control type="number" min="2" required />
                </FloatingLabel>
                <Form.Check type="checkbox" label="Ativar" reverse>
                    <Form.Check.Input type="checkbox" isInvalid onChange={() => setActive(!active)} />
                    <Form.Check.Label>
                        {active && <strong>Ativada</strong>}
                        {!active && <strong>Ativar</strong>}
                    </Form.Check.Label>
                    <Form.Control.Feedback type="invalid" hidden={active}>
                        <small>Guarnição desativada</small>
                    </Form.Control.Feedback>
                </Form.Check>
                <div className="form-btn-area">
                    <Button
                        id="cancel"
                        className="form-btn"
                        variant="secondary"
                        type="reset"
                        onClick={() => {
                            cancelSubmit()
                        }}
                    >
                        Limpar campos
                    </Button>
                    <Button
                        id="confirm"
                        className="form-btn"
                        variant="danger"
                        type="submmit"
                    >
                        Salvar Guarnição
                    </Button>
                </div>               
            </fieldset>
        </form>
    )
}