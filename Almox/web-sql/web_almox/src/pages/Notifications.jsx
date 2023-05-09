import { useState, useEffect } from "react"
import { useParams } from "react-router"

import api from "../services/api"

export default function Notifications() {
    const { id } = useParams()

    const [notifications, setNotifications] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get("/users")
            .then(({ data }) => setUsers(data.users))
    }, [])

    useEffect(() => {
        api.get(`/notifications/${id}`)
            .then(({ data }) => setNotifications(data.notifications))
    }, [])

    return (
        <article>
            <h1>Notificações</h1>
            {notifications?.map(notification => (
                <div key={notification._id}>
                    <strong>{notification.from}</strong>
                    <p>{notification.content}</p>
                    <span>{notification.createdAt}</span>
                </div>
            ))}
        </article>
    )
}