import { Button, FloatingLabel, Form } from "react-bootstrap"

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

    return (
        <article>
            <div className="register-form-area">
                <form className="register-form">
                    <h3>Cadastro no Sistema</h3>
                    <fieldset>
                        <div className="military-area">
                            <FloatingLabel
                                label="Patente"
                                className="mb-3"
                            >
                                <Form.Select required>
                                    <option key="0" value="">-- Informe sua patente --</option>
                                    {options.map(option => (
                                        <option key={option.value} value={option.value}>{option.rank}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel
                                label="QRA"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Informe seu QRA" required />
                            </FloatingLabel>
                            <FloatingLabel
                                label="Matrícula"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Informe sua matrícula" required />
                            </FloatingLabel>
                        </div>
                        <FloatingLabel
                            label="Email"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="Informe seu email" required />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Confirme o email"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="Confirme seu email" required />
                        </FloatingLabel>
                        <div className="password-area">
                            <FloatingLabel
                                label="Senha"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="password" 
                                    placeholder="Informe sua senha"
                                    required 
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                label="Confirme a senha"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="password" 
                                    placeholder="Confirme sua senha"
                                    required 
                                />
                            </FloatingLabel>
                        </div>
                        <div className="button-area">
                            <Button type="reset" id="cancel" variant="secondary">Limpar</Button>
                            <Button type="submit" id="confirm" variant="danger">Finalizar o Cadastro</Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </article >
    )
}