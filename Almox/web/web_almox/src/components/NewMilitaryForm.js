import { useState } from 'react'

import api from '../services/api'
import StatusMessage from '../components/StatusMessage'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

import styles from './NewMilitaryForm.module.css'

export default function NewMilitaryList(){
    const options = [
        {value: 1, rank: "SD"},
        {value: 2, rank: "CB"},
        {value: 3, rank: "3º SGT"},
        {value: 4, rank: "2º SGT"},
        {value: 5, rank: "1º SGT"},
        {value: 6, rank: "ST"},
        {value: 7, rank: "ST"},
        {value: 8, rank: "CAD"},
        {value: 9, rank: "1º TEN"},
        {value: 10, rank: "2º TEN"},
        {value: 11, rank: "CAP"},
        {value: 12, rank: "MAJ"},
        {value: 13, rank: "TEN CEL"},
        {value: 14, rank: "CEL"},
    ]

    const [rank, setRank] = useState()
    const [qra, setQra] = useState()
    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState()

    const registerMilitary = (e) => {
        e.preventDefault()
        const militaryName = rank + ' ' + qra[0].toUpperCase() + qra.substring(1).toLowerCase()
        console.log(militaryName)

        api.post('/military', {
            name: militaryName
        })
            .then(response => {
                setStatus('Sucesso')
                setMessage(true)
                return response.status
            })
            .catch(err => {
                console.error(err)
                setStatus('Falha')
                setMessage(true)
            })
        setMessage(false)
    }
    
    return(
        <>
            <StatusMessage message={message} status={status}/>
            <form onSubmit={registerMilitary}>
                <fieldset>
                    <h5 className={styles.Title_container} >Cadastrar Novo Militar</h5>
                    <FloatingLabel>
                        <Form.Select
                            aria-label="Floating label select example"
                            className="mb-3"
                            name="rank"
                            value={rank}
                            onChange={event => setRank(event.target.value)}
                            required
                        >
                            <option key="0" value="">-- Informe a patente --</option>
                            {options.map(option => (
                                <option key={option.value} value={option.rank}>{option.rank}</option>
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        label="QRA do Militar"
                        className="mb-3"
                        value={qra}
                        onChange={event => setQra(event.target.value)}
                    >
                        <Form.Control type="Text" placeholder="Informe o QRA do militar" />
                    </FloatingLabel>
                    <Button 
                        type="submit" 
                        disabled={!rank || !qra}
                        className="btn btn-danger"
                        id="confirm"
                    >
                        Cadastrar Militar
                    </Button>
                </fieldset>
            </form>
        </>
    )
}