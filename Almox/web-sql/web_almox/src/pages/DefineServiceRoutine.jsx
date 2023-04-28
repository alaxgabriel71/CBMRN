import { useState, useEffect } from "react";
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
                        {users.map(user => (user.admin === 3) ? (<option key={user._id} value={user._id}>{`${getRankName(user.rank)} ${user.qra}`}</option>): null)}
                    </select>
                </label>
                <button type="submit">Salvar</button>
            </form>
        </fieldset>
    )
}

export default function DefineServiceRoutine() {
    return (
        <article>
            <h1>GUARNIÇÃO DE SERVIÇO DO DIA</h1>
            <SetAdjunct />
            <SetGarrisonsOfDay />
        </article>
    )
}