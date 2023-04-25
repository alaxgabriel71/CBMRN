import { useState, useEffect } from "react"
import { FloatingLabel, Form, Button } from "react-bootstrap"

import api from '../services/api'

export function GarrisonCard({ name, composition }) {
    const [functions, setFunctions] = useState([])
    const [selecteds, setSelecteds] = useState([])

    useEffect(() => {
        api.get("/functions")
            .then(({ data }) => setFunctions(data.functions))
    }, [])

    useEffect(() => {
        console.log(functions)
        console.log(selecteds)
    }, [functions, selecteds])

    function getComponentName(comp) {
        let name = ''
        functions.map(func => {
            if (func._id === comp) {
                name = func.name
            }
        })

        return name
    }

    const insertSelecteds = (component, selected) => {
        let aux = [...selecteds]

        aux.push({
            function: getComponentName(component), 
            military: selected
        })

        setSelecteds(aux)
    }

    return (
        <fieldset>
            <h2>{name}</h2>
            <form>
                {composition.map(component => (
                    <FloatingLabel key={component}
                        label={getComponentName(component)}
                    >
                        <Form.Select onChange={e => insertSelecteds(component, e.target.value)}>
                            <option>Escolher militar</option>
                            <option value="militar 1">militar 2</option>
                            <option value="militar 2">militar 1</option>
                        </Form.Select>
                    </FloatingLabel>
                ))}
                <Button type="cancel" variant="secondary" size="sm">Limpar Definição</Button>
                <Button type="submit" variant="danger" size="sm">Salvar Definição</Button>
            </form>
        </fieldset>
    )
}

export default function SetGarrisonsOfDay() {
    const [garrisons, setGarrisons] = useState([])

    useEffect(() => {
        api.get("/garrisons")
            .then(({ data }) => setGarrisons(data.garrisons))
    }, [])

    useEffect(() => {
        console.log(garrisons)
    }, [garrisons])

    return (
        <article>
            <h1>Definir Guarnições do Dia</h1>
            {garrisons.map(garrison => {
                if(garrison.active) return <GarrisonCard key={garrison._id} name={garrison.name} composition={garrison.composition} />
                else return null
            })}
        </article>
    )
}