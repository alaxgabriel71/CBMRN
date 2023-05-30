import { useState, useEffect } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'

import api from '../services/api'
import StatusMessage from '../components/StatusMessage'

export const HourCard = ({ from, to, id, setMilitary }) => {
    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
    }, [])

    function getRankName(r_id) {
        let name = ''
        ranks.forEach(r => {
            if(r._id === Number(r_id)) name = r.rank
        })
        return name
    }
    return (
        <div>
            <strong>{`${from} às ${to}`}</strong>
            <FloatingLabel
                label="Militar"
                onChange={event => {
                    setMilitary(id, event.target.value)
                    setSelectValue(event.target.value)
                }}
                value={selectValue}
            >
                <Form.Select required>
                    <option value=''>--</option>
                    {users.map(user => <option key={user._id} value={user._id} >{getRankName(user.rank) + " " + user.qra}</option>)}
                </Form.Select>
            </FloatingLabel>
        </div>
    )
}

export function GuardForm({ id }) {
    const [quantity, setQuantity] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [show, setShow] = useState(false)
    const [schedules, setSchedules] = useState([])
    const [message, setMessage] = useState()
    const [status, setStatus] = useState()
    const [variant, setVariant] = useState()
    const [showStatus, setShowStatus] = useState(false)

    function getMinutes(start, end) {
        const from = start.split(':')
        const minutesFrom = Number(from[0])*60 + Number(from[1])
        const to = end.split(':')
        const minutesTo = Number(to[0])*60 + Number(to[1])
        const minutes = Math.floor((minutesTo - minutesFrom)/quantity)
        return minutes
    }

    function getTime(minutes) {
        let hour = Math.floor(minutes / 60)
        if(hour < 10) hour = `0${hour}`
        let min = minutes % 60
        if(min < 10) min = `0${min}`
        const time = `${hour}:${min}`
        return time
    }

    function updateTime(time, minutes) {
        let splited = time.split(':')
        let totalTimeMinutes = Number(splited[0]*60) + Number(splited[1])
        let totalMinutes = minutes + totalTimeMinutes
        const newTime = getTime(totalMinutes)
        return newTime
    }

    const setMilitary = (id, military) => {
        const aux = [...schedules]
        aux.forEach(schedule => {
            if(schedule.id === id) {
                schedule.military = Number(military)
            }
        })
        setSchedules(aux)
    }
    
    const handleSubmit = event => {
        event.preventDefault()
        const avarageMinutes = getMinutes(start, end)
        let from = start
        let to = updateTime(from, avarageMinutes)
        let aux = []
        for (let i = 1; i <= quantity; i++) {
            if(i === Number(quantity)){
                aux.push({id: i, from, to: end, military: schedules[i-1]?.military || ''})
            } else {
                aux.push({id: i, from, to, military: schedules[i-1]?.military || ''})
            }
            from = to
            to = updateTime(from, avarageMinutes) 
        }
        setSchedules(aux)
        setShow(true)
    }

    const handleSave = event => {
        event.preventDefault()
        //console.log(schedules)
        setShowStatus(false)
        api.put(`/guards/${id}`, {
            active: true,
            schedules
        })
            .then(() => {
                setMessage('Horários definidos.')
                setStatus('Sucesso')
                setVariant('success')
                setShowStatus(true)
            })
            .catch(() => {
                setMessage('Tente novamente mais tarde.')
                setStatus('Erro no servidor')
                setVariant('secondary')
                setShowStatus(true)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    label="Quantidade de militares"
                    onChange={e => setQuantity(e.target.value)}
                >
                    <Form.Control type="number" min="1" required />
                </FloatingLabel>
                <FloatingLabel
                    label="Início"
                    onChange={e => setStart(e.target.value)}
                >
                    <Form.Control type="time" required />
                </FloatingLabel>
                <FloatingLabel
                    label="Término"
                    onChange={e => setEnd(e.target.value)}
                >
                    <Form.Control type="time" required />
                </FloatingLabel>
                <Button type="submit" variant="secondary" size="sm">Gerar</Button>
            </form>
            {show && (
                <form onSubmit={handleSave}>
                    <StatusMessage message={message} status={status} variant={variant} show={showStatus} />
                    {schedules.map(schedule => <HourCard key={schedule.id} from={schedule.from} to={schedule.to} id={schedule.id} setMilitary={setMilitary} />)}
                    <Button type="submit" variant="danger" size="sm">Salvar</Button>
                </form>
            )}
        </div>
    )
}

export default function DefineGuard() {
    const [guards, setGuards] = useState([])

    useEffect(() => {
        api.get("/guards")
            .then(({ data }) => setGuards(data.guards))
    }, [])

    return (
        <article>
            <h1>Definir Guarda do Quartel</h1>
            {/* <h2>Guarda Diurna</h2>
            <GuardForm />
            <h2>Guarda Noturna</h2>
            <GuardForm />
            <h2>Guarda Matinal</h2>
            <GuardForm /> */}
            {guards.map(guard => {
                if(guard.active) {
                    return (
                        <li key={guard._id}>
                            <h2>{guard.name}</h2>
                            <GuardForm id={guard._id} />
                        </li>
                    )
                } else return null
            })}
        </article>
    )
}