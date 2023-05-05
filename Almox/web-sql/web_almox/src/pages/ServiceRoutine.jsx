import { useState, useEffect } from "react"

import api from "../services/api"

export default function ServiceRoutine() {
    const [adjunct, setAdjunct] = useState()
    const [garrisonsOfDay, setGarrisonsOfDay] = useState([])
    const [guards, setGuards] = useState([])
    const [cleanings, setCleanings] = useState([])

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => data.users)
            .then(users => {
                users.forEach(user => {
                    if (user.adjunct) setAdjunct(`${user.rank} ${user.qra}`)
                })
            })
    }, [])

    useEffect(() => {
        api.get("/garrisons-of-day")
            .then(({ data }) => setGarrisonsOfDay(data.garrisonsOfDay))
    }, [])

    useEffect(() => {
        api.get("/guards")
            .then(({ data }) => setGuards(data.guards))
    }, [])

    useEffect(() => {
        api.get("/cleanings")
            .then(({ data }) => setCleanings(data.cleanings))
    }, [])

    return (
        <div>
            <h2>Rotina de Serviço</h2>
            <strong>Fiscal: </strong>
            <span>{adjunct}</span>
            <br />
            <div>
                <h3>Guarnições de Serviço</h3>
                <ul>
                    {garrisonsOfDay?.map(garrison => (
                        <li key={garrison._id}>
                            <h4>{garrison.name + " - " + garrison.vehicle}</h4>
                            <ul>
                                {garrison.composition.map(component => <li key={component.function}><strong>{component.function + ": "}</strong><span>{component.military}</span></li>)}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Guarda do Quartel</h3>
                <ul>
                    {guards?.map(guard => {
                        if (guard.active) {
                            return (
                                <li key={guard._id}>
                                    <h4>{guard.name}</h4>
                                    <ul>
                                        {guard.schedules?.map(schedule => <li key={schedule.id}><strong>{schedule.from + " às " + schedule.to + " - "}</strong><span>{schedule.military}</span></li>)}
                                    </ul>
                                </li>
                            )
                        } else return null
                    })}
                </ul>
            </div>
            <div>
                <h3>Faxina</h3>
                <ul>
                    {cleanings?.map(cleaning => (
                        <li key={cleaning._id}>
                            <h4>{cleaning.spot}</h4>
                            <ul>
                                {cleaning.composition?.map(component => <li key={component.id}>{component.name}</li>)}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Determinações e Avisos</h3>
            </div>
            <div>
                <h3>Rotina</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, labore cum molestias dolor delectus, itaque sunt architecto necessitatibus natus laborum accusamus rem voluptatibus similique fugiat, quis saepe tenetur sed? Vero?</p>
            </div>
        </div>
    )
}