import { useState, useEffect } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'

import api from '../services/api'

export const HourCard = ({ from, to, id, setMilitary }) => {
    const [users, setUsers] = useState([])
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
    }, [])

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
                    {users.map(user => <option key={user._id} value={user._id} >{user.qra}</option>)}
                </Form.Select>
            </FloatingLabel>
        </div>
    )
}

export function GuardForm() {
    const [quantity, setQuantity] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [show, setShow] = useState(false)
    const [schedules, setSchedules] = useState([])

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
                schedule.military = military
            }
        })
        console.log(aux)
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
        console.log(schedules)
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
                    {schedules.map(schedule => <HourCard key={schedule.id} from={schedule.from} to={schedule.to} id={schedule.id} setMilitary={setMilitary} />)}
                    <Button type="submit" variant="danger" size="sm">Salvar</Button>
                </form>
            )}
        </div>
    )
}

export default function DefineGuard() {

    return (
        <article>
            <h1>Definir Guarda do Quartel</h1>
            <h2>Guarda Diurna</h2>
            <GuardForm />
            <h2>Guarda Noturna</h2>
            <GuardForm />
            <h2>Guarda Matinal</h2>
            <GuardForm />
        </article>
    )
}