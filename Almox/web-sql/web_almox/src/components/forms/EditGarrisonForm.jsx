import { useContext, useEffect, useState } from 'react'

import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'

import api from '../../services/api'

export default function EditGarrisonForm({ cId, cName, cComposition, cMax, cMin, cActive }) {
    
    const [name, setName] = useState(cName)
    const [composition, setComposition] = useState(cComposition.composition)
    const [max, setMax] = useState(cMax)
    const [min, setMin] = useState(cMin)
    const [active, setActive] = useState(cActive)

    const { functions } = useContext(UserContext)

    useEffect(()=>{

    }, [composition])

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
        setComposition(newArray)
    }

    function cancelSubmit() {
        setComposition([])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(name, composition, min, max)
        api.put(`/garrison/${cId}`, {
            name,
            active,
            composition,
            max,
            min
        })
            .then(() => window.location.reload(false))
            .catch(err => console.error(err))
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <fieldset>
                <FloatingLabel 
                    label="Nome da Guarnição" 
                    className="mb-3"
                    value={name}
                    onChange={e => setName(e.target.value)}
                >
                    <Form.Control 
                        type="text"
                        defaultValue={name} 
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
                    <Form.Control 
                        type="number" 
                        min="2" 
                        defaultValue={min}
                        required  
                    />
                </FloatingLabel>
                <FloatingLabel
                        label="Quantidade máxima de integrantes"
                        className="mb-3"
                        value={max}
                        onChange={event => setMax(event.target.value)}
                >
                    <Form.Control 
                        type="number" 
                        min="2" 
                        defaultValue={max}
                        required 
                    />
                </FloatingLabel>
                <Form.Check type="checkbox" label="Ativar" reverse>
                    <Form.Check.Input 
                        type="checkbox" 
                        checked={active}
                        isInvalid 
                        onChange={() => setActive(!active)} 
                    />
                    <Form.Check.Label>Ativar</Form.Check.Label>
                    <Form.Control.Feedback type="invalid" hidden={!active}>
                        Ativada
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