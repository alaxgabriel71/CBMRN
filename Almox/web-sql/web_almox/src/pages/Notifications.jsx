import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"

import api from "../services/api"
import { Button } from "react-bootstrap"
import { UserContext } from "../components/contexts/UserContext"
import PasswordModal from "../components/modals/PasswordModal"

export function NotificationCard({ notification, from, content, subject, status, createdAt, reload }) {
    const { user } = useContext(UserContext)

    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])

    const [show, setShow] = useState(false)
    const [registration, setRegistration] = useState()
    const [password, setPassword] = useState()
    const [response, setResponse] = useState()


    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
    }, [])

    function getRank(id) {
        let name = ''
        ranks.forEach(rank => {
            if (rank._id === id) name = rank.rank
        })

        return name
    }

    function getFrom(id) {
        let name = ''
        users.forEach(user => {
            if (user._id === id) {
                name = `${getRank(user.rank)} ${user.qra}`
            }
        })
        return name
    }

    const getDate = (d) => {
        const date = new Date(d)
        let formatedDate = d.split('T')
        formatedDate = formatedDate[1].split(':')
        let hour = String(Number(formatedDate[0]) - 3)
        hour = Number(hour) < 10 ? ("0" + hour) : hour
        formatedDate = hour + ":" + formatedDate[1]
        formatedDate = date.toLocaleDateString('pt-br') + " - " + formatedDate
        return formatedDate
    }

    const handleRemove = () => {
        api.delete(`/notifications/${notification}`, {
            id: user.id,
            registration,
            password
        })
            .then(() => {
                setShow(false)
                reload()
            })
            .catch((err) => console.log(err))
    }

    const handleKnowledge = () => {
        setResponse('')
        api.put(`/notifications/${notification}`, {
            id: user.id,
            registration,
            password
        })
            .then((response) => {
                api.put(`/knowledges/${notification}`, {
                    id: user.id,
                    registration,
                    password
                })
                    .then((response) => {
                        setResponse(response.status)
                        //reload()
                    })
                    .catch((err) => setResponse(err.response.status))
            })
            .catch((err) => setResponse(err.response.status))
    }

    return (
        <div>
            <strong>{getFrom(from)}</strong>
            <span>{subject}</span>
            <p>{content}</p>
            <span>{getDate(createdAt)}</span>
            <Button variant="secondary" onClick={handleRemove}>Excluir</Button>
            <Button variant="danger" onClick={() => setShow(true)} hidden={status}>Ciente</Button>
            <div>
                <PasswordModal show={show} onClose={() => setShow(false)} save={handleKnowledge} reg={(value) => setRegistration(value)} pass={(value) => setPassword(value)} response={response} />
            </div>
        </div>
    )
}

export default function Notifications() {
    const { id } = useParams()

    const [notifications, setNotifications] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        api.get(`/notifications/${id}`)
            .then(({ data }) => setNotifications(data.notifications))
    }, [id, refresh])

    function reload() {
        setRefresh(!refresh)
    }

    return (
        <article>
            <h1>Notificações</h1>
            {notifications?.map(notification => (
                <NotificationCard
                    key={notification._id}
                    notification={notification._id}
                    from={notification.from}
                    subject={notification.subject}
                    content={notification.content}
                    status={notification.status}
                    createdAt={notification.createdAt}
                    reload={reload}
                />
            ))}
            {/* <PasswordModal show={show} onClose={() => setShow(false)} /* save={handleKnowledge} */ /*reg={(value) => setRegistration(value)} pass={(value) => setPassword(value)} /> */}
        </article>
    )
}