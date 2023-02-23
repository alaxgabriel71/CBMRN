import { useState, useEffect, useRef } from 'react'
import { Button, FloatingLabel, Form, FormLabel } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import MaskedFormControl from 'react-bootstrap-maskedinput'

import StatusMessage from '../components/StatusMessage'
//import { UserContext } from '../components/contexts/UserContext'
import api from '../services/api'

import './Register.css'

export default function Register() {
    const options = [
        { value: 1, rank: "SD" },
        { value: 2, rank: "CB" },
        { value: 3, rank: "3º SGT" },
        { value: 4, rank: "2º SGT" },
        { value: 5, rank: "1º SGT" },
        { value: 6, rank: "ST" },
        { value: 7, rank: "ST" },
        { value: 8, rank: "CAD" },
        { value: 9, rank: "1º TEN" },
        { value: 10, rank: "2º TEN" },
        { value: 11, rank: "CAP" },
        { value: 12, rank: "MAJ" },
        { value: 13, rank: "TEN CEL" },
        { value: 14, rank: "CEL" },
    ]

    // const { setLogin } = useContext(UserContext)

    const componentReference = useRef(null)

    const navigate = useNavigate()

    // const [adim, setAdmin] = useState(false)
    const [rank, setRank] = useState('')
    const [qra, setQra] = useState('')
    const [registration, setRegistration] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('')
    const [adminLevel, setAdminLevel] = useState('none')

    useEffect(() => {
        console.log(adminLevel)
    }, [adminLevel])


    const handleSubmit = (event) => {
        event.preventDefault()
        setShow(false)
        console.log('new user', { rank, qra, registration, email, password })

        var commander, moderator, regular

        if(adminLevel === "commander"){
            commander = true
            moderator = false
            regular = false
        } else if(adminLevel === "moderator"){
            commander = false
            moderator = true
            regular = false
        } else if(adminLevel === "regular"){
            commander = false
            moderator = false
            regular = true
        } else {
            commander = false
            moderator = false
            regular = false
        }

        if (email !== confirmEmail) {
            setShow(true)
            setStatus('Atenção')
            setMessage('Os emails informados não são iguais.')
            setVariant('warning')
            componentReference.current.focus()
        } else if (password !== confirmPassword) {
            setShow(true)
            setStatus('Atenção')
            setMessage('As senhas informadas não são iguais.')
            setVariant('warning')
            componentReference.current.focus()
        } else {
            api.post("/users", {
                admin: {
                    regular,
                    moderator,
                    commander
                },
                name: `${rank} ${qra}`,
                registration,
                email,
                password
            })
                .then(response => {
                    console.log(response.status)
                    setShow(true)
                    setStatus("Sucesso")
                    setMessage("Cadastro realizado.")
                    setVariant("success")
                    const timer = setTimeout(() => {
                        //navigate('/login')
                        window.location.reload(false)
                    }, 1500)

                    return () => clearTimeout(timer)
                })
                .catch(err => {
                    if (err.response.status === 409) {
                        setShow(true)
                        setStatus('Atenção')
                        setMessage('Use outro email para o cadastro.')
                        setVariant('warning')
                    } else {
                        console.error(err)
                    }
                })
        }


    }

    return (
        <article>
            <div className="register-form-area">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h3>Cadastro no Sistema</h3>
                    <fieldset>
                        <StatusMessage show={show} status={status} variant={variant} message={message} />
                        <div className="military-area">
                            <FloatingLabel
                                label="Patente"
                                className="mb-3 rank"
                            >
                                <Form.Select
                                    value={rank}
                                    onChange={e => setRank(e.target.value)}
                                    required
                                >
                                    <option key="0" value="">-- Informe sua patente --</option>
                                    {options.map(option => (
                                        <option key={option.value} value={option.rank}>{option.rank}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel
                                label="QRA"
                                className="mb-3 qra"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe seu QRA"
                                    value={qra}
                                    onChange={e => setQra(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                label="Matrícula"
                                className="mb-3 registration"
                            >
                                <MaskedFormControl
                                    type="text"
                                    mask="111.111-1"
                                    pattern="[0-9]{3,}\+?.+[0-9]{3,}\+?-+[0-9]{1,}"
                                    placeholder="Informe sua matrícula"
                                    value={registration}
                                    onChange={e => setRegistration(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <FloatingLabel
                            label="Email"
                            id="Email"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="Informe seu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Confirme o email"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="Confirme seu email"
                                value={confirmEmail}
                                ref={componentReference}
                                onChange={e => setConfirmEmail(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        <div className="password-area">
                            <FloatingLabel
                                label="Senha"
                                className="mb-3 password"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Informe sua senha"
                                    minLength="6"
                                    maxLength="12"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                label="Confirme a senha"
                                className="mb-3 password"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Confirme sua senha"
                                    minLength="6"
                                    maxLength="12"
                                    value={confirmPassword}
                                    ref={componentReference}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </div>
                        <div className="mb-3 radio-area">
                            <FormLabel > Nível de administrador
                                <Form.Check
                                    inline
                                    label="Comandante"
                                    name="admin"
                                    type="radio"
                                    value={adminLevel}
                                    onChange={e => setAdminLevel("commander")}
                                //isInvalid
                                />
                                <Form.Check
                                    inline
                                    label="Moderador"
                                    name="admin"
                                    type="radio"
                                    value={adminLevel}
                                    onChange={e => setAdminLevel("moderator")}
                                //isInvalid
                                />
                                <Form.Check
                                    inline
                                    label="Regular"
                                    name="admin"
                                    type="radio"
                                    value={adminLevel}
                                    onChange={e => setAdminLevel("regular")}
                                //isInvalid
                                />
                                <Form.Check
                                    inline
                                    label="Nenhum"
                                    name="admin"
                                    type="radio"
                                    value={adminLevel}
                                    onChange={e => setAdminLevel("none")}
                                //isInvalid
                                />
                            </FormLabel>
                        </div>
                        <div className="button-area">
                            <Button type="reset" id="cancel" variant="secondary">Limpar</Button>
                            <Button type="submit" id="confirm" variant="danger">Finalizar o Cadastro</Button>
                        </div>
                    </fieldset>
                    {/* <div className="link-area">
                        <Link to="/login">Voltar</Link>
                    </div> */}
                </form>
            </div>
        </article >
    )
}