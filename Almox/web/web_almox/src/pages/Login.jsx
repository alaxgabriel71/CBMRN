import { useContext } from 'react'
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { UserContext } from '../components/contexts/UserContext'
import { useNavigate } from 'react-router-dom'

import "./Login.css"

export default function Login() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const { email, setEmail, password, setPassword } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('user', { email, password })
        localStorage.setItem('user', JSON.stringify({email, password}))
        navigate('/')
    }

    return (
        <article>
            <div className="login-form-area">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <fieldset>
                        <UserContext.Provider value={{email, password}}>
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
                </form>
            </div>
        </article>
    )
}