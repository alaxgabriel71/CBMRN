import { useState, useEffect } from "react"
import { FloatingLabel, Form, Button } from "react-bootstrap"

import api from '../services/api'

export function GarrisonCard({ name, composition }) {
    const [functions, setFunctions] = useState([])
    const [selecteds, setSelecteds] = useState([])
    const [militaries, setMilitaries] = useState([])
    const [ranks, setRanks] = useState([])

    useEffect(() => {
        api.get("/functions")
            .then(({ data }) => setFunctions(data.functions))
    }, [])

    /* useEffect(() => {
        console.log(functions)
        console.log(selecteds)
    }, [functions, selecteds]) */

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setMilitaries(data.users))
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
    }, [])

    function getComponentName(comp) {
        let name = ''
        functions.forEach(func => {
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

    function getRankName(id) {
        let name
        ranks.forEach(rank => {
            if (id === rank._id) name = rank.rank
        })

        return name
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (selecteds.length === 0) {
            console.log("falhou")
            return
        }

        api.get("/garrisons-of-day")
            .then(({ data }) => {
                console.log(data.garrisonsOfDay.length)
                if (data.garrisonsOfDay.length > 0) {
                    data.garrisonsOfDay.forEach(garrison => {
                        if (garrison.name === name) {
                            let id = garrison._id
                            api.put(`/garrisons-of-day/${id}`, {
                                composition: selecteds
                            })
                                .then(response => console.log(response.status))
                                .then(err => console.error(err))
                        }
                    })
                } else {
                    api.post("/garrisons-of-day", {
                        name: name,
                        composition: selecteds
                    })
                        .then(response => console.log(response.status))
                        .catch(err => console.error(err))
                }
            })
    }

    return (
        <fieldset>
            <h3>{name}</h3>
            <form onSubmit={handleSubmit}>
                {composition.map(component => (
                    <FloatingLabel key={component}
                        label={getComponentName(component)}
                    >
                        <Form.Select onChange={e => insertSelecteds(component, e.target.value)} required={component === 1}>
                            <option value="">-- Escolher militar --</option>
                            {militaries.map(military => <option key={military._id} value={`${getRankName(Number(military.rank))} ${military.name}`}>{`${getRankName(Number(military.rank))} ${military.name}`}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                ))}
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

    return (
        <div>
            <h2>Definir Guarnições do Dia</h2>
            {garrisons.map(garrison => {
                if (garrison.active) return <GarrisonCard key={garrison._id} name={garrison.name} composition={garrison.composition} />
                else return null
            })}
        </div>
    )
}