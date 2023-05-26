import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { Button, FloatingLabel, Form } from "react-bootstrap"

import api from "../services/api"
import StatusMessage from "../components/StatusMessage"
import { UserContext } from "../components/contexts/UserContext"

export default function ChangePassword() {
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [variant, setVariant] = useState('')
    const [show, setShow] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        if (newPassword !== confirmNewPassword) {
            window.alert('A nova senha e a confirmação da nova senha precisam ser iguais. Preencha novamente.')
            setConfirmNewPassword('')
        } else {
            api.put(`/users/new-password/${user.id}`, {
                currentPassword,
                newPassword
            })
                .then(() => {
                    setMessage("Senha alterada com sucesso.")
                    setStatus('Sucesso')
                    setVariant('success')
                    setShow(true)
                    const timer = setTimeout(() => {
                        //window.location.reload(false)
                        navigate('/')
                    }, 1500)
    
                    return () => clearTimeout(timer)
                })
                .catch(err => {
                    //console.error(err)
                    if (err.response.status === 401) {
                        setMessage("Preencha corretamente a senha atual.")
                        setStatus('Falha')
                        setVariant('secondary')
                        setShow(true)
                        setCurrentPassword('')
                    } else {
                        setMessage("Tente novamente mais tarde.")
                        setStatus('Falha interna do servidor')
                        setVariant('warning')
                        setShow(true)
                    }
                })
        }
        setShow(false)
    }
    return (
        <article>
            <h1>Trocar Senha</h1>
            <StatusMessage message={message} status={status} variant={variant} show={show} />
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    label="Senha Atual"
                >
                    <Form.Control type="password" value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} required />
                </FloatingLabel>
                <FloatingLabel
                    label="Nova Senha"
                >
                    <Form.Control type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)} minLength="6" maxLength="12" required />
                </FloatingLabel>
                <FloatingLabel
                    label="Confirme a Nova Senha"
                >
                    <Form.Control type="password" value={confirmNewPassword} onChange={event => setConfirmNewPassword(event.target.value)} minLength="6" maxLength="12" required />
                </FloatingLabel>
                <Button variant="secondary" onClick={() => navigate('/')}>Cancelar</Button>
                <Button type="submit" variant="danger">Salvar Nova Senha</Button>
            </form>
        </article>
    )
}