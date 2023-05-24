import { useState, useEffect, useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import styles from './TakeCareMaterialModal.module.css'
import api from '../../services/api'
import StatusMessage from '../StatusMessage'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

export default function TakeCareMaterialModal({ show, onClose, materialId, materialName, materialQuantity }) {

    var dateObject = new Date();
    const formatedDate = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const formatedMonth = month < 10 ? `0${month}` : month;
    const today = `${dateObject.getFullYear()}-${formatedMonth}-${formatedDate}`;

    const [takeCareQuantity, setTakeCareQuantity] = useState(1)
    const [options, setOptions] = useState([])
    const [military, setMilitary] = useState()
    const [date, setDate] = useState(today)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [variant, setVariant] = useState('')
    const [visible, setVisible] = useState(false)
    const [ranks, setRanks] = useState([])

    const { user } = useContext(UserContext)

    useEffect(() => {
        api.get('/users-name')
            .then(({ data }) => {
                setOptions(data.users)
            })
            .then(() => {
                api.get("/ranks")
                    .then(({ data }) => setRanks(data.ranks))
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    if (!show) return null

    const getRankName = rank => {
        let name = ''
        ranks.forEach(r => {
            if(r._id === Number(rank)) name = r.rank
        })
        return name
    }

    const takeCareMaterial = (e) => {
        e.preventDefault()
        const finalQuantity = Number(materialQuantity) - Number(takeCareQuantity);
        const takeCareDate = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
        //const takeCareDate = new Date(date).toLocaleDateString('pt-BR')
        //const takeCareDate = date
        const mili = dateObject.getTime()

        if (finalQuantity === 0) {
            api.delete(`/materials/${materialId}`)
                .then(response => console.log(response.status))
                .then(() => {
                    const description = `Material cautelado -> ${takeCareQuantity}x ${materialName}. Por -> ${military}. Em -> ${takeCareDate}`

                    api.post('/movements', {
                        user_id: user.id,
                        user_name: user.name,
                        operation: "Cautela",
                        date: dateObject.toLocaleDateString('pt-BR'),
                        mili,
                        description
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage('A cautela foi registrada.')
                            setVariant('success')
                            setVisible(true)
                        })
                        .catch(err => {
                            console.error(err)
                            setStatus('Falha')
                            setMessage('Não foi possível realizar a operação.')
                            setVariant('dark')
                            setVisible(true)
                        })
                })
                .catch(err => {
                    console.error(err)
                    setStatus('Falha')
                    setMessage('Não foi possível realizar a operação.')
                    setVariant('dark')
                    setVisible(true)
                })
        }
        else {
            api.put(`/materials/${materialId}`, {
                name: materialName,
                quantity: finalQuantity
            })
                .then(response => console.log(response.status))
                .then(() => {
                    const description = `Material cautelado -> ${takeCareQuantity}x ${materialName}. Por -> ${military}. Em -> ${takeCareDate}`

                    api.post('/movements', {
                        user_id: user.id,
                        user_name: user.name,
                        operation: "Cautela",
                        date: dateObject.toLocaleDateString('pt-BR'),
                        mili,
                        description
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage('A cautela foi registrada.')
                            setVariant('success')
                            setVisible(true)
                        })
                        .catch(err => {
                            console.error(err)
                            setStatus('Falha')
                            setMessage('Não foi possível realizar a operação.')
                            setVariant('dark')
                            setVisible(true)
                        })
                })
                .catch(err => {
                    console.error(err)
                    setStatus('Falha')
                    setMessage('Não foi possível realizar a operação.')
                    setVariant('dark')
                    setVisible(true)
                })
            setMessage(false)
        }
        // console.log(`${takeCareQuantity}x ${materialName} foi(foram) cautelado(s) pelo ${military} em ${takeCareDate}`)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <StatusMessage show={visible} variant={variant} message={message} status={status} />
                    <h4 className={styles.modal_title}>Cautelar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <h3>{materialName}</h3>
                    <form onSubmit={takeCareMaterial} id="take-care-form">
                        <FloatingLabel
                            label="Quantidade"
                            value={takeCareQuantity}
                            onChange={e => setTakeCareQuantity(e.target.value)}
                            required
                            className={styles.QuantityFloatingLabel}
                        >
                            <Form.Control
                                type="number"
                                min="1"
                                max={materialQuantity}
                                defaultValue={materialQuantity}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Cautelado por:" className={styles.MilitaryFloatingLabel}>
                            <Form.Select value={military} onChange={e => setMilitary(e.target.value)}>
                                <option value="" key="0">-- Selecione um militar --</option>
                                {options?.map(option =>
                                    <option key={option._id} value={`${getRankName(option.rank)} ${option.qra}`}>{`${getRankName(option.rank)} ${option.qra}`}</option>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel label="Em:" className={styles.DateFloatingLabel}>
                            <Form.Control
                                type="date"
                                defaultValue={date}
                                max={today}
                                onChange={e => setDate(e.target.value)}
                            />
                        </FloatingLabel>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <Button id="cancel" variant="secondary" onClick={onClose} className={styles.button}>Cancelar</Button>
                    <Button id="confirm" variant="danger" type="submit" form="take-care-form" disabled={!military || !takeCareQuantity}>Confirmar cautela de material</Button>
                </div>
            </div>
        </div>
    )
}