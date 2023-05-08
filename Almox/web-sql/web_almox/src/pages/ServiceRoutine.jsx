import { useState, useEffect } from "react"

import api from "../services/api"

export default function ServiceRoutine() {
    const [adjunct, setAdjunct] = useState({})
    const [users, setUsers] = useState([])
    const [garrisonsOfDay, setGarrisonsOfDay] = useState([])
    const [guards, setGuards] = useState([])
    const [cleanings, setCleanings] = useState([])
    const [spots, setSpots] = useState([])
    const [ranks, setRanks] = useState([])
    const [vehicles, setVehicles] = useState([])

    const date = new Date()

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => data.users)
            .then(users => {
                setUsers(users)
                users.forEach(user => {
                    if (user.adjunct) setAdjunct(user)
                })
            })
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
    }, [])

    useEffect(() => {
        api.get("/garrisons-of-day")
            .then(({ data }) => setGarrisonsOfDay(data.garrisonsOfDay))
            .then(() => {
                api.get("/vehicles")
                    .then(({ data }) => setVehicles(data.vehicles))
            })
    }, [])

    useEffect(() => {
        api.get("/guards")
            .then(({ data }) => setGuards(data.guards))
    }, [])

    useEffect(() => {
        api.get("/cleanings")
            .then(({ data }) => setCleanings(data.cleanings))
            .then(() => {
                api.get("/spots")
                    .then(({ data }) => setSpots(data.spots))
            })
    }, [])

    function getRankName(id) {
        let name = ''
        ranks.forEach(rank => {
            if(rank._id === id) {
                name = rank.rank
            }
        })
        return name
    }

    function getVehicleName(id) {
        let name = ''
        vehicles.forEach(vehicle => {
            if(vehicle._id === id) {
                name = vehicle.name
            }
        })
        return name
    }

    function getMilitaryName(id) {
        let name = ''
        users.forEach(user => {
            if(user._id === id) {
                name = `${getRankName(user.rank)} ${user.qra}`
            }
        })
        return name
    }

    function getUser(id) {
        let aux = {}
        users.forEach(user => {
            if(user._id === id) {
                aux = user
            }
        })
        return getMilitaryName(aux._id)
    }

    function getSpotName(id) {
        let name = ''
        spots.forEach(spot => {
            if(spot._id === id) name = spot.name
        })
        
        return name
    }
    return (
        <div>
            <h2>Rotina de Serviço {`(${date.toLocaleDateString('pt-BR')})`}</h2>
            <strong>Fiscal: </strong>
            <span>{`${getRankName(adjunct.rank)} ${adjunct.qra}`}</span>
            <br />
            <div>
                <h3>Guarnições de Serviço</h3>
                <ul>
                    {garrisonsOfDay?.map(garrison => (
                        <li key={garrison._id}>
                            <h4>{garrison.name + " - " + getVehicleName(garrison.vehicle)}</h4>
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
                                        {guard.schedules?.map(schedule => <li key={schedule.id}><strong>{schedule.from + " às " + schedule.to + " - "}</strong><span>{getUser(schedule.military)}</span></li>)}
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
                            <h4>{getSpotName(cleaning.spot)}</h4>
                            <ul>
                                {cleaning.composition?.map(component => <li key={component.id}>{getUser(component.name)}</li>)}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Determinações e Avisos</h3>
                <p>* A passagem do quarto de hora deve ser realizada em local seguro, obedecendo às normas de segurança.</p>
                <p>* Qualquer situação que fuja da rotina normal da UBM deve ser levada ao conhecimento do mais antigo de serviço.</p>
            </div>
            <div>
                <h3>Rotina</h3>
                <p>Hasteamento da Bandeira: 08h00</p>
                <p>Arriamento da Bandeira: 17h00</p>
                <p>Pernoite: 21h00</p>
                <p>Alvorada: 05h30</p>
            </div>
        </div>
    )
}