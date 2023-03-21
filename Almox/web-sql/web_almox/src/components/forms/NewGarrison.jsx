import { useContext, useEffect, useState } from 'react'

import { FloatingLabel, Form, Button } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'

import api from '../../services/api'

export default function NewGarrison() {
    
    const [name, setName] = useState('')
    const [composition, setComposition] = useState([])
    const [max, setMax] = useState()
    const [min, setMin] = useState()

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
        api.post('/garrisons', {
            name,
            composition: {
                composition
            },
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
                    <Form.Control type="number" min="2" />
                </FloatingLabel>
                <FloatingLabel
                        label="Quantidade máxima de integrantes"
                        className="mb-3"
                        value={max}
                        onChange={event => setMax(event.target.value)}
                >
                    <Form.Control type="number" min="2" />
                </FloatingLabel>
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
                        Criar Guarnição
                    </Button>
                </div>               
            </fieldset>
        </form>
    )
}