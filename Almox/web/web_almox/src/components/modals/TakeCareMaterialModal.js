import { useState, useEffect } from 'react'

import styles from './TakeCareMaterialModal.module.css'
import api from '../../services/api'
import StatusMessage from '../StatusMessage'

export default function TakeCareMaterialModal({show, onClose, materialId, materialName, materialQuantity}){
    
    var dateObject = new Date()
    const formatedDate = dateObject.getDate() < 10 ? ('0' + dateObject.getDate()) : (dateObject.getDate())
    const today = dateObject.getFullYear()+'-'+(dateObject.getMonth()+1)+'-'+formatedDate
    
    const [takeCareQuantity, setTakeCareQuantity] = useState(1)
    const [options, setOptions] = useState([])
    const [military, setMilitary] = useState()
    const [date, setDate] = useState(today)
    const [message, setMessage] = useState(false)
    const [status, setStatus] = useState()

    useEffect(() => {
        api.get('/military')
            .then(({data}) => {
                setOptions(data.military)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);

    if(!show) return null

    const takeCareMaterial = (e) => {
        e.preventDefault()
        const finalQuantity = Number(materialQuantity) - Number(takeCareQuantity);
        const takeCareDate = date.slice(8,10)+'/'+date.slice(5,7)+'/'+date.slice(0,4)

        if(finalQuantity === 0){
            api.delete(`/materials/${materialId}`)
                .then(response => console.log(response.status))
                .then(() => {
                    const description = `${takeCareQuantity}x ${materialName} foi(foram) cautelado(s) pelo ${military} em ${takeCareDate}`
                    
                    api.post('/movements', {
                        operation: "Cautela",
                        date: today,
                        description 
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage(true)
                        })
                        .catch(err => {
                            console.error(err)
                            setStatus('Falha')
                            setMessage(true)
                        })
                })
                .catch(err => {
                    console.error(err)
                    setStatus('Falha')
                    setMessage(true)
                })
        }
        else {
            api.put(`/materials/${materialId}`, {
                name: materialName,
                quantity: finalQuantity
            })
                .then(response => console.log(response.status))
                .then(() => {
                    const description = `${takeCareQuantity}x ${materialName} foi(foram) cautelado(s) pelo ${military} em ${takeCareDate}`
                    
                    api.post('/movements', {
                        operation: "Cautela",
                        date: today,
                        description 
                    })
                        .then(response => {
                            console.log(response.status)
                            setStatus('Sucesso')
                            setMessage(true)
                        })
                        .catch(err => console.error(err))
                })
                .catch(err => {
                    console.error(err)
                    setStatus('Sucesso')
                    setMessage(true)
                })
            setMessage(false)
        }
        // console.log(`${takeCareQuantity}x ${materialName} foi(foram) cautelado(s) pelo ${military} em ${takeCareDate}`)
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <StatusMessage message={message} status={status} />
                    <h4 className={styles.modal_title}>Cautelar Material</h4>
                </div>
                <div className={styles.modal_body}>
                    <h3>{materialName}</h3>
                    <form onSubmit={takeCareMaterial} id="take-care-form">
                        <label>
                            Quantidade:
                            <input 
                            type="number" 
                            min="1" 
                            max={materialQuantity} 
                            defaultValue={materialQuantity}
                            value={takeCareQuantity}
                            onChange={e => setTakeCareQuantity(e.target.value)}
                            required
                            />
                        </label>
                        <label>
                            Cautelado por: 
                            <select name="military" value={military} onChange={event => setMilitary(event.target.value)} required>
                                <option value="" key="0">-- Selecione um militar --</option>
                                {options?.map(option => 
                                    <option key={option._id} value={option.name}>{option.name}</option>
                                )}
                            </select>
                        </label>
                        <label>
                            Em:
                            <input type="date" defaultValue={date} max={today} onChange={(e) => setDate(e.target.value)}/>
                        </label>
                    </form>
                </div>
                <div className={styles.modal_footer}>
                    <button onClick={onClose} className={styles.button}>Cancelar</button>
                    <button type="submit" form="take-care-form" disabled={!military || !takeCareQuantity}>Confirmar cautela de material</button>
                </div>
            </div>
        </div>
    )
}