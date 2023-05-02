import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'

import SetGarrisonsOfDay from "./SetGarrisonsOfDay";
import api from "../services/api";

export function SetAdjunct() {
    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])
    const [adjunct, setAdjunct] = useState()

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
    }, [])

    function getRankName(id) {
        let name
        ranks.forEach(rank => {
            if (id === rank._id) name = rank.rank
        })

        return name
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log(adjunct)
        api.put(`/users/adjunct/${adjunct}`)
            .then(response => console.log(response.status))
    }

    return (
        <fieldset>
            <h2>Adjunto do dia</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Escolher militar:
                    <select onChange={e => setAdjunct(e.target.value)}>
                        <option>- - -</option>
                        {users.map(user => (user.admin === 3) ? (<option key={user._id} value={user._id}>{`${getRankName(user.rank)} ${user.qra}`}</option>) : null)}
                    </select>
                </label>
                <button type="submit">Salvar</button>
            </form>
        </fieldset>
    )
}

export function CleaningCard({ spot, name }) {
    const [users, setUsers] = useState([])
    const [composition, setComposition] = useState([])

    useEffect(()=>{
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
    },[])

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

    const handleChange = event => {
        const aux = [...composition]
        aux.push({id: composition.length+1, name: event.target.value})
        setComposition(aux)
    }

    const handleSave = () => {
        console.log({spot: spot, composition})
        api.post("/cleanings", {spot: spot, composition})
            .then(response => console.log(response.status))
    }

    return (
        <li>
            <h3>{name}</h3>
            <select onChange={handleChange}>
                <option value="">-- Escolher Militar --</option>
               {users.map(user => <option key={user._id}>{user.qra}</option>)}
            </select>
            {composition?.map(component => <p key={component.id} onClick={() => removeComponent(component)}>{component.name}</p>)}
            <Button variant="danger" size="sm" onClick={handleSave}>Salvar</Button>
        </li>
    )
}

export function SetCleaning() {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        api.get("/spots")
            .then(({ data }) => setSpots(data.spots))
    }, [])

    return (
        <fieldset>
            <h2>Faxina</h2>
            <ol>
                {spots.map(spot => <CleaningCard key={spot._id} spot={spot._id} name={spot.name} />)}
            </ol>
        </fieldset>
    )
}

export default function DefineServiceRoutine() {
    return (
        <article>
            <h1>GUARNIÇÃO DE SERVIÇO DO DIA</h1>
            <SetAdjunct />
            <SetGarrisonsOfDay />
            <SetCleaning />
        </article>
    )
}