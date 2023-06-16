import { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { UserContext } from '../components/contexts/UserContext'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'
import StatusMessage from '../components/StatusMessage'

import "./Login.css"

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')

    const { setLogin, saveLoggedUser, setIsAuthenticated } = useContext(UserContext)

    const navigate = useNavigate()


    useEffect(() => {
        //saveLoggedUser('')
        setLogin(true)
    }, [/* saveLoggedUser, */ setLogin])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setShow(false)

        api.post("/login", {
            email,
            password
        })
            .then(({ data }) => {
                const { id, name, token, admin } = data
                setShow(false)
                saveLoggedUser({
                    id,
                    name,
                    token,
                    admin
                })
                api.defaults.headers.Authorization = `Bearer ${token}`
                setIsAuthenticated(true)
                navigate('/')
                setLogin(false)
            })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 404) {
                    setShow(true)
                    setStatus('Atenção')
                    setMessage('Corrija suas credenciais de login. Ou entre em contato com o comando.')
                    setVariant('warning')
                } else {
                    setShow(true)
                    setStatus('Atenção')
                    setMessage('Erro no servidor. Tente novamente mais tarde.')
                    setVariant('warning')
                }
            })

    }

    return (
        <article>
            <div className="login-form-area">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <fieldset>
                        <StatusMessage show={show} status={status} variant={variant} message={message} />
                        <UserContext.Provider value={{ email, password }}>
                            <FloatingLabel label="Email" className="mb-3" value={email} onChange={e => setEmail(e.target.value)} >
                                <Form.Control type="email" placeholder="Digite seu email" required />
                            </FloatingLabel>
                            <FloatingLabel label="Senha" className="mb-3" value={password} onChange={e => setPassword(e.target.value)} >
                                <Form.Control type="password" placeholder="Digite sua senha" required />
                            </FloatingLabel>
                        </UserContext.Provider>
                        <div className="form-btn-area">
                            <Button type="reset" id="cancel" variant="secondary">Limpar</Button>
                            <Button type="submit" id="confirm" variant="danger">Entrar</Button>
                        </div>
                    </fieldset>
                    {/* <div className="link-area">
                        <Link to="/register">Realizar cadastro</Link>
                    </div> */}
                </form>
            </div>
        </article>
    )
}