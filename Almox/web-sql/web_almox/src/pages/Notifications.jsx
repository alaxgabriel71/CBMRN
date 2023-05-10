import { useState, useEffect } from "react"
import { useParams } from "react-router"

import api from "../services/api"
import { Button } from "react-bootstrap"

export function NotificationCard({ notification, from, content, subject, createdAt, reload }) {
    const [users, setUsers] = useState([])
    const [ranks, setRanks] = useState([])

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
            if(rank._id === id) name = rank.rank
        })

        return name
    }

    function getFrom(id) {
        let name = ''
        users.forEach(user => {
            if(user._id === id) {
                name = `${getRank(user.rank)} ${user.qra}`
            }
        })
        return name
    }

    const handleRemove = () => {
        api.delete(`/notifications/${notification}`)
            .then(() => reload())
    }

    const handleKnowledge = () => {
        console.log("ciente")
        

    }

    return (
        <div>
            <strong>{getFrom(from)}</strong>
            <span>{subject}</span>
            <p>{content}</p>
            <span>{createdAt}</span>
            <Button variant="secondary" onClick={handleRemove}>Excluir</Button>
            <Button variant="danger" onClick={handleKnowledge}>Ciente</Button>
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
                    createdAt={notification.createdAt}
                    reload={reload}
                />
            ))}
        </article>
    )
}